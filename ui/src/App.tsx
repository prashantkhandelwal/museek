import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenreCloud from "./components/GenreCloud";
import Header from "./layouts/Header";
import Main from "./Main";
import { IRecordingProvider } from "./models/Recording";

interface IAppProps {
  recordingProvider: IRecordingProvider;
}

export const App: React.FC<IAppProps> = (props: IAppProps) => {
  return (
    <div>
      {
        <React.Fragment>
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main recordingProvider={props.recordingProvider} />} />
              <Route path="/genre" element={<GenreCloud />} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      }
    </div>
  );
}


export default App;
