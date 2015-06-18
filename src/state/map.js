
import DisplacementMap from 'displacement-map'


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
                    resolve( map )
                })
                .catch( reject )
        })

    }

}

export default new MapGen()
