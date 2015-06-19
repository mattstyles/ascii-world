
import ChunkView from './base'


export default class PlainView extends ChunkView {
    constructor( opts ) {
        super( opts )
    }

    getFillStyle( cell ) {
        return 'rgba( 104, 96, 64, ' + ( cell / 0xff ) + ' )'
    }

}
