
import React from 'react'

import { to2d, Rect } from 'core/utils/maths'
import ChunkView from 'core/world/chunks/base'
import CaveChunk from 'core/world/chunks/cave'
import PlainChunk from 'core/world/chunks/plain'
import config from 'config/gameConf'

const CHUNK_SIZE = config.getIn( [ 'world', 'chunkSize' ] )

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
        // Array of chunks which define the world
        world: React.PropTypes.array
    }

    constructor( props ) {
        super( props )

        // @TODO these should update on screen redimension
        this.canvasWidth = document.documentElement.clientWidth
        this.canvasHeight = document.documentElement.clientHeight
    }

    componentDidMount() {
        console.log( 'MapView::componentDidMount' )
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

    /**
     * Randomly returns a type of chunk
     */
    getChunkView() {
        let opts = {
            ctx: this.ctx,
            cell: {
                width: CELL_SIZE.x,
                height: CELL_SIZE.y
            }
        }

        let chunkTypes = [ CaveChunk, PlainChunk ]

        return new chunkTypes[ ~~( Math.random() * 2 ) ]( opts )
    }

    renderMap() {

        this.ctx.clearRect( 0, 0, this.canvasWidth, this.canvasHeight )
        this.ctx.font = MASTER_CELL_SIZE * 1.1 + 'px deja-vu-sans-mono'

        // @TODO calculate how many chunks are needed to fill the screen
        // and only create that many, then change their contents to render
        // * better might be to let React handle each chunk view and only
        // update when the props change, then we get Reacts diffing algorithm
        // to decide if a chunk should re-render or not
        // let chunkView = new ChunkView({
        //     ctx: this.ctx,
        //     cell: {
        //         width: CELL_SIZE.x,
        //         height: CELL_SIZE.y
        //     }
        // })


        // For now dont view cull any chunks, render them all
        let count = 0

        // Assume world to be a square of chunks
        let size = Math.sqrt( this.props.world.length )

        let start = performance.now()
        this.props.world.forEach( ( chunk, index ) => {
            // For now create a new view for each chunk
            // @TODO should reuse these
            let chunkView = this.getChunkView()

            let chunkPos = to2d( index, size )
            chunkPos.x *= CHUNK_SIZE
            chunkPos.y *= CHUNK_SIZE
            chunkView.render({
                chunk: chunk,
                renderRect: new Rect( 0, 0, CHUNK_SIZE - 1, CHUNK_SIZE - 1 ),
                position: chunkPos
            })
            count++
        })

        console.log( 'chunks rendered', count )
        console.log( 'world render time', ( performance.now() - start ).toFixed( 2 ), 'ms' )
    }

    render() {

        return (
            <canvas
                ref="map-canvas"
                className="Map js-map u-fit-fix"
                width={ this.canvasWidth }
                height={ this.canvasHeight }>
            </canvas>
        )
    }
}
