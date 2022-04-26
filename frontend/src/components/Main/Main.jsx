import s from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={s.container}>
      <h1 className={s.header}>Shan's Simple Storage</h1>
      <p className={s.text}>
        Integrating a simple storage Smart Contract where a user can read a
        message stored on the blockchain as well as update the message.
      </p>
      <p className={s.text}>
        To make the dApp a little more useful I am also keeping track of total
        messages sent to the contract and total number of users who have set a
        message.
      </p>
    </div>
  );
};
