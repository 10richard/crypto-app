const TimePeriodSelector = () => {
  const timePeriods = ["1D", "7D", "14D", "1M", "1Y", "5Y"];

  return (
    <div className="p-1 mt-14 bg-[#232337] rounded-md self-start">
      {timePeriods.map((timePeriod, idx) => (
        <button
          key={idx}
          className={`${
            idx === 0
              ? "bg-[#3d3d82] border border-[#7878FF]"
              : "text-[#A7A7CC]"
          } px-5 py-2 text-sm rounded-md`}
        >
          {timePeriod}
        </button>
      ))}
    </div>
  );
};

export default TimePeriodSelector;
