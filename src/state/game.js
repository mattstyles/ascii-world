
import EventEmitter from 'eventemitter3'

import { EVENTS } from 'config/events'
import mapGen from 'core/map/mapGen'

class GameState extends EventEmitter {
    constructor() {
        super()

        // To kickstart things off lets request a new map
        setTimeout( () => {
            this.emit( EVENTS.READY )
        }, 500 )

        mapGen.createChunk()
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
