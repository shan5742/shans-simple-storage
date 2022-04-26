import { Button } from "../Button/Button";
import s from "./NewMessage.module.scss";

export const NewMessage = ({ handleSubmit, newMessage, setNewMessage }) => {
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        type="text"
        required
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        name="value"
        placeholder="Enter a message..."
        className={s.input}
      />
      <Button type="submit" buttonText="Set Message" />
    </form>
  );
};
