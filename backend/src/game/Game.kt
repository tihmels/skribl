package game

data class Game(val id: Int,
                val admin: Int,
                val isRunning: Boolean? = null,
                val isPrivate: Boolean? = null,
                val settings: GameSettings? = GameSettings())

const val DEFAULT_ROUNDS = 3
const val DEFAULT_TIME = 60

data class GameSettings(var selectedRounds: Int = DEFAULT_ROUNDS, var selectedTime: Int = DEFAULT_TIME)
