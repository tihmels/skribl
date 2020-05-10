package websocket

import com.google.gson.annotations.SerializedName
import game.Game


enum class Action(val str: String) {
    @SerializedName("0")
    JOINED("JOINED"),
    @SerializedName("1")
    LEFT("LEFT"),
    @SerializedName("2")
    RENAME("RENAME"),
    @SerializedName("3")
    UPDATE("UPDATE")
}


data class Message(val content: Game?, val action: Action? = null)
