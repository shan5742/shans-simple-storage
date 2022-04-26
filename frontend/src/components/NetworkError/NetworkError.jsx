import React from "react";
import s from "./NetworkError.module.scss";

export const NetworkError = () => {
  return (
    <div className={s.container}>
      <p className={s.text}>Please connect to the Rinkeby network</p>
    </div>
  );
};
