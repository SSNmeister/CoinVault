import React from "react";
import CoinCard from "./CoinCard";

const MainContent = (props) => {
  return (
    <main>
      <div className="main-head">
        <form className="search--box" onSubmit={props.handleSearch}>
          <input
            className="search--input"
            type="search"
            placeholder="  search your coin..."
            required
            // value={props.search}
            onChange={props.handleSetSearch}
          />
        </form>
      </div>
      {/* <div className="searched-coin-list"> */}
      {/* <div className="coin-card">{props.coinList.marketCapUsd}</div> */}
      {/* </div> */}
    </main>
  );
};

export default MainContent;
