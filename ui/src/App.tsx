import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenreCloud from "./components/GenreCloud";
import Header from "./layouts/Header";
import Main from "./Main";
import { IGenreProvider } from "./models/Genre";
import { IRecordingProvider } from "./models/Recording";

interface IAppProps {
  recordingProvider: IRecordingProvider;
  genreProvider: IGenreProvider;
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
              <Route path="/genre" element={<GenreCloud genreprovider={props.genreProvider} />} />
            </Routes>
          </BrowserRouter>
        </React.Fragment>
      }
    </div>
  );
}


export default App;
