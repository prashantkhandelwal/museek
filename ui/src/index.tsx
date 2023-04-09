import ReactDOM from 'react-dom/client';
import App from './App';
import { Wrapper } from './index.style';
import ArtistInfoProvider from './providers/ArtistInfoProvider';
import { IArtistInfoProvider } from './providers/contracts/IArtistInfoProvider';
import { IGenreProvider } from './providers/contracts/IGenreProvider';
import { IRecordingProvider } from './providers/contracts/IRecordingProvider';
import GenreProvider from './providers/GenreProvider';
import RecordingProvider from './providers/RecordingProvider';
import { IAlbumsProvider } from './providers/contracts/IAlbumsProvider';
import AlbumsProvider from './providers/AlbumsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let r: IRecordingProvider = new RecordingProvider();
let g: IGenreProvider = new GenreProvider();
let a: IArtistInfoProvider = new ArtistInfoProvider();
let b: IAlbumsProvider = new AlbumsProvider();

root.render(
  <Wrapper>
    <App
      recordingProvider={r}
      genreProvider={g}
      artistInfoProvider={a}
      albumsProvider={b}
    />
  </Wrapper>
);
