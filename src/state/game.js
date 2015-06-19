
import EventEmitter from 'eventemitter3'

import { EVENTS } from 'config/events'
import worldGen from 'core/world/worldGen'

class GameState extends EventEmitter {
    constructor() {
        super()

        // To kickstart things off lets request a new map
        worldGen.createChunk()
            .then( map => {
                // @TODO should add chunk to overall map
                this.map = map
                this.emit( EVENTS.READY )
            })
    }

    getMap() {
        return this.map
    }

}


export default new GameState()
