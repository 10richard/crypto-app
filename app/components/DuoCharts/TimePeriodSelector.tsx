interface TimePeriodSelectorProps {
  currTimePeriod: string;
  handleClick: (val: string) => void;
}

const TimePeriodSelector = ({
  currTimePeriod,
  handleClick,
}: TimePeriodSelectorProps) => {
  const timePeriods = ["1D", "7D", "14D", "1M", "1Y", "5Y"];

  return (
    <div className="p-1 mt-14 bg-[#232337] rounded-md self-start">
      {timePeriods.map((timePeriod, idx) => (
        <button
          key={idx}
          className={`${
            timePeriod === currTimePeriod
              ? "bg-[#3d3d82] border border-[#7878FF]"
              : "text-[#A7A7CC]"
          } px-5 py-2 text-sm rounded-md`}
          onClick={() => handleClick(timePeriod)}
        >
          {timePeriod}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodSelector;
