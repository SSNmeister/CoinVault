import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Vault from "./Pages/Vault";
import About from "./Pages/About";
import Favourites from "./Pages/Favourites";

const App = () => {
  const [watchListApp, setWatchListApp] = useState([]);
  const [watchListClicked, setWatchListClicked] = useState(false);
  console.log(watchListApp);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="mainbody">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route
            path="/"
            element={
              <Vault
                watchListApp={watchListApp}
                setWatchListApp={setWatchListApp}
                watchListClicked={watchListClicked}
                setWatchListClicked={setWatchListClicked}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                watchListApp={watchListApp}
                setWatchListApp={setWatchListApp}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
