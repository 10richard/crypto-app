interface ChartInfoProps {
  title: string;
  value: string;
}

const ChartInfo = ({ title, value }: ChartInfoProps) => {
  const currDate = new Date();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl text-[#D1D1D1]">{title}</p>
      <p className="text-[28px] font-bold">{value}</p>
      <p className="text-[#B9B9BA]">
        {currDate.toLocaleDateString("en", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default ChartInfo;
