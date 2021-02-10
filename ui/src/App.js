import { useState } from 'react';
import { AppBar, Button, Container, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import Artist from './Components/Artist';
import './Museek.css';

function App() {

  const [artistName, setArtistName] = useState('');
  const [artist, setArtist] = useState({});

  const search = async () => {
    const res = await fetch("https://localhost:44387/brainz?name=" + artistName);
    const data = res.json().then(function (d) {
      setArtist({ 'data': d.results });
    })

    return data;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6">
            Museek
    </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ paddingTop: "40px" }}>
        <div className="App">
          <header className="App-header">
            <div className="searchControls">
              <TextField id="standard-basic" label="Artist Name" value={artistName}
                onChange={(e) => setArtistName(e.target.value)} />
              <Button style={{ marginTop: "13px", marginLeft: "8px" }} variant="contained" color='primary' onClick={search}>Search</Button>
            </div>
          </header>
        </div>
        <Artist artist={artist} />
      </Container>
    </>
  );
}

export default App;
