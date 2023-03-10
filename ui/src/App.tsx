import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenreCloud from "./components/GenreCloud";
import Header from "./layouts/Header";
import Main from "./Main";
import { IGenreProvider } from "./providers/contracts/IGenreProvider";
import { IRecordingProvider } from "./providers/contracts/IRecordingProvider";

interface IAppProps {
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
            <Header />
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
