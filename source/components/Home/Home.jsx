import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Dropdown, Button, Checkbox, Form, Divider, Header, Grid } from 'semantic-ui-react'

import SortOption from './SortOptionDropdown.jsx'
import SortOrder from './SortOrderDropdown.jsx'
import ViewButtons from './ViewButtons.jsx'
import styles from './Home.scss'

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            query: "",
            sortOption: "",
            sortOrder: "",
            view: ""
        };
    }
    
    componentDidMount() {
        //this.search();
    }

    search(query, sortopt, sortord, viewsel) {
        //console.log(query);
        let that = this;
        
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=366c69e73fb92a5beaeb16e3afbcb409&language=en-US&page=1&query='+query+'&page=1&include_adult=false')
            .then(resp => {
                //console.log(resp.data.results);
                var totalmovies = resp.data.results;            
                //console.log(totalmovies);
                var sortJsonArray = require('sort-json-array');
                totalmovies = sortJsonArray(totalmovies, sortopt, sortord);
                //console.log(totalmovies);
                this.setState({
                    movies: totalmovies,
                    query: query,
                    sortOption: sortopt,
                    sortOrder: sortord,
                    view: viewsel
                });
            })
            .then(noresult =>{
                if(this.state.movies.length == 0) {
                    this.setState({
                        movies: [{title: 'No Results. Please try broadening your search.', poster_path: ""}],
                        query: "",
                        sortOption: "", 
                        sortOrder: "",
                        viewsel: "list"
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    updateSearch() {
        this.search(this.refs.query.value, this.refs.opt.state.selected, this.refs.ord.state.selected, this.refs.viewopt.state.selected);
        //console.log(this.refs.opt.state.selected);
        //console.log(this.refs.ord.state.selected);
        //console.log(this.refs.viewopt.state.selected);
    }
    
    render(){
        return(
            <Container className = "site">
                <div className = "topPortion">
                    <Header as='h1' id = 'welcometitle'>Movie Search</Header>
                    <Form>
                        <Form.Field>
                            <input placeholder='Search for a movie' ref='query' type='text' onChange={(e) => this.updateSearch()} />
                        </Form.Field>
                        <Header as='h4' id = "sorttitle">Sort By</Header>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <SortOption ref = 'opt' type = 'text'/>
                            </Form.Field>
                            <Form.Field>
                                <SortOrder ref = 'ord' type = 'text'/>
                            </Form.Field>
                        </Form.Group>
                        <div id = 'sortbut'>
                            <Button floated='right' onClick={(e) => this.updateSearch()}> Sort Results </Button>
                        </div>
                        <ViewButtons ref = 'viewopt' type = 'text' onClick={(e) => this.updateSearch()}/>
                    </Form>
                </div>
                
                {
                    <div>
                        {this.state.view === 'list' ? (                    
                            this.state.movies.map(function(movie){
                                return <div key={movie.id} className="listresult">
                                    <div key={movie.id} className= "movieposter">
                                        <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt={'No Image Available for "' + movie.title + '"'}/>
                                    </div>
                                    <div className = "moviedetails">
                                        <Header key={movie.title} className = "movietitle" as='h3'>{movie.title}</Header>
                                        <Header key={movie.release_date} className = "moviemeta" as='h5'> Released: {movie.release_date}</Header>
                                        <Header key={movie.vote_average} className = "moviemeta" as='h5'> User rating: {movie.vote_average} </Header>
                                        <br/>
                                        <Header key={movie.overview} className = "movieoverview" as='h5'> {movie.overview} </Header>
                                    </div>
                                    <Divider hidden />
                                </div>
                            })
                        ) : this.state.view === 'gallery' ? (
                        //gallery view                
                        this.state.movies.map(function(movie){
                                return <div key={movie.id} className="galleryresult">
                                    <div key={movie.id} className = "movieposter">
                                        <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} key={movie.id} alt={'No Image Available for "' + movie.title + '"'}/>
                                    </div>
                                </div>
                            }) 
                        ) : null
                        }
                    </div>
                }
                
            </Container>
        )
    }
}

export default Home
