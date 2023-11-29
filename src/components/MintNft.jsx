import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";
import { createNft } from "../cadence/transactions/createNft";
import { getNft } from "../cadence/scripts/getNft";


const MintNft = (props) => {
    const [scriptResult, setScriptResult] = useState([]);
  const [textInput, setTextInput] = useState("santa claus");

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl",
      {
        headers: {
          Authorization: "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
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
      console.log(URL.createObjectURL(response));
    });
  };

  const displayNft = async () => {
    const result = await fcl.send([
        fcl.script(getNft),
        fcl.args([
          fcl.arg(props.addr, types.Address)
        ])
      ]).then(fcl.decode);
  
      console.log(result);
      setScriptResult(result);
  }

  return (
    <div>
      <input onChange={(e) => setTextInput(e.target.value)} />
      <button onClick={handleMint}>mint</button>
      <button onClick={displayNft}>see Nft</button>
      {scriptResult.length !== 0
          ? <div>
              <img src={`${scriptResult[0]}`} />
            </div>
          : null
        }
    </div>
  );
};

export default MintNft;
