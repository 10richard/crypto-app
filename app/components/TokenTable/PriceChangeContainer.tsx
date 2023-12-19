interface PriceChangeContainerProps {
  priceChange: number;
}

const PriceChangeContainer = ({ priceChange }: PriceChangeContainerProps) => {
  return (
    <div
      className={`w-[72px] ${
        priceChange <= 0 ? "text-[#FF0061]" : "text-[#00F5E4]"
      }`}
    >
      <img src="" alt="" />
      {priceChange}%
    </div>
  );
};

export default PriceChangeContainer;
