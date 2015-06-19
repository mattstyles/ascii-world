
import { to1d, Point } from 'core/utils/maths'
import config from 'config/gameConf'

const CHUNK_SIZE = config.getIn( [ 'map', 'chunkSize' ] )

/**
 * Responsible for rendering a whole chunk
 */
export default class ChunkView {
    constructor( opts ) {
        this.ctx = opts.ctx
        this.cellDef = opts.cell
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

    /**
     * @param params <Object>
     *   @param chunk <Uint8Array> raw chunk positional data
     *   @param renderRect <Rect> rectangle to render
     *   @param position <Point> top-left point to render to
     */
    render( params ) {
        console.log( 'Chunk:render', params )
        // For each cell defined by the renderRect
        // Create a fill style and position the text representing the entity
        // @TODO drawRect if a background style is needed for characters
        for( let y = params.renderRect.from.y; y <= params.renderRect.to.y; y++ ) {
            for( let x = params.renderRect.from.x; x <= params.renderRect.to.x; x++ ) {
                let opacity = params.chunk[ to1d( x, y, params.renderRect.width ) ] / 0xff
                this.ctx.fillStyle = 'rgba( 96, 64, 64, ' + opacity + ' )'

                // @TODO simplify
                let posX = ( params.position.x * this.cellDef.width ) + ( x * this.cellDef.width )
                let posY = ( params.position.y * this.cellDef.height ) + ( y * this.cellDef.height )
                this.ctx.fillText( this.getTexture(), posX, posY )
            }
        }
    }
}
