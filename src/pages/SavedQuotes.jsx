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
import Tilt from "react-parallax-tilt";

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
        className=" md:mt-20 mt-4 mb-20 md:mb-4"
      >
        <Masonry gutter="2rem">
          {quotes?.map((e) => (
            <Tilt className="h-fit overflow-hidden mansory relative" key={e.id}>
              <div data-aos="zoom-in" data-aos-duration="1000">
                <SingleQuote
                  data={e.quote}
                  id={e.id}
                  handleRemoveFromBookmark={handleRemoveFromBookmark}
                />
              </div>
            </Tilt>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );
  } else {
    return (
      <div className="w-full h-screen flex justify-center items-center text-4xl font-sans font-black">
        <p className="max-w-[400px] capitalize opacity-40">nothing yet</p>
      </div>
    );
  }
};

export default SavedQuotes;
