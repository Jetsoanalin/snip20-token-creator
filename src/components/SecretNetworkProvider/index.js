// src/components/SecretNetworkProvider/SecretNetworkProvider.js

import React, { createContext,useContext, useState, useEffect, useCallback } from 'react';
import { Wallet, SecretNetworkClient, EncryptionUtilsImpl, fromUtf8, MsgExecuteContractResponse } from 'secretjs';
import SocialLogin, { CosmosRpc } from "@web5nexus/sociallogin";
import { ethers } from "ethers";
import { SigningStargateClient, StargateClient } from '@cosmjs/stargate'
import {DirectSecp256k1Wallet,OfflineDirectSigner} from '@cosmjs/proto-signing'
import { Crypto } from "@iov/crypto";
// import fs from "fs";

export const SecretNetworkContext = createContext(null);

export const SecretNetworkProvider = ({ children }) => {
    const [secretjs, setSecretjs] = useState(null);
    const [web3State, setWeb3State] = useState(null);
    // Get from https://dashboard.web3auth.io for Saphire Mainnet only
    const clientId = "BJ2nx05HJkS2V_E-WtRliS3XaGvsTtWjBD_jNWeI30B15Rb9ienN-pcL0CiTN5PqqnEHBu7mmxi7GvWBUuxId8Y";
    const clientSecret = "72122785a8c9e30a4139d4e62da926cb1e4e18bb106a31ec1df40361d837a8f7";
    const name = "Secret Network"
    const logo = "https://cryptologos.cc/logos/secret-scrt-logo.png"
    const network = "sapphire_mainnet";
    const rpcEndpoint = "https://rpc.pulsar.scrttestnet.com";
    const [socialLoginSDK, setSocialLoginSDK] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [address, setAddress] = useState('')
    

  useEffect(() => {
    const initializeSecretNetwork = async () => {
      try {
        const blockchain = {
          blockchain: 'secret',
          network: 'testnet', // Update this accordingly
        };

        if (socialLoginSDK?.provider && socialLoginSDK.web3auth?.connected) {
          const web3Provider = new ethers.providers.Web3Provider(socialLoginSDK.provider);
          const secretInstance = new CosmosRpc(blockchain, socialLoginSDK.provider);
          const address = await secretInstance.getAccounts();
          const chainId = await secretInstance.getChainId();
          const balance = await secretInstance.getBalance();
          var privateKey = await secretInstance.getPrivateKey();

          console.log('address: ', address);
          console.log('chainId: ', chainId);
          console.log('balance: ', balance);
          console.log('privateKey: ', privateKey);

          privateKey = Buffer.from(privateKey, "hex");
          const wallet = await DirectSecp256k1Wallet.fromKey(
            privateKey,
            "secret"
          );
          console.log(wallet)

          

          const txEncryptionSeed = EncryptionUtilsImpl.GenerateNewSeed();
          const client = new SecretNetworkClient({
            chainId: 'pulsar-3', // Update this accordingly
            url: 'https://api.pulsar3.scrttestnet.com', // Update this accordingly
            wallet: wallet,
            walletAddress: address,
            txEncryptionSeed: txEncryptionSeed
          });

          setWeb3State({
            provider: socialLoginSDK.provider,
            web3Provider: web3Provider,
            address: address,
            chainId: chainId,
            balance: balance,
            privateKey: privateKey,
            secretjs:client
          });

          setSecretjs(client);
        }

        // Additional logic if needed

      } catch (error) {
        console.error('Error initializing Secret Network:', error);
      }
    };

    initializeSecretNetwork();
  }, [socialLoginSDK]);

  const connect = useCallback(async () => {
    try {
      if (address) return
      if (socialLoginSDK?.provider && socialLoginSDK.web3auth?.connected) {
        // await disconnect();
        
        console.info("socialLoginSDK.provider", socialLoginSDK.provider)
        const web3Provider = new ethers.providers.Web3Provider(
          socialLoginSDK.provider
        )
        const blockchain = {
          blockchain: "secret",
          network: "testnet"
        }

        const secretInstance = new CosmosRpc(
          blockchain,
          socialLoginSDK.provider,
        )
        const address = await secretInstance.getAccounts()
        const chainId =await secretInstance.getChainId()
        const balance =await secretInstance.getBalance()
        var privateKey =await secretInstance.getPrivateKey()

        console.log('address: ',address);
        console.log('chainId: ',chainId);
        console.log('balance: ',balance);
        console.log('privateKey: ',privateKey);
        setAddress(address)
        privateKey = Buffer.from(privateKey, "hex");
        const wallet = await DirectSecp256k1Wallet.fromKey(
          privateKey,
          "secret"
        );
        

        const txEncryptionSeed = EncryptionUtilsImpl.GenerateNewSeed();
        const client = new SecretNetworkClient({
          chainId: 'pulsar-3', // Update this accordingly
          url: 'https://api.pulsar3.scrttestnet.com', // Update this accordingly
          wallet: wallet,
          walletAddress: address,
          txEncryptionSeed: txEncryptionSeed
        });

        setWeb3State({
          provider: socialLoginSDK.provider,
          web3Provider: web3Provider,
          address: address,
          chainId: chainId,
          balance: balance,
          privateKey: privateKey,
          secretjs:client
        });
        
        return
      }
      if (socialLoginSDK) {
        socialLoginSDK.showWallet()
        return socialLoginSDK
      }
      
      const whiteLabel = {
        name: name,
        logo: logo
      }
      const params = {
        type: "web3auth",
        clientId: clientId,
        clientSecret: clientSecret
      }
      const sdk = new SocialLogin(params, whiteLabel)
      const supportedLogin = ["email-passwordless", "google", "github"]
      await sdk.init(network, supportedLogin)
      sdk.showWallet()
      setSocialLoginSDK(sdk)
      
      return socialLoginSDK
    } catch (err) {
      console.error("Connect error:", err)
      
    }
  }, [address, socialLoginSDK])

  // Provide the value to the context
  const contextValue = {
    secretjs,
    connect,
    web3State  
  };

  return (
    <SecretNetworkContext.Provider value={contextValue}>
      {children}
    </SecretNetworkContext.Provider>
  );
};

// Define a custom hook to use the context
export const useSecretNetwork = () => {
    const context = useContext(SecretNetworkContext);
  
    if (!context) {
      throw new Error('useSecretNetwork must be used within a SecretNetworkProvider');
    }
  
    return context;
  };