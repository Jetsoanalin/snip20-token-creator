// src/hooks/useSecretNetwork.js
import { useSecretNetwork } from '../components/SecretNetworkProvider';

const useSecretNetworkInstance = () => {
  const { secretjs,web3State } = useSecretNetwork();
  return {secretjs,web3State};
};

export default useSecretNetworkInstance;
