
import React from 'react'

import WorldView from 'world/worldView'

import dispatcher from 'dispatchers/appDispatcher'
import GameState from 'state/game'
import { EVENTS } from 'config/events'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                {/* <span className="debug">M</span> */}
                <WorldView world={ GameState.getWorld() } />
            </div>
        )
    }
}

function render() {
    React.render( <App />, document.body )
}


GameState.on( EVENTS.READY, render )
