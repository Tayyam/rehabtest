"use client";
import React, { useState } from "react";
import HotelLocation from "./HotelLocation/HotelLocation";
import SubHotels from "./SubHotels/SubHotels";

type Props = {};

function Hotels({}: Props) {
  const [activBar, setActivBar] = useState(0);

  return (
    <>
      {activBar === 0 && (
        <HotelLocation activBar={activBar} setActivBar={setActivBar} />
      )}
      {activBar === 1 && (
        <SubHotels activBar={activBar} setActivBar={setActivBar} />
      )}
    </>
  );
}

export default Hotels;
