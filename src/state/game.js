
import EventEmitter from 'eventemitter3'

import { EVENTS } from 'config/events'

class GameState extends EventEmitter {
    constructor() {
        super()

        // To kickstart things off lets request a new map
        setTimeout( () => {
            this.emit( EVENTS.READY )
        }, 500 )
    }

}


export default new GameState()
