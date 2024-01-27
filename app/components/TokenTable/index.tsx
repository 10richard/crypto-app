"use client";

import { getTop50Tokens } from "../../api/getTopTokens";
import { useState, useEffect } from "react";
import TableRow from "./TableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import { useCurrency } from "@/app/contexts/currencyContext";

const TokenTable = () => {
  const [tokens, setTokens] = useState([]);
  const [displayTokens, setDisplayTokens] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { currentCurrency } = useCurrency();

  const fetchMoreData = () => {
    if (displayTokens.length >= 50) {
      setHasMore(false);
      return;
    }

    let newLen = displayTokens.length + 10;
    setTimeout(() => {
      setDisplayTokens(tokens.slice(0, newLen));
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await getTop50Tokens(currentCurrency);
      setTokens(tokens);
      setDisplayTokens(tokens.slice(0, 10));
    };
    fetchData();
  }, [currentCurrency]);

  return (
    <div className="flex justify-center pt-[72px] pb-[38px]">
      <MaxWidthContainer className="flex flex-col gap-2">
        <div className="text-content-sub flex justify-between gap-5 p-5">
          <div className="w-4">#</div>
          <div className="w-[208px]">Name</div>
          <div className="w-20">Price</div>
          <div className="w-[72px]">1h%</div>
          <div className="w-[72px]">24h%</div>
          <div className="w-[72px]">7d%</div>
          <div className="w-[228px]">24h volume / Market cap</div>
          <div className="w-[228px]">Circulating / Total Supply</div>
          <div className="w-[120px]">Last 7d</div>
        </div>
        <InfiniteScroll
          dataLength={displayTokens.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p className="text-center text-content-main">Loading...</p>}
        >
          {displayTokens.map((t, idx) => (
            <TableRow key={idx} token={t} />
          ))}
        </InfiniteScroll>
      </MaxWidthContainer>
    </div>
  );
};

export default TokenTable;
