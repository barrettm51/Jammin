import React from 'react';
import './Playlist.css';
import { Tracklist } from '../Tracklist/Tracklist';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    }

    handlePlaylistNameChange(event) {
        this.props.playlistNameChange(event.target.value);
    }

    render() {
        return (
            <div className='Playlist'>
                <input defaultValue={'New Playlist'} onChange={this.handlePlaylistNameChange} />
                <Tracklist tracks={this.props.playlistTracks}
                           isRemoval={true}
                           onRemove={this.props.onRemove} />
                <button className='Playlist-save' onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}