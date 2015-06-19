

export class Point {
    constructor( x, y ) {
        this.x = x
        this.y = y
    }
}

export class Rect {
    constructor( x1, y1, x2, y2 ) {
        this.from = new Point( x1, y1 )
        this.to = new Point( x2, y2 )

        this.width = x2 - x1
        this.height = y2 - y1
    }
}


export function to1d( x, y, width ) {
    return ( y * width ) + x
}

export function to2d( num, width ) {
    return new Point( num % width, ~~( num / width ) )
}
