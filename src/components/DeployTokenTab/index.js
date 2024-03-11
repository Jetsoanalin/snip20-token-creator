// DeployTokenTab.js
import React,{useEffect,useState} from 'react';
import {fromUtf8, MsgExecuteContractResponse } from "secretjs";
import useSecretNetwork from '../../hooks/useSecretNetwork';
import cosmwasmContract from '../../contract/snip20/contract.wasm'
// import fs from 'fs'

const DeployTokenTab = ({ mintCap, mintAddress, allowBurning, allowMinting, handleBurnChange, handleMintChange, setMintCap, setMintAddress }) => {
    const {web3State} = useSecretNetwork();
    const [output, setOutput] = useState(null);
    const [wasm, setWasm] = useState(null);

    var secretjs = null;
    var address = '';
    var accAddress= '';
    useEffect(() => {
        if(web3State){
            const fetchWasm = async () => {
            const response = await fetch(cosmwasmContract);
            const buffer = await response.arrayBuffer();
            setWasm(new Uint8Array(buffer)); // Convert to Uint8Array
            };
        
            fetchWasm();
            secretjs = web3State.secretjs
            address = web3State.address;
            accAddress= web3State.address;
        } 
      });
    const deployToken = async () => {
        console.log(web3State)
        if (secretjs) {
            // const response = await fetch(cosmwasmContract);
            // const wasm = await response.arrayBuffer();
            let tx = await secretjs.tx.compute.storeCode(
                {
                  sender: address,
                  wasm_byte_code: wasm,
                  source: "",
                  builder: "",
                },
                {
                  gasLimit: 2_000_000,
                }
              );
            
              const codeId = Number(
                tx.arrayLog.find((log) => log.type === "message" && log.key === "code_id")
                  .value
              );
            
              console.log("codeId: ", codeId);
              // contract hash, useful for contract composition
              const contractCodeHash = (await secretjs.query.compute.codeHashByCodeId({code_id: codeId})).code_hash;
              console.log(`Contract hash: ${contractCodeHash}`);
            
              const tname = 'JETSO Token';
              const tsymbol = 'JET';
              const tdecimals = 6;
              const tsupply = '1000000000';
              const tmintCap = '2000000000';
              const ownerAddress = accAddress;
              const tmintAddress = [accAddress]
              const tmintallowed = true;
              const tburnallowed = true;
              // Create an instance of the token contract, minting some tokens to our wallet
              const initMsg = {
                name: String(tname),
                symbol: String(tsymbol),
                decimals: (tdecimals),
                prng_seed: Buffer.from("Something really random").toString("base64"),
                admin: ownerAddress,
                mint_allowed: tmintallowed,
                mint_cap: tmintCap,
                mint_addresses: tmintAddress,
                burn_allowed: tburnallowed,
                initial_balances: [
                  {
                    address: accAddress,
                    amount: String(tsupply),
                  },
                ],
              };
            
              tx = await secretjs.tx.compute.instantiateContract(
                {
                  code_id: codeId,
                  sender: address,
                  code_hash: contractCodeHash,
                  init_msg: initMsg,
                  label: "Web5SecretToken" + Math.ceil(Math.random() * 10000),
                },
                {
                  gasLimit: 2_000_000,
                }
              );
            
              console.log(tx)
              //Find the contract_address in the logs
              const contractAddress = tx.arrayLog.find(
                (log) => log.type === "message" && log.key === "contract_address"
              ).value;
              console.log(`contractAddress=${contractAddress}`);
            
              // Entropy: Secure implementation is left to the client, but it is recommended to use base-64 encoded random bytes and not predictable inputs.
              const entropy = "Another really random thing";
            
              let handleMsg = { create_viewing_key: { entropy: entropy } };
              console.log("Creating viewing key");
              tx = await secretjs.tx.compute.executeContract(
                {
                  sender: address,
                  contract_address: contractAddress,
                  code_hash: contractCodeHash, // optional but way faster
                  msg: handleMsg,
                  sent_funds: [], // optional
                },
                {
                  gasLimit: 2_000_000,
                }
              );
            //   const txExec = await secretjs.tx.snip20.setViewingKey({
            //     sender: address,
            //     contract_address: contractAddress,
            //     code_hash:contractCodeHash,
            //     msg: { set_viewing_key: { key: "hello" } },
            //   });
            //   console.log(txExec)
              
            //   const txQuery = await secretjs.query.snip20.getBalance({
            //     address: secretjs.address,
            //     contract: { address: contractAddress, codeHash: contractCodeHash },
            //     auth: { key: "hello" },
            //   });

            //   console.log(txQuery)
              // Convert the UTF8 bytes to String, before parsing the JSON for the api key.
            //   const decodedData = MsgExecuteContractResponse.decode(tx.data[0]).data;
            //     const utf8Data = fromUtf8(decodedData);
            //     const parsedData = JSON.parse(utf8Data);
            //     const viewingKey = parsedData.create_viewing_key.key;
            //   const apiKey = viewingKey;
            const apiKey = JSON.parse(fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)).create_viewing_key.key;
            
              console.log(`viewingkey=${apiKey}`);
            
            //   // Query balance with the api key
            //   const balanceQuery = {
            //     balance: {
            //       key: apiKey,
            //       address: accAddress,
            //     },
            //   };
            
            //   let balance = await secretjs.query.compute.queryContract({
            //     contract_address: contractAddress,
            //     code_hash: contractCodeHash,
            //     query: balanceQuery,
            //   });
            
            //   console.log("My token balance: ", balance);

            const tokenData = {
                codeId: codeId,
                contractHash: contractCodeHash,
                contractAddress: contractAddress,
                tokenName: tname,
                tokenSymbol: tsymbol,
                tokenDecimals: tdecimals,
                tokenSupply: tsupply,
                ownerAddress: ownerAddress,
                mintAddress: tmintAddress,
                mintAllowed: tmintallowed,
                burnAllowed: tburnallowed,
                mintCap: tmintCap
              };
              
              setOutput(<pre>{JSON.stringify(tokenData, null, 2)}</pre>);

        }
    };
    
    
    return (
        <div className='contenttab1'>
            <input
                className="full_width small"
                id="tokenName"
                type="text"
                placeholder="Your SNIP20 Token Name"
            />
            <br />
            <br />
            <input
                className="full_width small"
                id="tokenSymbol"
                type="text"
                placeholder="Your SNIP20 Token Symbol"
            />
            <br />
            <br />
            <input
                className="full_width small"
                id="tokenSupply"
                type="text"
                placeholder="Your SNIP20 Token Supply"
            />
            <br />
            <br />

            <form>
                <table id="example" className="table-responsive-sm center tableText">
                    <thead>
                        <tr>
                            <th scope="col">
                                Allow Burning?
                            </th>
                            <th scope="col">
                                Allow Minting?
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="userAddress">
                                <input
                                    type="checkbox"
                                    id="tburnallowed"
                                    name="tburnallowed"
                                    checked={allowBurning}
                                    onChange={handleBurnChange}
                                />
                            </td>
                            <td id="userBalance">
                                <input
                                    type="checkbox"
                                    id="tmintallowed"
                                    name="tmintallowed"
                                    checked={allowMinting}
                                    onChange={handleMintChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {allowMinting && (
                    <>
                        <label htmlFor="tmintCap">Mint Cap (Optional):</label>
                        <br />
                        <input
                            className="full_width small"
                            type="number"
                            id="tmintCap"
                            name="tmintCap"
                            value={mintCap}
                            onChange={(e) => setMintCap(e.target.value)}
                        // disabled={!allowMinting}
                        />
                        <label htmlFor="tmintAddress">Mint Addresses (Comma separated):</label>
                        <input
                            className="full_width small"
                            type="text"
                            id="tmintAddress"
                            name="tmintAddress"
                            value={mintAddress}
                            onChange={(e) => setMintAddress(e.target.value)}
                        />
                    </>
                )}
            </form>
            <br />
            <br />
            <button
                className="clearButton center"
                onClick={deployToken}
                id="clear_input"
            >
                Deploy Token
            </button>
            <br />

            <br />
            <div>
            <h3>Output:</h3>
            <p>{output}</p>
        </div>
        </div>
    );
};

export default DeployTokenTab;
