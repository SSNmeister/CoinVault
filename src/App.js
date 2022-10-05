import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Vault from "./Pages/Vault";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";

const App = () => {
  const [watchListApp, setWatchListApp] = useState([]);
  const [watchListClicked, setWatchListClicked] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const handleClick = (element) => {
    setUserInput(element);
  };
  console.log(userInput);
  console.log(watchListApp);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="mainbody">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUserInput={setUserInput}
                userInput={userInput}
                handleClick={handleClick}
              />
            }
          />
          <Route
            path="/market"
            element={
              <Vault
                watchListApp={watchListApp}
                setWatchListApp={setWatchListApp}
                watchListClicked={watchListClicked}
                setWatchListClicked={setWatchListClicked}
                userInput={userInput}
                setUserInput={setUserInput}
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
