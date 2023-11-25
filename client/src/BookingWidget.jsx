import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noGuests, setNoGuests] = useState("");
  const [name, setName] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let noOfDays = 0;
  if (checkIn && checkOut) {
    noOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  async function handleBook() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      noGuests,
      pnumber,
      name,
      place: place._id,
      price: noOfDays * place.price,
    });
    const bookingId = response.data._id;

    setRedirect(`/account/bookings`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="bg-white p-4 rounded-2xl">
        <div className="text-center font-semibold">
          Price : ₹{place.price} / night
        </div>
        <div className="border rounded-2xl">
          <div className="flex">
            {" "}
            <div className="p-4 border-b">
              <label className="font-semibold">Check In: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              ></input>
            </div>
            <div className="p-4 ">
              <label className="font-semibold">Check Out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              ></input>
            </div>
          </div>
          <div>
            {" "}
            <div className="p-4 ">
              <label className="font-semibold">Number of guests: </label>
              <input
                type="number"
                placeholder={1}
                value={noGuests}
                onChange={(ev) => setNoGuests(ev.target.value)}
              ></input>
            </div>
            {noOfDays > 0 && (
              <div className="p-4 ">
                <label className="font-semibold">Your Whole name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                ></input>
                <label className="font-semibold">Your Mobile number</label>
                <input
                  type="tel"
                  placeholder="1234567890"
                  value={pnumber}
                  onChange={(ev) => setPnumber(ev.target.value)}
                ></input>
              </div>
            )}
          </div>
        </div>

        <button className="primary" onClick={handleBook}>
          Book this stay for ₹{" "}
          {noOfDays > 0 && <span>{noOfDays * place.price}</span>}
        </button>
      </div>
    </div>
  );
}
