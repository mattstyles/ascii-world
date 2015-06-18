
import React from 'react'

export default class MapView extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        let width = document.documentElement.clientWidth
        let height = document.documentElement.clientHeight

        return (
            <canvas
                className="Map js-map u-fit-fix"
                width={ width }
                height={ height }>
            </canvas>
        )
    }
}
