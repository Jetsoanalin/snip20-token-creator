// TokenDetailTab.js
import React, { useState } from 'react';
import SecretNetworkService  from '../../services/secretNetwork'; 
// import useSecretNetworkService from '../../hooks/useSecretNetworkService';

const TokenDetailTab = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [viewingKey, setViewingKey] = useState('');
  const [pageSize, setPageSize] = useState('');
  const [output, setOutput] = useState('');
//   const { transferSnip20Tokens, /* other functions... */ } = useSecretNetworkService();
  const handleTransfer = async () => {
    const result = await SecretNetworkService().transferSnip20Tokens(contractAddress, recipientAddress, amount);
    setOutput(`Transfer initiated. ${JSON.stringify(result)}`);
  };

  const handleSend = async () => {
    const result = await SecretNetworkService().sendSnip20Tokens(contractAddress, recipientAddress, amount);
    setOutput(`Send initiated. ${JSON.stringify(result)}`);
  };

  const handleSetViewingKey = async () => {
    const result = await SecretNetworkService().setViewingKeyAndQueryBalance(contractAddress, viewingKey);
    setOutput(`Set viewing key initiated. ${JSON.stringify(result)}`);
  };

  const handleQueryParameters = async () => {
    const result = await SecretNetworkService().queryTokenParameters(contractAddress);
    setOutput(`Token Parameters: ${JSON.stringify(result)}`);
  };

  const handleGetTransactionHistory = async () => {
    const result = await SecretNetworkService().getTransactionHistory(contractAddress, pageSize);
    setOutput(`Transaction History: ${JSON.stringify(result)}`);
  };

  return (
    <div>
      <h2>Token Detail Tab</h2>

      <div>
        <label>Contract Address:</label>
        <input type="text" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
      </div>

      <div>
        <label>Recipient Address:</label>
        <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} />
      </div>

      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div>
        <label>Viewing Key:</label>
        <input type="text" value={viewingKey} onChange={(e) => setViewingKey(e.target.value)} />
      </div>

      <div>
        <label>Page Size:</label>
        <input type="text" value={pageSize} onChange={(e) => setPageSize(e.target.value)} />
      </div>

      <button onClick={handleTransfer}>Transfer Tokens</button>
      <button onClick={handleSend}>Send Tokens</button>
      <button onClick={handleSetViewingKey}>Set Viewing Key</button>
      <button onClick={handleQueryParameters}>Query Token Parameters</button>
      <button onClick={handleGetTransactionHistory}>Get Transaction History</button>

      
    </div>
  );
};

export default TokenDetailTab;
