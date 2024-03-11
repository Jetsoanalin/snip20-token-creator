import './App.css';
import React, { useCallback, useEffect, useState } from "react";
import DeployTokenTab from './components/DeployTokenTab';
import TokenDetailTab from './components/TokenDetailTab';
import { useSecretNetwork,SecretNetworkProvider } from './components/SecretNetworkProvider'
function App() {
  const [activeTab, setActiveTab] = useState('contenttab1'); // State variable for active tab
  const [mintCap, setMintCap] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [allowMinting, setAllowMinting] = useState(false);
  const [allowBurning, setAllowBurning] = useState(false);
  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleMintChange = () => {
    setAllowMinting(!allowMinting); // Toggle based on current state
  };

  const handleBurnChange = () => {
    setAllowBurning(!allowBurning); // Toggle based on current state
  };
  const { connect,web3State } = useSecretNetwork(); 

  useEffect(() => {
    console.log(web3State)
    if(web3State){
      setUserBalance(web3State.balance)
      setUserAddress(web3State.address)
    } 
  });
  
  return (
    <div id="root"> 
      <div className="container View WelcomeView">
        <h1 className="Banner">Secret Network Wallet Abstraction & Token Deployment</h1>
        <div className="Message center">
          <div className="Title" />
          <a
            onClick={connect}
            id="connect"
            title="Web5 Nexus Wallet Abstraction Secret Network"
            href='#/'
          >
            <img
              className="small_fox"
              width="80px"
              alt="Web5 Nexus"
              src="./images/whiteLogoCircle.png"
            />
          </a>
          <div className="Details" id="connect_wallet_text">
            Click ☝️ to connect wallet.{" "}
          </div>
          <br />
          <table id="example" className="table-responsive-sm center tableText">
            <thead>
              <tr>
                <th scope="col">Address</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody> 
              <tr>
                <td id="userAddress">{userAddress}</td>
                <td id="userBalance">{userBalance/1e6}</td>
              </tr> 
            </tbody>
          </table>
          <hr />

          <div className="row content-tabs">
            <div className="col-sm-6 mb-3 p-3">
              <button className={`NavButton center tab ${activeTab === 'contenttab1' ? 'active' : ''}`} onClick={() => handleTabClick('contenttab1')}>
                Deploy SNIP-20 Token
              </button>
            </div>
            <div className="col-sm-6 mb-3 p-3">
              <button className={`NavButton center tab ${activeTab === 'contenttab2' ? 'active' : ''}`} onClick={() => handleTabClick('contenttab2')}>
                Token Detail
              </button>
            </div>
          </div>
          {activeTab === 'contenttab1' && (
            <DeployTokenTab
            mintCap={mintCap}
            mintAddress={mintAddress}
            allowBurning={allowBurning}
            allowMinting={allowMinting}
            handleBurnChange={handleBurnChange}
            handleMintChange={handleMintChange}
            setMintCap={setMintCap}
            setMintAddress={setMintAddress}
          />
          )}
          {activeTab === 'contenttab2' && (
            <TokenDetailTab />
          )}

          {/* {activeTab === 'contenttab2' && (
            <div className='contenttab2'>
              
            </div>
          )} */}
          <hr />
          <a href="https://web5.nexus" rel="noreferrer" target="_blank">
            <img
              className="center small_image"
              src="./images/poweredby.png"
              alt='Powered by Web5 Nexus'
            />
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

const AppWithSecretNetworkProvider = () => {
  return (
    <SecretNetworkProvider>
      <App />
    </SecretNetworkProvider>
  );
};

export default AppWithSecretNetworkProvider;