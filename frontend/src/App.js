import { Layout } from "./components/Layout/Layout";
import { useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { SIMPLE_STORAGE_CONTRACT_ADDRESS, abi } from "./constants";
import { NewMessage } from "./components/NewMessage/NewMessage";
import { GetMessage } from "./components/GetMessage/GetMessage";
import { Main } from "./components/Main/Main";
import { Stats } from "./components/Stats/Stats";
import s from "./styles/Home.module.scss";

function App() {
  const [address, setAddress] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  const [totalMessages, setTotalMessages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState(null);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    const balance = await signer.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    setUserBalance(balanceInEth);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      setNetworkError(true);
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      getTotalMessages();
      getTotalUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalMessages = async () => {
    try {
      const provider = await getProviderOrSigner();
      const simpleStorageContract = new ethers.Contract(
        SIMPLE_STORAGE_CONTRACT_ADDRESS,
        abi,
        provider
      );
      setTotalMessages(
        ethers.utils.formatUnits(
          await simpleStorageContract.getTotalMessages(),
          0
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getTotalUsers = async () => {
    try {
      const provider = await getProviderOrSigner();
      const simpleStorageContract = new ethers.Contract(
        SIMPLE_STORAGE_CONTRACT_ADDRESS,
        abi,
        provider
      );
      setTotalUsers(
        ethers.utils.formatUnits(await simpleStorageContract.getTotalUsers(), 0)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const provider = await getProviderOrSigner(true);
      const simpleStorageContract = new ethers.Contract(
        SIMPLE_STORAGE_CONTRACT_ADDRESS,
        abi,
        provider
      );
      await simpleStorageContract.set(newMessage);
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentMessage = async () => {
    try {
      const provider = await getProviderOrSigner();
      const simpleStorageContract = new ethers.Contract(
        SIMPLE_STORAGE_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const messageFromContract = await simpleStorageContract.getMessage();
      setCurrentMessage(messageFromContract);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletConnected]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  return (
    <Layout
      networkError={networkError}
      walletConnected={walletConnected}
      connectWallet={connectWallet}
      address={address}
      userBalance={userBalance}
    >
      <Main />
      {walletConnected && (
        <>
          <div className={s.container}>
            <div className={s.section}>
              <NewMessage
                handleSubmit={handleSubmit}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
              />
            </div>
            <div className={s.section}>
              <GetMessage
                currentMessage={currentMessage}
                getCurrentMessage={getCurrentMessage}
              />
            </div>
          </div>
          <Stats messages={totalMessages} users={totalUsers} />
        </>
      )}
    </Layout>
  );
}

export default App;
