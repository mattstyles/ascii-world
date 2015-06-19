
import React from 'react'

import { to1d, Point, Rect } from 'core/utils/maths'
import ChunkView from 'core/world/chunkView'
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
export default class WorldView extends React.Component {
    static propTypes = {
        map: React.PropTypes.object
    }

    constructor( props ) {
        super( props )

        // @TODO these should update on screen redimension
        this.canvasWidth = document.documentElement.clientWidth
        this.canvasHeight = document.documentElement.clientHeight
    }

    componentDidMount() {
        console.log( 'MapView::componentDidMount' )
        console.log( this.props.map )
        this.ctx = this.refs[ 'map-canvas' ].getDOMNode().getContext( '2d' )

        // Set up render environment based on current screen settings
        // @TODO update this on screen redimension
        this.defineScreen()

        this.renderMap()
    }

    componentDidUpdate() {
        console.log( 'MapView::componentDidUpdate' )

        this.renderMap()
    }

    defineScreen() {
        this.screenRect = {
            x1: 0,
            y1: 0,
            x2: ~~( this.canvasWidth / CELL_SIZE.x ),
            y2: ~~( this.canvasHeight / CELL_SIZE.y )
        }

        console.log( 'screen rect:', this.screenRect )
    }

    renderMap() {

        this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight )
        this.ctx.font = MASTER_CELL_SIZE * 1.1 + 'px deja-vu-sans-mono'

        // @TODO calculate how many chunks are needed to fill the screen
        // and only create that many, then change their contents to render
        // * better might be to let React handle each chunk view and only
        // update when the props change, then we get Reacts diffing algorithm
        // to decide if a chunk should re-render or not
        let chunkView = new ChunkView({
            ctx: this.ctx,
            cell: {
                width: CELL_SIZE.x,
                height: CELL_SIZE.y
            }
        })

        // For now render the same chunk to fill the screen
        let count = 0
        for ( let y = 0; y < this.screenRect.y2; y += CHUNK_SIZE ) {
            for ( let x = 0; x < this.screenRect.x2; x += CHUNK_SIZE ) {
                chunkView.render({
                    chunk: this.props.map,
                    renderRect: new Rect( x, y, x + CHUNK_SIZE - 1, y + CHUNK_SIZE - 1 )
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