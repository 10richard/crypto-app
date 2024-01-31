interface ProgressBarProps {
  leftText: string;
  rightText: string;
  percent: number;
}

const ProgressBar = ({ leftText, rightText, percent }: ProgressBarProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="text-xs flex justify-between">
        <p>{leftText}</p>
        <p className="text-[#5E74C9]">{rightText}</p>
      </div>
      <div className="h-[6px] w-full bg-[#3C4777] rounded-xl overflow-hidden">
        <div
          className={`h-full bg-[#5E74C9]`}
          style={{
            width: `${percent}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
