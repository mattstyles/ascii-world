
import React from 'react'

import dispatcher from './dispatchers/appDispatcher'
import MyComponent from 'myComponent'

class App extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="container">
                <h1>Hello <strong>React</strong></h1>
                <p>This is a paragraph with some <strong>strong</strong> words in it which might get bolded</p>
                <MyComponent />
            </div>
        )
    }
}

React.render( <App />, document.body )
