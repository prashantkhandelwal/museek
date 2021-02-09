import { AppBar, Button, Container, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import { useState } from 'react';

function App() {

  const [artistName, setArtistName] = useState('');

  const search = async () => {
    const res = await fetch("https://localhost:44387/brainz?name=" + artistName);
    const data = res.json().then(function(d){
      console.log(d.results[0].name);
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
      <Container maxWidth="sm" style={{ paddingTop: "40px" }}>
        <div className="App">
          <header className="App-header">
            <TextField id="standard-basic" label="Artist Name" value={artistName}
              onChange={(e) => setArtistName(e.target.value)} />
            <Button style={{ marginTop: "13px", marginLeft: "8px" }} variant="contained" color='primary' onClick={search}>Search</Button>
          </header>
        </div>
      </Container>
    </>
  );
}

export default App;
