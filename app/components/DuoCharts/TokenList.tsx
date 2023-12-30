const TokenList = () => {
  return (
    <div className="flex flex-col">
      <h2>Select up to 3 currencies to view statistics</h2>
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
