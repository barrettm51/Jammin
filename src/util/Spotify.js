let accessToken;
let clientID = '8a03c8dc2d08493b9920c37bad895ba6';
let redirectUri = "http://btjammin.surge.sh";

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } 
        let spotifyUrl = window.location.href;
        const accessTokenMatch = spotifyUrl.match(/access_token=([^&]*)/);
        const expiresInMatch = spotifyUrl.match(/expires_in=([^&]*)/);
        
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1]; //Should this be [0]?
            const expiresIn = Number(expiresInMatch[1]);
            //This clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout( () => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = 'https://accounts.spotify.com/authorize?client_id='+clientID+'&response_type=token&scope=playlist-modify-public&redirect_uri='+redirectUri;
            window.location = accessUrl;
            return accessToken;
        }
    },

    search(term) {
        const accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(response => response.json()
        ).then( (jsonResponse) => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    },

    savePlaylist(playlistName, trackUris) {
        if(!playlistName || !trackUris.length) {
            return;
        }

        let accessToken = this.getAccessToken();
        let requestHeaders = { Authorization: `Bearer ${accessToken}`};
        let userID;
        
        return fetch(`https://api.spotify.com/v1/me`, { headers: requestHeaders })
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: requestHeaders,
                method: "POST",
                body: JSON.stringify({name: playlistName})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: requestHeaders,
                    method: "POST",
                    body: JSON.stringify({ uris: trackUris })
                })
            })
        })
    }
};

export default Spotify;