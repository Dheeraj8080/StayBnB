import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 py-6 bg-gray-100 -mx-20 px-20 ">
      <h1 className="text-2xl font-semibold ">{place.description}</h1>

      <a
        target="_blank"
        href={"https://maps.google.com/?g" + place.address}
        className="underline block my-2 "
      >
        {place.address}
      </a>
      <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-3xl">
        <div className="">
          {place.photos?.[0] && (
            <div className="">
              <img
                className="  rounded-3xl object-cover aspect-square"
                src={place.photos?.[0]}
              ></img>
            </div>
          )}
        </div>
        <div className="grid gap-2 ">
          {place.photos?.[1] && (
            <img
              className="  rounded-3xl  object-cover aspect-square "
              src={place.photos?.[1]}
            ></img>
          )}
          {place.photos?.[2] && (
            <img
              className=" rounded-3xl object-cover aspect-square "
              src={place.photos?.[2]}
            ></img>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h2 className="font-semibold text-2xl">Description:</h2>
        {place.extraInfo}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <span className="font-semibold py-12">Check In</span> :{" "}
          {place.checkIn}
          {" A.M"}
          <br />
          <span className="font-semibold">Check Out</span> : {place.checkOut}
          {" P.M "}
          next day
          <br />
          <span className="font-semibold">
            Maximum Number Of Guests:
          </span> : {place.maxGuests}
          <br />
        </div>
        <BookingWidget place={place} />
      </div>
    </div>
  );
}
