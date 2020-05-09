package websocket

import player.Player
import java.util.*

enum class Action {
    JOINED,
    LEFT,
}

data class Message(val from: Player, val content: String = "", val action: Action? = null)
