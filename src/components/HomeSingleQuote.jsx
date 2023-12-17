import React, { useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { FiDownload } from "react-icons/fi";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import QuoteBlock from "./QuoteBlock";

const HomeSingleQuote = ({
  // ==================== get props from parent ============= //
  handleAddToBookmark,
  handleRemoveFromBookmark,
  bookmarked,
  savedData,
  fetchData,
}) => {
  // ====================Handle Download Button ======== //
  let ref = useRef(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Quote";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  return (
    <>
      <QuoteBlock
        key={savedData?.id}
        blockRef={ref}
        data={savedData?.content}
        id={savedData?.id}
      />
      {/********************* controllers **********/}
      <div className="flex gap-6 text-3xl">
        <button onClick={onButtonClick}>
          <FiDownload />
        </button>
        <div className="cursor-pointer">
          {bookmarked ? (
            <MdBookmarkAdded onClick={handleRemoveFromBookmark} />
          ) : (
            <MdBookmarkAdd onClick={handleAddToBookmark} />
          )}
        </div>
        <div
          className=" cursor-pointer"
          onClick={() => {
            fetchData();
          }}
        >
          <TfiReload />
        </div>
      </div>
    </>
  );
};

export default HomeSingleQuote;
