import Button from "presentation/components/ui/Button";

export const DateNavigator = ({ dates, currentDateIndex, onNavigate, onSelect }) => {
  return (
    <div className="shadow-md p-2 bg-white sticky">
    <div className="flex">
      <Button className="mr-2 bg-secondary hover:bg-secondary hover:text-black rounded-s-xl p-2" onClick={() => onNavigate(-1)}>{"<"}</Button>
      <div className="flex justify-between w-[100%]">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer rounded-lg ${
              index === currentDateIndex ? "bg-[#f296f5] " : ""
            }`}
            onClick={() => onSelect(index)}
          >
            <div className="text-center">
                <div>{date.date}</div>
                <div className=" hidden md:inline">{date.day} <span className=" hidden md:inline">{date.month}</span></div>
            </div>
          </div>
        ))}
      </div>
      <Button className="ml-2 bg-secondary hover:bg-secondary hover:text-black rounded-r-xl p-" onClick={() => onNavigate(1)}>{">"}</Button>
    </div>
    </div>
  );
};
