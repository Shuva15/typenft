export const createNft = `
import HolidaysNFT from 0x40582f87fa3d66cb

transaction(image: String, name: String) {

  prepare(acct: AuthAccount) {
    // Gives the signer a Collection if they don't already have it.
    if acct.borrow<&HolidaysNFT.Collection>(from: /storage/HolidayNFTCollection) == nil {
      acct.save(<- HolidaysNFT.createEmptyCollection(), to: /storage/HolidayNFTCollection)
      acct.link<&HolidaysNFT.Collection{HolidaysNFT.CollectionPublic}>(/public/HolidaysNFTCollection, target: /storage/HolidayNFTCollection)
    }

    let nftCollection = acct.borrow<&HolidaysNFT.Collection>(from: /storage/HolidayNFTCollection)!

    nftCollection.deposit(token: <- HolidaysNFT.mintNFT(image: image, name: name))
  }

  execute {
    log("Minted an NFT")
  }
}
`