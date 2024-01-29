import Image from "next/image";

interface AllTimeContainerProps {
  title: string;
  price: number | undefined;
  date: string | undefined;
}

const AllTimeContainer = ({ title, price, date }: AllTimeContainerProps) => {
  const dateObj = new Date(date ? date : "");
  const formattedDate = dateObj.toLocaleDateString("en", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <Image
          src={
            title === "high"
              ? "/images/token-info/green-arrow.svg"
              : "/images/token-info/red-arrow.svg"
          }
          alt="Price arrow"
          width={16}
          height={16}
        ></Image>
        <p>All time {title}: </p>
        <p className="text-xl font-medium">${price}</p>
      </div>
      <div className="text-sm text-[#B9B9BA] flex justify-end max-w-[230px]">
        {formattedDate}
      </div>
    </div>
  );
};

export default AllTimeContainer;
