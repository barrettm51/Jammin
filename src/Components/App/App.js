import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playlistNameChange = this.playlistNameChange.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = { 
      searchResults: [
        /*{
          name: 'Smells Like Teen Spirit',
          artist: 'Nirvana',
          album: 'Nevermind',
          id: 1 
        }, {
          name: 'The Prowl',
          artist: 'Dan Auerbach',
          album: 'Keep It Hid',
          id: 2
         }, {
           name: 'Heatwaves',
           artist: 'Glass Animals',
           album: 'Dreamland',
           id: 3
         }*/
      ],
      playlistName: "New playlist",
      playlistTracks: [
        /*{
          name: 'The Ghetto',
          artist: 'Too Short',
          album: "Short Dog's in the House",
          id: 4
        }, {
          name: 'Blow the Whistle',
          artist: 'Too Short',
          album: 'Blow the Whistle',
          id: 5
        }, {
          name: 'Big Subwoofer',
          artist: 'Too Short, Snoop Dogg, Ice Cube, E-40',
          album: 'Big Subwoofer',
          id: 6
        }*/
      ]
   };
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else{
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      })
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackIndex = tracks.findIndex(song => song.id === track.id);
    tracks.splice(trackIndex, 1);
    this.setState( { playlistTracks: tracks });
  } 

  playlistNameChange(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then( () => {
      this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
      })
    }
    );
    
    //Hard coded uri values
    /*const base62 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let numberOfUris = this.state.playlistTracks.length;
    let uriArray = [];
    for(let j=0; j<numberOfUris; j++) {
      let uri = '';
      for(let i=0; i<22; i++) {
        let selector = Math.floor(Math.random()*62);
        uri += (base62[selector]);
      }
      uriArray.push(uri);
    }
    this.setState({ trackURIs: uriArray });*/
  }
  
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                           onAdd={this.addTrack} />
            <Playlist searchResults={this.state.searchResults} 
                      playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      playlistNameChange={this.playlistNameChange}
                      onSave={this.savePlaylist} /> 
          </div>
        </div>
      </div>
    )}
}

export default App;
