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
      <Button onClick={connectWallet} className={s.button}>
        Connect Wallet
      </Button>
    );
  return (
    <div className={s.container}>
      <Button
        secondary
        buttonText={`${Number.parseFloat(userBalance).toPrecision(4)} ETH`}
      />
      <Button secondary buttonText={`${address.substring(0, 6)}...`} />
    </div>
  );
};
