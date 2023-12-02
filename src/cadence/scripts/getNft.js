export const getNft = `
import HolidaysNFT from 0x40582f87fa3d66cb
pub fun main(account: Address): [String] {

  let nftCollection = getAccount(account).getCapability(/public/HolidaysNFTCollection)
                        .borrow<&HolidaysNFT.Collection{HolidaysNFT.CollectionPublic}>()
                        ?? panic("This NFT Collection does not exist.")

  // info will contain the name and the image hash
  let info: [String] = []

  let nftRef = nftCollection.borrowEntireNFT(id: nftCollection.getIDs()[0])
  info.append(nftRef.image)
  info.append(nftRef.name)
  return info
}
`