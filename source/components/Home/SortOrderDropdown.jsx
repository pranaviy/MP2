import React, { Component } from 'react'
import { Form, Dropdown, Select } from 'semantic-ui-react'

export default class SortOrder extends React.Component {
    constructor(props) {
        super(props);
        this.options = [
                {value:'asc', text:'Ascending'},
                {value:'des', text:'Descending'},];
        this.state = {
            selected: ""
        };
    }
    
    componentWillMount() {
        this.setState({
            selected: 'des' // <== Here, the values of selected options
        });
    }

    render() {
        return (
            <Select placeholder='Order:' type='text' fluid selection options={this.options} defaultValue = 'des' onChange={(e, { value }) => this.setState({selected: value})} />
        );
    }
}
