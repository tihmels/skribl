package game

import java.util.*
import java.util.concurrent.atomic.AtomicInteger

class GameService {

    private val games: MutableMap<Int, Game> = Collections.synchronizedMap(mutableMapOf())
    private val ids = AtomicInteger(0)

    fun getAll() = this.games.values.filter { !it.isPrivate!! }.toList()

    fun get(id: Int): Game = this.games[id] ?: throw GameNotFoundException()

    fun create(g: Game): Game {
        val id = ids.incrementAndGet()
        val game = g.copy(id = id)
        this.games[id] = game
        return game
    }

    fun delete(id: Int): Game = this.games.remove(id) ?: throw GameNotFoundException()

    fun update(player: Game): Game = this.games.replace(player.id, player) ?: throw GameNotFoundException()

}
