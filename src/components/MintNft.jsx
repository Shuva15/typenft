import React, { useState } from "react";

const MintNft = () => {
    const [nft, setNft] = useState(null)

    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/nerijs/pixel-art-xl",
            {
                headers: { Authorization: "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
                method: "POST",
                body: JSON.stringify(data),
            }
        ); 
        const result = await response.blob();
        return result;
    }

    const handleClick = () => {
        query({"inputs": "Astronaut riding a horse"}).then((response) => {
            setNft(URL.createObjectURL(response))
        });
    }

  return (
    <div>
      <input type="text" name="" id="" />
      <button onClick={handleClick}>mint</button>
      {nft && <img src={nft}></img>}
    </div>
  );
};

export default MintNft;
