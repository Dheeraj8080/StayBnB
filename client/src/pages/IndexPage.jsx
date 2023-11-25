import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data, ...response.data]);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
      {places.length > 0 &&
        places.map((place, index) => (
          <Card key={`${place._id}-${index}`} place={place} />
        ))}
    </div>
  );
}
