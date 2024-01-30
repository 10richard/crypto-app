interface ProgressBarProps {
  left_text: string;
  right_text: string;
  percent: number;
}

const ProgressBar = ({ left_text, right_text, percent }: ProgressBarProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="text-xs flex justify-between">
        <p>{left_text}</p>
        <p className="text-[#5E74C9]">{right_text}</p>
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
