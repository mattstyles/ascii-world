
import React from 'react'


/**
 * Given a bounding box and a map, it'll render the portion that
 * should be showing
 */
export default class MapView extends React.Component {
    static propTypes = {
        map: React.PropTypes.object
    }

    constructor( props ) {
        super( props )
    }

    componentDidMount() {
        console.log( this.props.map )
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
