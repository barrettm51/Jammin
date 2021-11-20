import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.enterKey = this.enterKey.bind(this);
        this.state = {
            term: ''
        }
    }
    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({term: event.target.value});
    }

    enterKey(e) {
        if(e.key === 'Enter') {
            this.search();
        }
    }

    render() {
     return(
        <div className='SearchBar'>
            <input placeholder='Enter a Song, Album or Artist' onChange={this.handleTermChange} onKeyPress={this.enterKey}/>
            <button className='SearchButton' onClick={this.search} >SEARCH</button>
        </div>
    )
    }
}