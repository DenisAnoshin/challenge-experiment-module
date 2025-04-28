import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  checkIfWalletIsConnect,
  connectMetamask,
} from "../Utils/connectMetamask";
import {
  createCampaign,
  getCampaignsDetail,
  getUserCampaigns,
} from "../Utils/CampaignManager";
import { getCampaignDetail } from "../Utils/CampaignContract";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [account, setAccount] = useState("");

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionText: "",
    onAction: null,
  });

  const showModal = (config) => {
    setModalState({
      isOpen: true,
      ...config,
    });
  };

  const hideModal = () => {
    setModalState({
      isOpen: false,
      title: "",
      message: "",
      actionText: "",
      onAction: null,
    });
  };

  // connect to metamask
  const connectMetamaskWithAccount = async () => {
    if (!window.ethereum) {
      showModal({
        title: "MetaMask Required",
        message: "No MetaMask detected. Please install MetaMask to continue.",
        actionText: "Install MetaMask",
        onAction: () => {
          window.open("https://metamask.io/download.html", "_blank");
          hideModal();
        },
      });
      return;
    }

    const { provider } = await connectMetamask();
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    window.location.reload();
  };

  // check if wallet is connect
  useEffect(() => {
    checkIfWalletIsConnect(setAccount);
  }, [setAccount]);

  return (
    <MainContext.Provider
      value={{
        account,
        connectMetamaskWithAccount,
        createCampaign,
        getCampaignsDetail,
        getCampaignDetail,
        getUserCampaigns,
        showModal,
        hideModal,
        modalState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
