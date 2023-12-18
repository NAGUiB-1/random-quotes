import React from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import gradient from "random-gradient";
import { FiDownload } from "react-icons/fi";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { MdOutlineDeleteOutline } from "react-icons/md";

const SingleQuote = ({ data, id, handleRemoveFromBookmark }) => {
  // ====================Handle Random Gradient ========//
  const bgGradient = gradient(id);
  // ====================Handle Download Button ========//
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
    <div className="relative">
      <div
        className="text-3xl md:text-5xl text-center  md:p-10 p-3 rounded-3xl h-fit "
        style={{
          background: bgGradient,
        }}
        ref={ref}
      >
        <div className=" left-0  top-[-3rem]  opacity-40">
          <ImQuotesLeft size={60} />
        </div>
        <p className="font-['Caveat',cursive] drop-shadow-2xl [text-shadow:_12px_12px_20px_rgb(0_0_0_/_40%)]">
          {data}
        </p>
        <div className="flex justify-end  opacity-40 w-full">
          <ImQuotesRight size={60} />
        </div>
      </div>
      <div className="absolute bottom-1 left-[calc(50%-44px)] flex gap-2">
        <button onClick={onButtonClick}>
          <FiDownload
            size={40}
            className="hover:text-blue-500 transition-all cursor-pointer"
          />
        </button>
        <MdOutlineDeleteOutline
          onClick={() => handleRemoveFromBookmark(id)}
          size={40}
          className="hover:text-red-500 transition-all cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SingleQuote;
