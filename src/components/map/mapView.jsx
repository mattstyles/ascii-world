
import React from 'react'

import { to1d } from 'core/utils/maths'


// @TODO this should probably be a bit responsive
const MASTER_CELL_SIZE = 18
const CELL_SIZE = {
    x: MASTER_CELL_SIZE * 0.6,
    y: MASTER_CELL_SIZE * 1
}

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

    getTexture() {
        // Randomly return for now
        let texture = [
            '.',
            ',',
            '\'',
            '\"',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' '
        ]

        return texture[ ~~( Math.random() * texture.length ) ]
    }

    renderMap() {
        // @TODO chunk size should be hard-wired somewhere, probably in config
        let size = Math.sqrt( this.props.map.length )

        let screenRect = {
            x1: 0,
            y1: 0,
            x2: ~~( this.width / CELL_SIZE.x ),
            y2: ~~( this.height / CELL_SIZE.y )
        }

        console.log( screenRect )

        this.ctx.clearRect( screenRect.x1, screenRect.y1, screenRect.x2, screenRect.y2 )
        this.ctx.font = MASTER_CELL_SIZE * 1.1 + 'px deja-vu-sans-mono'

        // Render left to right then top to bottom
        // Add one to render size to ensure no ugly blank half edges
        for ( let y = screenRect.y1; y < screenRect.y2 + 1; y++ ) {
            for ( let x = screenRect.x1; x < screenRect.x2 + 1; x++ ) {
                let opacity = this.props.map[ to1d( x, y, size ) ] / 0xff
                this.ctx.fillStyle = 'rgba( 96, 64, 64, ' + opacity + ' )'
                this.ctx.fillText( this.getTexture(), x * CELL_SIZE.x, y * CELL_SIZE.y )
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
