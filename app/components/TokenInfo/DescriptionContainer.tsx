import { useState } from "react";

interface DescriptionContainerProps {
  desc: string;
}

const DescriptionContainer = ({ desc }: DescriptionContainerProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-[692px] w-full">
      <h3 className="text-xl font-medium">Description</h3>
      <div
        dangerouslySetInnerHTML={{
          __html:
            desc.toString().substring(0, showMore ? undefined : 878) +
            (showMore ? "" : "..."),
        }}
      ></div>
      <button className="text-[#6060FF]" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default DescriptionContainer;
