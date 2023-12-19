"use client";

import { getTokenTable } from "../../api/getTokenTable";
import { useState, useEffect } from "react";
import TableRow from "./TableRow";

const TokenTable = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Function returns array
      const tokens = await getTokenTable();
      setTokens(tokens);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center w-full pt-[72px] pb-[38px]">
      {/* Map through avaible coins */}
      {/* Display 10 coins at a time, if user scrolls down --> display another 10 */}
      {/* Structure below: */}
      <div className="flex flex-col gap-2">
        <div className="text-[#D1D1D1] flex gap-5 p-5">
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
        {tokens.map((t) => (
          <TableRow token={t} />
        ))}
      </div>
    </div>
  );
};

export default TokenTable;
