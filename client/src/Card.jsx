import React from "react";
import { Link } from "react-router-dom";
const Card = ({ place }) => {
  return (
    <Link to={"/place/" + place._id} key={place._id}>
      <div className="bg-gray-500 rounded-2xl flex">
        {place.photos?.[0] && (
          <img
            className="rounded-2xl object-cover aspect-square"
            src={place.photos?.[0]}
            alt={place.title}
          />
        )}
      </div>
      <h3 className="font-bold pt-1">{place.address}</h3>
      <h2 className="text-sm">{place.title}</h2>
      <div className="mt-1">
        ₹<span className="font-bold">{place.price}</span> Per Night
      </div>
    </Link>
  );
};

export default Card;
