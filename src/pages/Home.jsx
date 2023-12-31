import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../redux/quotesSlice";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import HomeSingleQuote from "../components/HomeSingleQuote";
import ClipLoader from "react-spinners/ClipLoader";
import { HashLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#36d7b7",
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  // ==================== Dispatcher =================
  let dispatch = useDispatch();
  // ==================== Globale Data =================
  let quotes = useSelector((state) => state.quotes.value);

  // ======== Get data from LocalStorage and add it into state if no data in ls return null ===========
  const [savedData, setSavedData] = useState(
    JSON.parse(localStorage.getItem("home-quote"))
  );
  // ==================== Toggle State ================
  let [bookmarked, setBookmarked] = useState(savedData?.saved);

  // ================= Add To Bookmarks Function ===============
  const handleAddToBookmark = () => {
    dispatch(addItem({ id: savedData.id, quote: savedData.content }));
    let data = savedData;
    data.saved = true;
    localStorage.setItem("home-quote", JSON.stringify(data));
    setBookmarked(data.saved);
  };

  // ================== remove from Bookmarks Function ============
  const handleRemoveFromBookmark = () => {
    dispatch(deleteItem({ id: savedData.id }));
    // addGlobaleStateToLocalStorage(quotes)
    let data = savedData;
    data.saved = false;
    localStorage.setItem("home-quote", JSON.stringify(data));
    setBookmarked(data.saved);
  };

  //===================== get the data from Api ==================
  const fetchData = async () => {
    setLoading(true);
    let response = axios
      .get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "LC2eD/jeI+KDQv28efliNQ==TVfus1gVOVLeBibR",
        },
      })
      .then((q) => {
        let data = { content: q.data[0].quote, id: uuidv4(), saved: false };
        localStorage.setItem("home-quote", JSON.stringify(data));
        setSavedData(data);
        setBookmarked(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    // ============= save data to localstorage to prevent fetch new data on every reload ===========
    const home_quote = JSON.parse(localStorage.getItem("home-quote"));

    home_quote == null ? fetchData() : "";
  }, [quotes]);

  return (
    <div className="min-h-[calc(100svh-5rem)] mt-4 md:mt-20 w-full flex justify-center items-center flex-col gap-4 pb-20 md:pb-0 ">
      {/* Quote Component */}
      {loading ? (
        <HashLoader
          color="#36d7b7"
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <HomeSingleQuote
          fetchData={fetchData}
          bookmarked={bookmarked}
          handleAddToBookmark={handleAddToBookmark}
          handleRemoveFromBookmark={handleRemoveFromBookmark}
          savedData={savedData}
        />
      )}
    </div>
  );
};

export default Home;
