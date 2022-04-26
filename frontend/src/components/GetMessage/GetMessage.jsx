import { Button } from "../Button/Button";
import s from "./GetMessage.module.scss";

export const GetMessage = ({ currentMessage, getCurrentMessage }) => {
  return (
    <div className={s.container}>
      <Button
        secondary
        handleClick={getCurrentMessage}
        buttonText="Get Message"
      />
      {currentMessage && <p className={s.message}>"{currentMessage}"</p>}
    </div>
  );
};
