import React, { useState } from "react";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { createNft } from "../cadence/transactions/createNft";
import { getNft } from "../cadence/scripts/getNft";
import useCurrentUser from '../lib/utils';


const MintNft = () => {
  const { addr, loggedIn } = useCurrentUser();

  const [nft, setNft ] = useState(null)
    const [scriptResult, setScriptResult] = useState([]);
  const [textInput, setTextInput] = useState("santa claus");

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  const handleMint = () => {
    query({ inputs: textInput }).then(async (response) => {
      

      const transactionId = await fcl.send([
        fcl.transaction(createNft),
        fcl.args([
          fcl.arg(URL.createObjectURL(response), types.String),
          fcl.arg("Holiday NFT", types.String)
        ]),
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(9999)
      ]).then(fcl.decode);

      console.log(transactionId);
      console.log(response)
      setNft(URL.createObjectURL(response));
    });
  };

  const displayNft = async () => {
    const result = await fcl.send([
      fcl.script(getNft),
      fcl.args([
        fcl.arg(addr, types.Address)
      ])
    ]).then(fcl.decode);

    console.log(result);
      setScriptResult([1]);
  }

  return (
    <div className="input-container">
      {!loggedIn && (
        <div className="button-container">
          <button onClick={fcl.authenticate}>Connect</button>
        </div>
      )}

      {loggedIn && (
        <div>
          <div className="button-container">
            <button onClick={fcl.unauthenticate}>Logout</button>
          </div>
          <input
            type="text"
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter your text"
          />
          <button onClick={handleMint}>Mint NFT</button>
          <button onClick={displayNft}>See NFT</button>

          <div className="nft-container">
            {scriptResult.length !== 0 ? (
              <img src={nft} alt="Generated NFT" />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default MintNft;
