
import React from 'react'

import { to1d, Point, Rect } from 'core/utils/maths'
import ChunkView from 'components/map/chunkView'
import config from 'config/gameConf'

const CHUNK_SIZE = config.getIn( [ 'map', 'chunkSize' ] )

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

        this.renderMap()
    }

    componentDidUpdate() {
        console.log( 'MapView::componentDidUpdate' )

        this.renderMap()
    }

    renderMap() {
        let screenRect = {
            x1: 0,
            y1: 0,
            x2: ~~( this.width / CELL_SIZE.x ),
            y2: ~~( this.height / CELL_SIZE.y )
        }

        console.log( 'screen rect:', screenRect )

        this.ctx.clearRect( screenRect.x1, screenRect.y1, screenRect.x2, screenRect.y2 )
        this.ctx.font = MASTER_CELL_SIZE * 1.1 + 'px deja-vu-sans-mono'

        // @TODO calculate how many chunks are needed to fill the screen
        // and only create that many, then change their contents to render
        // * better might be to let React handle each chunk view and only
        // update when the props change, then we get Reacts diffing algorithm
        // to decide if a chunk should re-render or not
        let chunkView = new ChunkView({
            ctx: this.ctx
        })

        // For now render the same chunk to fill the screen
        let count = 0
        for ( let y = 0; y < screenRect.y2; y += CHUNK_SIZE ) {
            for ( let x = 0; x < screenRect.x2; x += CHUNK_SIZE ) {
                chunkView.render({
                    chunk: this.props.map,
                    renderRect: new Rect( x, y, x + CHUNK_SIZE - 1, y + CHUNK_SIZE - 1 ),
                    cell: {
                        width: CELL_SIZE.x,
                        height: CELL_SIZE.y
                    }
                })
                count = count + 1
            }
        }
        console.log( 'chunks rendered', count )
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
