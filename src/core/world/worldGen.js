
import DisplacementMap from 'displacement-map'

import config from 'config/gameConf'
import { to1d } from 'core/utils/maths'

const SIZE = config.getIn( [ 'map', 'chunkSize' ] )


class MapGen {
    constructor() {
        this.generator = new DisplacementMap()
    }

    createChunk() {
        let genSize = SIZE + 1
        let buf = new ArrayBuffer( genSize * genSize )
        let buf8 = new Uint8Array( buf )

        // Seed corners
        buf8[ 0 ] = 0x80
        buf8[ genSize - 1 ] = 0x80
        buf8[ ( genSize * genSize ) - genSize ] = 0x80
        buf8[ ( genSize * genSize ) - 1 ] = 0x80

        return new Promise( ( resolve, reject ) => {
            this.generator.generate({
                map: buf8,
                width: genSize,
                height: genSize
            })
                .then( map => {
                    // Generation requires n^2 + 1, the chunk should be ^2
                    let chunk = new Uint8Array( SIZE * SIZE )
                    for ( let x = 0; x < SIZE; x++ ) {
                        for ( let y = 0; y < SIZE; y++ ) {
                            chunk[ to1d( x, y, SIZE ) ] = map[ to1d( x, y, genSize ) ]
                        }
                    }

                    resolve( chunk )
                })
                .catch( reject )
        })

    }

}

export default new MapGen()
