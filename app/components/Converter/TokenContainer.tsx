interface TokenContainerProps {
  title: string;
  tokenImg: string;
  token: string;
}

const TokenContainer = () => {
  return (
    <div className="flex flex-col gap-10 p-6 w-1/2 bg-chart-price rounded-2xl">
      <h3 className="text-sm text-content-main/80">You sell</h3>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div>
            <img src="token logo" alt="" />
            <p className="text-xl font-medium">Bitcoin (BTC)</p>
            <img src="chevron down" alt="" />
          </div>
          <input
            type="text"
            className="text-2xl font-bold bg-transparent text-right outline-none"
            value={2}
          />
        </div>
        <div className="p-2 border-t-[1px]">
          <p>
            <span className="text-content-main/80">1 BTC =</span> $26,250.15
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenContainer;
