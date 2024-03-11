// src/components/TokenInformation/index.js

import React from 'react';
import useSecretNetwork from '../../hooks/useSecretNetwork';
import secretNetworkService from '../../services/secretNetwork';

const TokenInformation = () => {
  const secretjs = useSecretNetwork();

  const handleTransfer = async () => {
    if (secretjs) {
      await secretNetworkService.transferSnip20Tokens(contractAddress, recipientAddress, amount);
    }
  };

  const handleSend = async () => {
    if (secretjs) {
      await secretNetworkService.sendSnip20Tokens(contractAddress, recipientAddress, amount);
    }
  };

  const handleSetViewingKeyAndQueryBalance = async () => {
    if (secretjs) {
      await secretNetworkService.setViewingKeyAndQueryBalance(contractAddress, "hello");
    }
  };

  const handleQueryTokenParameters = async () => {
    if (secretjs) {
      const result = await secretNetworkService.queryTokenParameters(contractAddress);
      // Handle the result as needed
    }
  };

  const handleGetTransactionHistory = async () => {
    if (secretjs) {
      const result = await secretNetworkService.getTransactionHistory(contractAddress, 10);
      // Handle the result as needed
    }
  };

  return (
    <div>
      {/* UI components for Token Information */}
      <h2>Token Information</h2>
      <button onClick={handleTransfer}>Transfer SNIP-20 Tokens</button>
      <button onClick={handleSend}>Send SNIP-20 Tokens</button>
      <button onClick={handleSetViewingKeyAndQueryBalance}>Set Viewing Key and Query Balance</button>
      <button onClick={handleQueryTokenParameters}>Query Token Parameters</button>
      <button onClick={handleGetTransactionHistory}>Get Transaction History</button>
    </div>
  );
};

export default TokenInformation;
