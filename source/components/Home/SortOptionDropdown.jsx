import React, { Component } from 'react'
import { Form, Dropdown, Select } from 'semantic-ui-react'

export default class SortOption extends React.Component {
    constructor(props) {
        super(props);
        this.options = [{value:'vote_average', text:'Rating'},
                        {value:'popularity', text:'Popularity'},];
        this.state = {
            selected: ""
        };
    }
    
    componentWillMount() {
        this.setState({
            selected: 'vote_average', // <== Here, the values of selected options
        });
    }

    render() {
        return (
            <Select placeholder='Sort by:' type='text' fluid selection options={this.options} defaultValue = 'popularity' onChange={(e, { value }) => this.setState({selected: value})} />
    );
  }
}
