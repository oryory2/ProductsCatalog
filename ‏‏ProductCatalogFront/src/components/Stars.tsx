import { useMemo } from "react";

type Props = {
  rating: number;
  handleChange?: (rating: number) => void
  error?: boolean;
};


// Component that displays 1-5 stars rating
const Stars = ({rating, handleChange, error}: Props) => {  

  const starsElements = useMemo(() => {
      return [...Array(5)].map((_, index: number) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
        return (
          <div
            key={index}
            className={`star ${handleChange && "clickable"} ${error && "error"}`}
            style={{ '--fill': `${fillPercentage}%` } as React.CSSProperties}
            onClick={() => handleChange?.(index + 1)}>★</div>
          )})
  }, [rating, error]);

  return(
    <div>
      {starsElements}
    </div>
  )
};



export default Stars;