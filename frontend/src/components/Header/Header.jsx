import { Button } from "../Button/Button";
import s from "./Header.module.scss";

export const Header = ({
  walletConnected,
  userBalance,
  address,
  connectWallet,
}) => {
  if (!walletConnected)
    return (
      <div className={s.container}>
        <Button
          handleClick={connectWallet}
          className={s.button}
          buttonText="Connect Wallet"
        />
      </div>
    );
  return (
    <div className={s.container}>
      <Button
        secondary
        buttonText={`${Number.parseFloat(userBalance).toPrecision(4)} ETH`}
      />
      <Button
        secondary
        buttonText={`${address.substring(0, 3)}...${address.substring(39, 46)}`}
      />
    </div>
  );
};
