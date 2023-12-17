import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleQuote from "../components/SingleQuote";
import QuoteBlock from "../components/QuoteBlock";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { useCallback } from "react";
import { toPng } from "html-to-image";
import { deleteItem } from "../redux/quotesSlice";

const SavedQuotes = () => {
  // ======================= Get all Quotes ==============//
  let quotes = useSelector((state) => state.quotes.value);
  let dispatch = useDispatch();
  // ================== remove from Bookmarks Function ============
  const handleRemoveFromBookmark = (id) => {
    dispatch(deleteItem({ id: id }));
    let data = JSON.parse(localStorage.getItem("home-quote"));
    data.saved = false;
    localStorage.setItem("home-quote", JSON.stringify(data));
  };

  if (quotes.length > 0) {
    return (
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 1000: 2 }}
        className="md:mt-20 mt-2 mb-20 md:mb-0"
      >
        <Masonry gutter="2rem">
          {quotes?.map((e) => (
            <div
              className="h-fit overflow-hidden mansory relative"
              key={e.id}
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <SingleQuote
                data={e.quote}
                id={e.id}
                handleRemoveFromBookmark={handleRemoveFromBookmark}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-4xl font-sans font-black">
        <p className="max-w-[400px] capitalize opacity-40">
          You have not saved anything yet, go to the main page and click on the
          save icon
        </p>
      </div>
    );
  }
};

export default SavedQuotes;
