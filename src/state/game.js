
import EventEmitter from 'eventemitter3'

import { EVENTS } from 'config/events'
import worldGen from 'core/world/worldGen'

class GameState extends EventEmitter {
    constructor() {
        super()

        this.world = null

        // To kickstart things off lets request a new map
        // worldGen.createChunk()
        //     .then( map => {
        //         // @TODO should add chunk to overall map
        //         this.map = map
        //         this.emit( EVENTS.READY )
        //     })

        worldGen.scaffoldWorld()
            .then( chunks => {
                console.log( 'World Scaffold Complete' )
                this.world = chunks
                this.emit( EVENTS.READY )
            })
    }

    getWorld() {
        return this.world
    }

}


export default new GameState()
