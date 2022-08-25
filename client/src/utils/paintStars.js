import { FaStar } from "react-icons/fa";

export default function paintStars(rating) {
  if (rating === 5)
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
      <>
        <div className="text-yellow flex">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="text-gray flex">
          <FaStar />
        </div>
      </>
    );
  else if (rating >= 3)
    return (
      <>
        <div className="text-yellow flex">
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="text-gray flex">
          <FaStar />
          <FaStar />
        </div>
      </>
    );
  else if (rating >= 2)
    return (
      <>
        <div className="text-yellow flex">
          <FaStar />
          <FaStar />
        </div>
        <div className="text-gray flex">
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </>
    );
  else if (rating === 1)
    <>
      <div className="text-yellow flex">
        <FaStar />
      </div>
      <div className="text-gray flex">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </>;
  else
    return (
      <div className="text-gray flex">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    );
}
