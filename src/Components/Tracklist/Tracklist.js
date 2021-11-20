import './Tracklist.css';
import React from "react";
import Track from '../Track/Track';

export class Tracklist extends React.Component {
    render() {
        return (
            <div className='Tracklist'>
                {
                    this.props.tracks.map(track => {
                        return <Track track={track}
                                    key={track.id}
                                    onAdd={this.props.onAdd}
                                    isRemoval={this.props.isRemoval}
                                    onRemove={this.props.onRemove}
                                     />
                    })  
                }
            </div>
        )
    }
}
