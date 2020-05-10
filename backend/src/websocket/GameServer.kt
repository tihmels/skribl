package websocket

import com.google.gson.Gson
import com.google.gson.JsonObject
import game.Game
import game.GameService
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.WebSocketSession
import io.ktor.websocket.DefaultWebSocketServerSession
import player.Player
import player.PlayerService
import java.util.*
import java.util.concurrent.ConcurrentHashMap

class GameServer(private val playerService: PlayerService, private val gameService: GameService) {

    private val players = ConcurrentHashMap<Player, MutableList<WebSocketSession>>()

    private val games = ConcurrentHashMap<Game, MutableList<Player>>()

    private val gson = Gson()

    /**
     * Handles that a member identified with a session id and a socket joined.
     */
    suspend fun memberJoin(userId: UUID, gameId: UUID, socket: WebSocketSession) {
//        val player = this.playerService.get(userId)
//        val list = members.computeIfAbsent(player!!) { socket }
//
//        val game = this.gameService.getGame(gameId);
//        val playerList = games.computeIfAbsent(game!!) { CopyOnWriteArrayList() }
//        playerList.add(player)
//
//        if (playerList.size > 1) {
//            message(player, game, Message(player.id, "HELLO", Action.JOINED))
//        }
    }

    /**
     * We received a message. Let's process it.
     */
    suspend fun receivedMessage(playerId: Int, gameId: Int, message: Message) {
        val player = this.playerService.get(playerId)
        val game = this.gameService.get(gameId)

        if(message.action == Action.UPDATE) {
            this.gameService.update(message.content!!)
            this.broadcast(game, message)
        }


    }


//    /**
//     * Handles that a [member] with a specific [socket] left the server.
//     */
//    suspend fun memberLeft(userId: UUID, socket: WebSocketSession) {
//        // Removes the socket connection for this member
//        val player = this.playerService.get(userId)
//        val connections = members[player]
//        connections?.remove(socket)
//
//        // If no more sockets are connected for this member, let's remove it from the server
//        // and notify the rest of the users about this event.
//        if (connections != null && connections.isEmpty()) {
//            broadcast("server", "Member left: $name.")
//        }
//    }
//
//    /**
//     * Handles a [message] sent from a [sender] by notifying the rest of the users.
//     */
//    suspend fun message(sender: Player, game: Game, message: Message) {
//
//        // Sends this pre-formatted message to all the members in the server.
//        broadcast(game, message)
//    }

    /**
     * Sends a [message] to all the members in the server, including all the connections per member.
     */
    /*private suspend fun broadcast(game: Game, message: Message) {
        val players: MutableList<Player> = games[game]!!
        players.forEach {
            members[it]!!.send(Frame.Text(Gson().toJson(message)))
        }
    }*/

    fun getPlayers(gameId: Int): List<Player> {
        val game = this.gameService.get(gameId);
        return this.games[game]!!.toList();
    }

    suspend fun joinGame(gameId: Int, playerId: Int, session: DefaultWebSocketServerSession) {
        val game = this.gameService.get(gameId)
        val player = this.playerService.get(playerId)

        val playerList = this.games.computeIfAbsent(game) { mutableListOf() }
        playerList.add(player)

        val socketList = this.players.computeIfAbsent(player) { mutableListOf() }
        socketList.add(session)

        if (playerList.size > 1) {
            broadcast(game, Message(action = Action.JOINED, content = null))
        }
    }

    private suspend fun broadcast(game: Game, message: Message) {
        this.games[game]?.let {
            it.forEach { p ->
                this.players[p]?.let { s ->
                    s.forEach { session ->
                        session.outgoing.send(Frame.Text(message.toString()))
                    }
                }
            }
        }
    }

//    /**
//     * Sends a [message] coming from a [sender] to all the members in the server, including all the connections per member.
//     */
//    private suspend fun broadcast(sender: String, message: String) {
//        val name = memberNames[sender] ?: sender
//        broadcast("[$name] $message")
//    }
//
//    /**
//     * Sends a [message] to a list of [this] [WebSocketSession].
//     */
//    suspend fun List<WebSocketSession>.send(frame: Frame) {
//        forEach {
//            try {
//                it.send(frame.copy())
//            } catch (t: Throwable) {
//                try {
//                    it.close(CloseReason(CloseReason.Codes.PROTOCOL_ERROR, ""))
//                } catch (ignore: ClosedSendChannelException) {
//                    // at some point it will get closed
//                }
//            }
//        }
//    }
}
