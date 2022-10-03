import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import CoinCard from "./components/CoinCard";
import WatchList from "./components/WatchList";
import CoinCardError from "./components/CoinCardError";
import Modal from "./components/Modal";

export default function App() {
  const [coinList, setCoinList] = useState([]);
  const [topCoin, setTopCoin] = useState([]);
  // const [search, setSearch] = useState("");
  let userInput = "bitcoin";

  //========================= TOP 5 COINS ===========================
  const getTopCoin = async (url) => {
    const res = await fetch(`https://api.coincap.io/v2/assets`);
    const data = await res.json();

    setTopCoin(data.data.slice(0, 5));
  };

  useEffect(() => {
    getTopCoin();
    fetchCoin(userInput);
  }, []);

  //========================== SEARCH COINS ==========================
  //=========== handleSearch onSubmit ==============
  const handleSearch = (event) => {
    event.preventDefault();
    fetchCoin(userInput);
  };
  const handleSetSearch = (event) => {
    userInput = event.target.value;
  };

  // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${item}&order=market_cap_desc&per_page=1000&page=1&sparkline=false/
  const fetchCoin = async (item) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${item}?community_data=true&developer_data=true`
      // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${item}&order=market_cap_desc&per_page=1000&page=1&sparkline=false/`
    );
    const data = await res.json();
    console.log(data);
    setCoinList(data);
  };

  //========================= WATCHLIST ARRAY ===========================
  const [watchListClicked, setWatchListClicked] = useState(false);

  //=== Pushing CoinCard's data into WatchList array ===
  const [watchList, setWatchList] = useState([]);
  const addToCart = (item) => {
    setWatchList([...watchList, item]);
    setWatchListClicked(true);
  };
  console.log(watchList);

  const removeFromCart = (index) => {
    const watchListArry = watchList.filter((d, i) => i !== index);
    setWatchList(watchListArry);
  };

  //=========================== OPEN MODAL =============================
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  //============================= CHART ===============================
  const [openModalDetails, setOpenModalDetails] = useState("");
  const [coinDetails, setCoinDetails] = useState("");

  //=========== Set modalData to item.id ===========
  //= Receive watchlist data from WatchList array =
  const handleOpenModalDetails = (modalData) => {
    setOpenModal(true);

    setOpenModalDetails(modalData.id);

    //======= CHART (left) =======
    setCoinDetails(modalData);
  };

  //===================================================================

  return (
    <div className="App">
      <Header />
      <div className="main-box">
        <div className="main-content">
          <MainContent
            handleSearch={handleSearch}
            // search={search}
            handleSetSearch={handleSetSearch}
            coinList={coinList}
          />
        </div>
        <div className="searched-coin-list">
          {coinList.market_data ? (
            <CoinCard
              coinList={coinList}
              watchList={watchList}
              addToCart={addToCart}
              watchListClicked={watchListClicked}
            />
          ) : (
            <CoinCardError
              coinList={coinList}
              watchList={watchList}
              addToCart={addToCart}
              watchListClicked={watchListClicked}
            />
            // <div id="searched-coin-list-default">Find your coin.</div>
          )}
        </div>
      </div>
      <div className="sidebar-box">
        <Sidebar topCoin={topCoin} />
      </div>
      <div>
        {watchListClicked ? (
          <WatchList
            removeFromCart={removeFromCart}
            watchList={watchList}
            setOpenModal={setOpenModal}
            openModal={openModal}
            handleOpenModalDetails={handleOpenModalDetails}
          />
        ) : (
          <></>
        )}
      </div>
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        openModalDetails={openModalDetails}
        coinDetails={coinDetails}
      />
    </div>
  );
}
