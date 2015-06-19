
import { to1d, Point } from 'core/utils/maths'

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

    getFillStyle( cell ) {
        return 'rgba( 96, 64, 64, ' + ( cell / 0xff ) + ' )'
    }

    renderCell( cell, position ) {
        this.ctx.fillStyle = this.getFillStyle( cell )
        this.ctx.fillText( this.getTexture(), position.x, position.y )
    }

    /**
     * @param params <Object>
     *   @param chunk <Uint8Array> raw chunk positional data
     *   @param renderRect <Rect> rectangle to render
     *   @param position <Point> top-left point to render to
     */
    render( params ) {
        // For each cell defined by the renderRect
        // Create a fill style and position the text representing the entity
        // @TODO drawRect if a background style is needed for characters
        for( let y = params.renderRect.from.y; y <= params.renderRect.to.y; y++ ) {
            for( let x = params.renderRect.from.x; x <= params.renderRect.to.x; x++ ) {
                let posX = ( params.position.x + x ) * this.cellDef.width
                let posY = ( params.position.y + y ) * this.cellDef.height
                this.renderCell( params.chunk[ to1d( x, y, params.renderRect.width ) ], new Point( posX, posY ) )
            }
        }
    }
}
