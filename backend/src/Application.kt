import com.fasterxml.jackson.databind.SerializationFeature
import com.google.gson.Gson
import game.GameService
import io.ktor.application.Application
import io.ktor.application.ApplicationCallPipeline
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.*
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.http.cio.websocket.*
import io.ktor.jackson.jackson
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.*
import io.ktor.sessions.*
import io.ktor.util.KtorExperimentalAPI
import io.ktor.util.hex
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.consumeEach
import player.PlayerService
import websocket.GameServer
import websocket.Message
import java.time.Duration
import java.util.*

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@KtorExperimentalAPI
val hashKey = hex("6819b57a326945c1968f45236589")

@ExperimentalCoroutinesApi
@KtorExperimentalAPI
fun Application.module() {

    install(CallLogging)
    install(DefaultHeaders)
    install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.AccessControlAllowHeaders)
        header(HttpHeaders.ContentType)
        header(HttpHeaders.AccessControlAllowOrigin)
        allowCredentials = true
        anyHost()
    }
    install(StatusPages)
    install(ContentNegotiation) {
        jackson {
            enable(SerializationFeature.INDENT_OUTPUT)
        }
    }
    install(WebSockets) {
        pingPeriod = Duration.ofMinutes(1)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }
    install(Sessions) {
        cookie<Session>("SESSION")
    }

    val playerService = PlayerService()
    val gameService = GameService()
    val gameServer = GameServer(playerService, gameService)

    routing {

        route("/player") {

            get {
                call.respond(HttpStatusCode.OK, playerService.getAll())
            }

            post {
                val player = playerService.create(call.receive())
                call.sessions.set(Session(player.id))
                call.respond(HttpStatusCode.Created, player)
            }

            put {
                call.respond(HttpStatusCode.OK, playerService.update(call.receive()))
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                id?.let {
                    val player = playerService.get(it)
                    call.respond(HttpStatusCode.OK, player)
                }
            }
        }

        route("/game") {

            get {
                call.respond(HttpStatusCode.OK, gameService.getAll())
            }

            post {
                val game = gameService.create(call.receive())
                call.respond(HttpStatusCode.Created, game)
            }

            put {
                gameService.update(call.receive())
                call.respond(HttpStatusCode.OK)
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull()
                id?.let {
                    val game = gameService.get(it)
                    call.respond(HttpStatusCode.OK, game)
                }
            }

            get("/{id}/player") {
                val id = call.parameters["id"]?.toIntOrNull()
                id?.let {
                    val player = gameServer.getPlayers(it);
                    call.respond(HttpStatusCode.OK, player)
                }
            }
        }

        val gson = Gson()

        webSocket("/game/{id}") {
            val gameId = call.parameters["id"]?.toIntOrNull()

            // First of all we get the session.
            val session = call.sessions.get<Session>()

            // We check that we actually have a session. We should always have one,
            // since we have defined an interceptor before to set one.
            if (session == null) {
                close(CloseReason(CloseReason.Codes.VIOLATED_POLICY, "No session"))
                return@webSocket
            }

            gameServer.joinGame(gameId!!, session.id, this)

            try {
                incoming.consumeEach { frame ->
                    // Frames can be [Text], [Binary], [Ping], [Pong], [Close].
                    // We are only interested in textual messages, so we filter it.
                    if (frame is Frame.Text) {
                        val message = gson.fromJson(frame.readText(), Message::class.java)
                        // Now it is time to process the text sent from the user.
                        // At this point we have context about this connection, the session, the text and the server.
                        // So we have everything we need.
                        //gameServer.receivedMessage(playerId, gameId, message)
                    }
                }

            } finally {
                //server.memberLeft(session.pid, this)
            }
        }
    }

//        webSocket("/game/{id}") {
//
//            // First of all we get the session.
//            val session = call.sessions.get<Session>()
//            val gameId = call.parameters["id"]
//
//            // We check that we actually have a session. We should always have one,
//            // since we have defined an interceptor before to set one.
//            if (session == null || gameId == null) {
//                close(CloseReason(CloseReason.Codes.VIOLATED_POLICY, "No session"))
//                return@webSocket
//            }
//
//            //gameServer.memberJoin(session.id, gameId, this)
//
//            try {
//                incoming.consumeEach { frame ->
//                    // Frames can be [Text], [Binary], [Ping], [Pong], [Close].
//                    // We are only interested in textual messages, so we filter it.
//                    if (frame is Frame.Text) {
//                        val message = gson.fromJson(frame.readText(), Message::class.java)
//                        // Now it is time to process the text sent from the user.
//                        // At this point we have context about this connection, the session, the text and the server.
//                        // So we have everything we need.
//                        //gameServer.receivedMessage(session.id, gameId, message)
//                    }
//                }
//
//            } finally {
//                //server.memberLeft(session.pid, this)
//            }
//        }
//    }

}

data class Session(val id: Int)

