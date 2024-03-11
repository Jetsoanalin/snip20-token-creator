// src/services/secretNetwork.js

import useSecretNetworkInstance from '../hooks/useSecretNetwork';


const SecretNetworkService = ()=> {
const secretjs = useSecretNetworkInstance();
  // Function to transfer SNIP-20 tokens
  const transferSnip20Tokens= async (contractAddress, recipientAddress, amount) => {

    if (!secretjs) {
      return;
    }

    try {
      const txExec = await secretjs.tx.snip20.transfer(
        {
          sender: secretjs.address,
          contract_address: contractAddress,
          msg: { transfer: { recipient: recipientAddress, amount } },
        },
        {
          gasLimit: 5_000_000,
        },
      );

      console.log("Transaction executed:", txExec);
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  }

  // Function to send SNIP-20 tokens
  const sendSnip20Tokens= async (contractAddress, recipientAddress, amount) => {

    if (!secretjs) {
      return;
    }

    try {
      const txExec = await secretjs.tx.snip20.send(
        {
          sender: secretjs.address,
          contract_address: contractAddress,
          msg: { send: { recipient: recipientAddress, amount } },
        },
        {
          gasLimit: 5_000_000,
        },
      );

      console.log("Transaction executed:", txExec);
    } catch (error) {
      console.error("Error sending tokens:", error);
    }
  }

  // Function to set viewing key and query balance
  const setViewingKeyAndQueryBalance= async (contractAddress, key) => {

    if (!secretjs) {
      return;
    }

    try {
      const txExec = await secretjs.tx.snip20.setViewingKey({
        sender: secretjs.address,
        contract_address: contractAddress,
        msg: { set_viewing_key: { key } },
      });

      console.log("Set viewing key transaction executed:", txExec);

      const txQuery = await secretjs.query.snip20.getBalance({
        address: secretjs.address,
        contract: { address: contractAddress },
        auth: { key },
      });

      console.log("Query balance result:", txQuery);
    } catch (error) {
      console.error("Error setting viewing key and querying balance:", error);
    }
  }

  // Function to query SNIP-20 token parameters
  const queryTokenParameters= async (contractAddress) => {

    if (!secretjs) {
      return;
    }

    try {
      const txQuery = await secretjs.query.snip20.getSnip20Params({
        contract: { address: contractAddress },
      });

      console.log("Query token parameters result:", txQuery);

      // You can return or handle the result as needed
      return txQuery;
    } catch (error) {
      console.error("Error querying token parameters:", error);
    }
  }

  // Function to get transaction history
  const getTransactionHistory= async (contractAddress, pageSize) => {

    if (!secretjs) {
      return;
    }

    try {
      const txQuery = await secretjs.query.snip20.getTransactionHistory({
        contract: { address: contractAddress },
        address: secretjs.address,
        page_size: pageSize,
      });

      console.log("Transaction history result:", txQuery);

      // You can return or handle the result as needed
      return txQuery;
    } catch (error) {
      console.error("Error getting transaction history:", error);
    }
  }
  return {
    transferSnip20Tokens,
    sendSnip20Tokens,
    setViewingKeyAndQueryBalance,
    queryTokenParameters,
    getTransactionHistory
  };
};

export default {SecretNetworkService};
