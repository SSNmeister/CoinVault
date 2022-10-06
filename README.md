# CoinVault
One stop location to view your favourite coins and statistics.  This application is built using JavaScript React, HTML & CSS on VSC.

APIs from CoinGecko and CoinCap were used to tabulate the relevant data.

# Table of Contents

1. [ Project Description ](#desc)
2. [ Parent Components ](#parentcomponents)
* [App](#app)
* [Home](#home)
* [User Input](#userinput)
* [Vault](#vault)
* [WatchList Page](#watchlistpage)
3. [ Child Components Creation ](#childcomponents)
* [Cards](#cards)
* [Modals](#modals)
* [WatchList](#watchlist)
4. [ Page Routings ](#routings)

<a name="desc"></a>
## 1. Project Description
CoinVault is an application that allows you to freely explore the latest market data on crypto coins and stay updated via The Market Place. You can store your favourite coins in the vault and actively monitor their market progress! 

Simply key in the coin's id and you can view the data and trends.
 
<a name="parentcomponents"></a>
## 2. Creating Parent Components
<p>Multiple components will be created to handle the data and build the foundation for this application. There will be three different tiers of components.</p>

<p>Some of the parent components include:</p>
<li>App</li>
<li>Home</li>
<li>User Input</li>
<li>Vault</li>
<li>Favourites</li>
<li>NavBar</li>

<a name="app"></a>
<h3>2.1. App Component</h3>
<p>The App Component is the parent to multiple components such as</p>
<li>Home</li>
<li>Vault</li>
<li>Favourites</li>
<li>NavBar</li>

<p>React hooks such as useStates are set up to enable propping and lifting from Parent to Child and Child to Parent Components, respectively.</p>
<p>Below are the react hooks and libraries that were used in the App component. These are essential to pass data between components and using of various methods.</p>

```
import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Vault from "./Pages/Vault";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";
```


<p>Some examples of useStates in the App Component are shown below. These are created to allow the seamless flow of activities from user input, to fetching of data and finally displaying them on the screen.</p>

```
const [watchListApp, setWatchListApp] = useState([]);
const [watchListClicked, setWatchListClicked] = useState(false);
const [userInput, setUserInput] = useState(null);
const [sortClick, setSortClick] = useState(false);
const [sortClickPrice, setSortClickPrice] = useState(false);
```

<p>Functions are created within the App component to perform various activities such as sorting of data and handling user inputs. </p>


<a name="home"></a>
<h3>2.2. Home Component (Main Page) </h3>
<p>The Home Component will act as the main page of the application, providing the navigation link for the uses to route between pages of the app.</p>

```
import { Link } from "react-router-dom";
```


```
<Link to="/market" className="marketplace-image-box">
 <img className="marketplace-image" src={logo} alt="coinImage" />
</Link>
```
<p>Importing the react-router-dom library and using the <Link> tag, we able to route between pages. </p>

<a name="userinput"></a>
<h3>2.3. The Main Content Component</h3>
<p>This is the component where user input will be handled </p>

<p>User's input will be tracked onChange and passed to the handleSetSearch function. Upon submission, the function handleSearch will set the userInput, which will be used to fetch the relevant data from the API. 

```
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
    </main>
  );
};

```



<a name="vault"></a>
<h3>2.4. Vault Component (this is the marketplace page)</h3>
<p>The Vault parent component handles most of the data by propping and lifting through various functions within the parent-child components. </p>
<p>For example, React props are being lifted through the handle search function tied to the search button. The user's input will be stored resulting in a change in "owner" state, rendering and fetching the API. The user's input will be stored resulting in a change in "userInput" state, rendering the fetching of coin data. </p>


<p> Another react hook, the useEffect method is used to render the asynchronous fetch function whenever the "userInput" state changes, i.e. any changes in user input will excecute the fetch function using Coin Gecko's API for fetching the coin data using the coin id entered by the user. </p>

```
  const getTopCoin = async (url) => {
    const res = await fetch(`https://api.coincap.io/v2/assets`);
    const data = await res.json();
    setTopCoin(data.data.slice(0, 5));
  };

  useEffect(() => {
    getTopCoin();
    fetchCoin(props.userInput);
  }, [props.userInput, setTopCoin]);
  
```

<p> Below is an example of the asynchronous fetching of data from the Coin Gecko's API</p>

```
  let userKeyedValue = null;
  const handleSetSearch = (event) => {
    userKeyedValue = event.target.value;
  };
  const handleSearch = (event) => {
    event.preventDefault();
    props.setUserInput(userKeyedValue);
  };

  const fetchCoin = async (item) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${item}?community_data=true&developer_data=true`
        // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${item}&order=market_cap_desc&per_page=1000&page=1&sparkline=false/`
      );
      const data = await res.json();
      setCoinList(data);
      console.log("data");
      console.log(data);
    } catch (e) {
      console.log("error");
    }
  };
```
  
 <p> The watchlist array is being built upon in this component.</p>

<p> The user will be able to favourite to watch list any coin of their choice, this is done by creating a watchListApp array and the addToCart function. The user will also be able to remove any previously added coin data in the watch list, which is done through the removeFromCart function and by filtering out the data by id from the array.</p>

```
  let watchListClicked = props.watchListClicked;
  let setWatchListClicked = props.setWatchListClicked;

  const addToCart = (item) => {
    props.setWatchListApp([...props.watchListApp, item]);
    setWatchListClicked(true);
  };
  const watchListFromApp = props.watchListApp;

  const removeFromCart = (index) => {
    const watchListArry = props.watchListApp.filter((d, i) => d.id !== index);
    props.setWatchListApp(watchListArry);
  };

```

<p>The below code is used to handle the opening of modal by applying useState react hooks </p>

```
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };
```
  
<p> Next, the data "openModalDetails" is being passed to the modal component, where it will be used to fetch API data to create the chart, which will be made using the chart.js library </p>

<p> For example, as shown below, the modalData will be set as the item.id pass from the child component.

```
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
```

<p> Data is being propped from the parent component (App) to other child components such as MainContent, CoindCard and WatchList. </p>

```
   <div className="App">
        <div className="main-box">
          <div className="main-content">
            <MainContent
              handleSearch={handleSearch}
              handleSetSearch={handleSetSearch}
            />
          </div>
          <div className="main-body-with-sidebar-coincard">
            <div className="sidebar-box">
              <Sidebar topCoin={topCoin} />
            </div>
            <div className="searched-coin-list">
              {coinList.market_data ? (
                <CoinCard
                  coinList={coinList}
                  addToCart={addToCart}
                  watchListFromApp={watchListFromApp}
                  watchListApp={watchListApp}
                  removeFromCart={removeFromCart}
                  setIsShown={setIsShown}
                />
              ) : (
                <CoinCardError coinList={coinList} addToCart={addToCart} />
              )}
            </div>
            <div className="finger-pointing-box">
              {isShown && props.watchListApp.length == 0 ? (
                <img className="finger-pointing-image" src={fingerpoint} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div>
          {watchListClicked ? (
            <WatchList
              removeFromCart={removeFromCart}
              setOpenModal={setOpenModal}
              openModal={openModal}
              handleOpenModalDetails={handleOpenModalDetails}
              watchListFromApp={watchListFromApp}
              runSorting={runSorting}
              runSortingReverse={runSortingReverse}
              sortClick={sortClick}
              runSortingByPrice={runSortingByPrice}
              runSortingByPriceReverse={runSortingByPriceReverse}
              sortClickPrice={sortClickPrice}
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
```


<a name="watchlistpage"></a>
<h3>2.5. Watch List Component</h3>
