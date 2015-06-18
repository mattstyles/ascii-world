
import DisplacementMap from 'displacement-map'

import { to1d } from 'core/utils/maths'

const SIZE = 0x41


class MapGen {
    constructor() {
        this.generator = new DisplacementMap()
    }

    createChunk() {
        let buf = new ArrayBuffer( SIZE * SIZE )
        let buf8 = new Uint8Array( buf )

        // Seed corners
        buf8[ 0 ] = 0x80
        buf8[ SIZE - 1 ] = 0x80
        buf8[ ( SIZE * SIZE ) - SIZE ] = 0x80
        buf8[ ( SIZE * SIZE ) - 1 ] = 0x80

        return new Promise( ( resolve, reject ) => {
            this.generator.generate({
                map: buf8,
                width: SIZE,
                height: SIZE
            })
                .then( map => {
                    // Generation requires n^2 + 1, the chunk should be ^2
                    let chunkSize = SIZE - 1
                    let chunk = new Uint8Array( chunkSize * chunkSize )
                    for ( let x = 0; x < SIZE - 1; x++ ) {
                        for ( let y = 0; y < SIZE - 1; y++ ) {
                            chunk[ to1d( x, y, SIZE - 1 ) ] = map[ to1d( x, y, SIZE ) ]
                        }
                    }

                    resolve( chunk )
                })
                .catch( reject )
        })

    }

}

export default new MapGen()
