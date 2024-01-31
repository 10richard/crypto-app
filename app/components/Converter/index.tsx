import PricesChart from "../DuoCharts/PricesChart";
import TimePeriodSelector from "../DuoCharts/TimePeriodSelector";

// Get past data for left and right token
// Divide each price point of left by right
// Graph the result
const Converter = () => {
  return (
    <div className="pb-[70px]">
      <div>
        <h2>Online currency convertor</h2>
        <p>Date Today</p>
      </div>
      <div>
        <div>
          <div>
            <h3>You sell</h3>
            <div>
              <div>
                <div>
                  <img src="token logo" alt="" />
                  <p>Bitcoin (BTC)</p>
                  <img src="chevron down" alt="" />
                </div>
                <input type="text" />
              </div>
              <div className="border border-t-[1px]"></div>
            </div>
          </div>
          <div>
            <h3>You buy</h3>
            <div>
              <div>
                <div>
                  <img src="token logo" alt="" />
                  <p>Ethereum (ETH)</p>
                  <img src="chevron down" alt="" />
                </div>
                <input type="text" />
              </div>
              <div className="border border-t-[1px]"></div>
            </div>
          </div>
          <div>
            {/* <PricesChart /> */}
            {/* <TimePeriodSelector /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
