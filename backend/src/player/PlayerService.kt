package player

import java.util.*
import java.util.concurrent.atomic.AtomicInteger

class PlayerService {

    private val players: MutableMap<Int, Player> = Collections.synchronizedMap(mutableMapOf())
    private val ids = AtomicInteger(0)

    fun getAll() = this.players.values.toList()

    fun get(id: Int): Player = this.players[id] ?: throw PlayerNotFoundException()

    fun create(p: Player): Player {
        val id = ids.incrementAndGet()
        val player = p.copy(id = id)
        this.players[id] = player
        return player
    }

    fun delete(id: Int): Player = this.players.remove(id) ?: throw PlayerNotFoundException()

    fun update(player: Player): Player = this.players.replace(player.id, player) ?: throw PlayerNotFoundException()


}
