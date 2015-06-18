
import React from 'react'

import { to1d } from 'core/utils/maths'

/**
 * Given a bounding box and a map, it'll render the portion that
 * should be showing
 */
export default class MapView extends React.Component {
    static propTypes = {
        map: React.PropTypes.object
    }

    constructor( props ) {
        super( props )

        // @TODO these should update on screen redimension
        this.width = document.documentElement.clientWidth
        this.height = document.documentElement.clientHeight
    }

    componentDidMount() {
        console.log( this.props.map )
        this.ctx = this.refs[ 'map-canvas' ].getDOMNode().getContext( '2d' )

        this.renderMap()
    }

    renderMap() {
        // @TODO chunk size should be hard-wired somewhere, probably in config
        let size = Math.sqrt( this.props.map.length )
        // @TODO again, render size should be worked out better than this as its text rendering
        let cellSize = {
            x: ~~( this.width / size ),
            y: ~~( this.height / size )
        }

        this.ctx.clearRect( 0, 0, size * cellSize.x, size * cellSize.y )

        // Render left to right then top to bottom
        for ( let y = 0; y < size; y++ ) {
            for ( let x = 0; x < size; x++ ) {
                let opacity = this.props.map[ to1d( x, y, size ) ] / 0xff
                this.ctx.fillStyle = 'rgba( 255, 255, 255, ' + opacity + ' )'
                this.ctx.fillRect( x * cellSize.x, y * cellSize.y, cellSize.x, cellSize.y )
            }
        }
    }

    render() {

        return (
            <canvas
                ref="map-canvas"
                className="Map js-map u-fit-fix"
                width={ this.width }
                height={ this.height }>
            </canvas>
        )
    }
}
