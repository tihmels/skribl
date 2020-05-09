package websocket

import io.ktor.http.cio.websocket.DefaultWebSocketSession
import java.util.*
import java.util.concurrent.atomic.AtomicInteger

class Client(val session: DefaultWebSocketSession, private val game: UUID, private val player: UUID) {
    companion object { var lastId = AtomicInteger(0) }
    private val id = lastId.getAndIncrement()
    val clientId = "U$id"
    val gameId = game
    val playerId = player
}
