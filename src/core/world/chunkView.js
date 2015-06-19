
import { to1d } from 'core/utils/maths'

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
     */
    render( params ) {
        let size = params.renderRect.width
        for( let y = params.renderRect.from.y; y <= params.renderRect.to.y; y++ ) {
            for( let x = params.renderRect.from.x; x <= params.renderRect.to.x; x++ ) {
                let opacity = params.chunk[ to1d( x, y, size ) ] / 0xff
                this.ctx.fillStyle = 'rgba( 96, 64, 64, ' + opacity + ' )'
                this.ctx.fillText( this.getTexture(), x * this.cellDef.width, y * this.cellDef.height )
            }
        }
    }
}
