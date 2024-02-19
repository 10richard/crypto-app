const AssetContainer = () => {
  return (
    <div>
      <div>
        <img src="" alt="token img" />
        <p>Token Name</p>
      </div>
      <div>
        <div>
          <h2>Market Price</h2>
          <div>
            <div>Current Price</div>
            <div>Price change 24h</div>
            <div>Market Cap vs Volume</div>
            <div>Circ supply by max supply</div>
          </div>
        </div>
        <div className="border border-t-white">
          <h2>Your coin</h2>
          <div className="flex">
            <div>Coint amount</div>
            <div>Amount value</div>
            <div>Amount price change since purchase</div>
            <div>Purchase date</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetContainer;
