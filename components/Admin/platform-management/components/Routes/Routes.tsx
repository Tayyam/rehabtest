"use client";
import React, { useState } from "react";
import RoutesPrice from "./RoutesPrice/RoutesPrice";
import RoutesDefine from "./RoutesDefine/RoutesDefine";

type Props = {};

function Routes({}: Props) {
  const [activBar, setActivBar] = useState(0);

  return (
    <>
      {activBar === 0 && (
        <RoutesDefine activBar={activBar} setActivBar={setActivBar} />
      )}
      {activBar === 1 && (
        <RoutesPrice activBar={activBar} setActivBar={setActivBar} />
      )}
    </>
  );
}

export default Routes;
