import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Wrapper } from './index.style';
import { IRecordingProvider } from './models/Recording';
import RecordingProvider from './providers/RecordingProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let r: IRecordingProvider = new RecordingProvider();

root.render(
  <React.StrictMode>
    <Wrapper>
      <App recordingProvider={r} />
    </Wrapper>
  </React.StrictMode>
);
