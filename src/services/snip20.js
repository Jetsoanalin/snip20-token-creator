// src/services/snip20.js

import { useContext } from 'react';
import { SecretNetworkContext } from '../context/SecretNetworkContext';

const snip20Service = {
  transferSnip20Tokens: async (contractAddress, recipientAddress, amount) => {
    const secretjs = useContext(SecretNetworkContext);

    if (!secretjs) {
      return;
    }

    try {
      const txExec = await secretjs.tx.snip20.transfer({
        sender: secretjs.address,
        contract_address,
        msg: { transfer: { recipient: recipientAddress, amount } },
      }, {
        gasLimit: 5_000_000,
      });

      console.log("Transaction executed:", txExec);
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  },
  // Add other SNIP-20 related functions as needed
};

export default snip20Service;
