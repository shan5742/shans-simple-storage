import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { NetworkError } from "../NetworkError/NetworkError";
import s from "./Layout.module.scss";

export const Layout = ({
  children,
  networkError,
  walletConnected,
  connectWallet,
  address,
  userBalance,
}) => {
  return (
    <div className={s.container}>
      {walletConnected && networkError && <NetworkError />}
      <Header
        walletConnected={walletConnected}
        connectWallet={connectWallet}
        address={address}
        userBalance={userBalance}
      />
      <div className={s.content}>{children}</div>
      <Footer />
    </div>
  );
};
