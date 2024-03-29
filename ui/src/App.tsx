import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ArtistRecordings from "./components/ArtistRecordings";
import GenreCloud from "./components/GenreCloud";
import Header from "./layouts/Header";
import Main from "./Main";
import { IArtistInfoProvider } from "./providers/contracts/IArtistInfoProvider";
import { IGenreProvider } from "./providers/contracts/IGenreProvider";
import { IRecordingProvider } from "./providers/contracts/IRecordingProvider";
import { AlbumsView } from "./components/AlbumsView";
import { IAlbumsProvider } from "./providers/contracts/IAlbumsProvider";

interface IAppProps {
  artistInfoProvider: IArtistInfoProvider;
  albumsProvider: IAlbumsProvider;
  recordingProvider: IRecordingProvider;
  genreProvider: IGenreProvider;
}

// Move Header component inside BrowserRouter so we can make use of
// useNavigate hook inside child components.
export const App: React.FC<IAppProps> = (props: IAppProps) => {
  return (
    <div>
      {
        <React.Fragment>
          <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
              <Route path="/" element={<Main recordingProvider={props.recordingProvider} artistInfoProvider={props.artistInfoProvider} />} />
              <Route path="/genre" element={<GenreCloud genreprovider={props.genreProvider} />} />
              <Route path="/recordings/:artistId" element={<ArtistRecordings recordingProvider={props.recordingProvider} />} />
              <Route path="/albums/:artistId" element={<AlbumsView albumProvider={props.albumsProvider} />} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      }
    </div>
  );
}

export default App;
