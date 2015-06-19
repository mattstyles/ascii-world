
import ChunkView from './base'


export default class CaveView extends ChunkView {
    constructor( opts ) {
        super( opts )
    }

    getTexture( cell ) {
        // Slight chance of outputting some rock
        if ( cell < 0x70 ) {
            return '#'
        }

        // Very slight chance of a variant
        if ( Math.random() < 0.1 ) {
            let texture = [
                ',',
                ',',
                ',',
                '\'',
                '\"'
            ]
            return texture[ ~~( Math.random() * texture.length ) ]
        }

        return '.'
    }

    getFillStyle( cell ) {
        // Slight chance of outputting some rock
        if ( cell < 0x70 ) {
            return 'rgb( 128, 128, 128 )'
        }

        return 'rgba( 64, 64, 64, ' + ( cell / 0xff ) + ' )'
    }

}
