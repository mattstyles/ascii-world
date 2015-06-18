
import React from 'react'

import { to1d } from 'core/utils/maths'


// @TODO this should probably be a bit responsive
const CELL_SIZE = 32

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
        console.log( 'MapView::componentDidMount' )
        console.log( this.props.map )
        this.ctx = this.refs[ 'map-canvas' ].getDOMNode().getContext( '2d' )
    }

    componentDidUpdate() {
        console.log( 'MapView::componentDidUpdate' )

        this.renderMap()
    }

    renderMap() {
        // @TODO chunk size should be hard-wired somewhere, probably in config
        let size = Math.sqrt( this.props.map.length )

        let renderRect = {
            x1: 0,
            y1: 0,
            x2: ~~( this.width / CELL_SIZE ),
            y2: ~~( this.height / CELL_SIZE )
        }

        this.ctx.clearRect( renderRect.x1, renderRect.y1, renderRect.x2, renderRect.y2 )
        this.ctx.font = CELL_SIZE * 1.2 + 'px sans-serif'

        // Render left to right then top to bottom
        // Add one to render size to ensure no ugly blank half edges
        for ( let y = renderRect.y1; y < renderRect.y2 + 1; y++ ) {
            for ( let x = renderRect.x1; x < renderRect.x2 + 1; x++ ) {
                let opacity = this.props.map[ to1d( x, y, size ) ] / 0xff
                this.ctx.fillStyle = 'rgba( 255, 255, 255, ' + opacity + ' )'
                this.ctx.fillText( 'M', x * CELL_SIZE, y * CELL_SIZE )
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
