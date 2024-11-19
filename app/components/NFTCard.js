import React from 'react'
import Image from 'next/image'

const NFTCard = ({ nft }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md h-[450px]">
    <Image src={nft.image} alt={nft.name} width="100" height={48} className="w-full h-80 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg">{nft.name}</h3>
      <p className="text-sm text-gray-600">{nft.description}</p>
    </div>
  </div>
  )
}

export default NFTCard