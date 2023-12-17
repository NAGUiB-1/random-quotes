import React from "react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import gradient from "random-gradient";

const QuoteBlock = ({ blockRef, data, id }) => {
  let uuid = id ? id : Math.round(Math.random() * 100);
  const bgGradient = gradient(uuid);
  return (
    <div
      className="text-3xl md:text-4xl text-center relative  md:p-8 p-3 rounded-3xl h-fit max-w-[750px]"
      data-aos="fade-left"
      style={{
        background: bgGradient,
      }}
      /* Ref For DownloadButton in Home page */
      ref={blockRef}
    >
      <div className=" left-0  top-[-3rem]  opacity-40">
        <ImQuotesLeft size={60} />
      </div>
      <p className="font-['Caveat',cursive] [text-shadow:_12px_12px_20px_rgb(0_0_0_/_40%)]">
        {data}
      </p>
      <div className="flex justify-end  opacity-40 w-full">
        <ImQuotesRight size={60} />
      </div>
    </div>
  );
};

export default QuoteBlock;
