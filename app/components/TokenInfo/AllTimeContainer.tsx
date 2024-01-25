interface AllTimeContainerProps {
  title: string;
  price: number | undefined;
  date: string | undefined;
}

const AllTimeContainer = ({ title, price, date }: AllTimeContainerProps) => {
  return (
    <div className="flex gap-4">
      <img src="arrow" alt="" />
      <div>
        <div className="flex gap-4">
          <p>All time {title}: </p>
          <p className="text-xl font-medium">${price}</p>
        </div>
        <div>{date}</div>
      </div>
    </div>
  );
};

export default AllTimeContainer;
