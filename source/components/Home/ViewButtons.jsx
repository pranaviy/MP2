import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class ViewButtons extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selected: ""
        };
    }
    
    componentWillMount() {
        this.setState({
            selected: 'list' // <== Here, the values of selected options
        });
    }

    render() {
        return (
            <div className = "viewbuttons">
                <Button onClick={(e) => this.setState({selected: 'list'})}>List View</Button>
                <Button onClick={(e) => this.setState({selected: 'gallery'})}>Gallery View</Button>
                <Button onClick={(e) => this.setState({selected: 'detail'})}>Detail View</Button>
            </div>
        );
    }
}