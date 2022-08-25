import { FaStar } from "react-icons/fa";

export default function paintStars(rating) {
  if (rating === 5 || rating === null || rating === 0)
    return (
      <div className="text-yellow flex">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
  else if (rating >= 4)
    return (
      <div className="text-yellow flex">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
  else if (rating >= 3)
    return (
      <div className="text-yellow flex">
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
  else if (rating >= 2)
    return (
      <div className="text-yellow flex">
        <FaStar />
        <FaStar />
      </div>
    );
  else
    <div className="text-yellow flex">
      <FaStar />
    </div>;
}
