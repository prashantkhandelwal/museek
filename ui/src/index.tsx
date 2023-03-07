import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IRecordingProvider } from './models/Recording';
import RecordingProvider from './providers/Recording';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let r: IRecordingProvider = new RecordingProvider();

root.render(
  <React.StrictMode>
    <App recordingProvider={r} />
  </React.StrictMode>
);
