import { getTop50Tokens } from "@/app/api/getTopTokens";
import { useEffect, useState } from "react";

const TokenList = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await getTop50Tokens();
      setTokens(tokens);
    };
    fetchData();
  });

  return (
    <div className="flex flex-col">
      <h2>Select the currency to view statistics</h2>
      <div className="flex">
        {/* Map through tokens */}
        <img src="" alt="" />
        <div>
          <p>Token Name</p>
          <div>
            <p>Token Price</p>
            <div>
              <img src="" alt="green or red arrow" />
              <p>Percent change</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenList;
