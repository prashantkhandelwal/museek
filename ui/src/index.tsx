import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Wrapper } from './index.style';
import { IGenreProvider } from './providers/contracts/IGenreProvider';
import { IRecordingProvider } from './providers/contracts/IRecordingProvider';
import GenreProvider from './providers/GenreProvider';
import RecordingProvider from './providers/RecordingProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let r: IRecordingProvider = new RecordingProvider();
let g: IGenreProvider = new GenreProvider();

root.render(
  <React.StrictMode>
    <Wrapper>
      <App
        recordingProvider={r}
        genreProvider={g} />
    </Wrapper>
  </React.StrictMode>
);
