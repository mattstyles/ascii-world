
import React from 'react'

import { to1d, Point, Rect } from 'core/utils/maths'
import ChunkView from 'components/map/chunkView'


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

    renderMap() {
        // @TODO chunk size should be hard-wired somewhere, probably in config
        let size = Math.sqrt( this.props.map.length )

        let screenRect = {
            x1: 0,
            y1: 0,
            x2: ~~( this.width / CELL_SIZE.x ),
            y2: ~~( this.height / CELL_SIZE.y )
        }

        console.log( 'screen rect:', screenRect )

        this.ctx.clearRect( screenRect.x1, screenRect.y1, screenRect.x2, screenRect.y2 )
        this.ctx.font = MASTER_CELL_SIZE * 1.1 + 'px deja-vu-sans-mono'

        let chunkView = new ChunkView({
            ctx: this.ctx
        })

        // For now render the same chunk to fill the screen

        chunkView.render({
            chunk: this.props.map,
            renderRect: new Rect( 0, 0, size - 1, size - 1 ),
            cell: {
                width: CELL_SIZE.x,
                height: CELL_SIZE.y
            }
        })
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
