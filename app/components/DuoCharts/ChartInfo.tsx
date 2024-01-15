import getTodayDate from "@/app/utils/getTodayDate";

interface ChartInfoProps {
  title: string;
  value: string;
  includeDate: boolean;
}

const ChartInfo = ({ title, value, includeDate }: ChartInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl text-[#D1D1D1]">{title}</p>
      <p className="text-[28px] font-bold">{value}</p>
      <p className={`text-[#B9B9BA] ${includeDate ? "" : "hidden"}`}>
        {getTodayDate()}
      </p>
    </div>
  );
};

export default ChartInfo;
