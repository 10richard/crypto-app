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
    <div className="flex justify-center w-full">
      {/* Map through avaible coins */}
      {/* Display 10 coins at a time, if user scrolls down --> display another 10 */}
      {/* Structure below: */}
      <div className="flex flex-col">
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {tokens.map((t) => (
          <TableRow token={t} />
        ))}
      </div>
    </div>
  );
};

export default TokenTable;
