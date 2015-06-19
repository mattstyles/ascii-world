
import React from 'react'

import MapView from 'map/mapView'

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
                <MapView map={ GameState.getMap() } />
            </div>
        )
    }
}

function render() {
    React.render( <App />, document.body )
}


GameState.on( EVENTS.READY, render )
