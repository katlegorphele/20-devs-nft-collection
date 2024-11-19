import React from 'react'
import Image from 'next/image'

const Banner = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Image Section */}
            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/1.png"
                alt="NFT"
                className="rounded-lg object-cover"
                width={300} // Adjust dimensions as needed
                height={300}
              />
            </div>
    
            {/* Details Section */}
            <div className="md:col-span-2">
              <p className='py-5'>The <span>20 DEVS</span> collection </p>
              <h2 className="text-3xl font-bold">The Frontend Wizard</h2>
              <p className="text-sm mt-2">
                This is the description of the featured NFT. It can include metadata or any details
                about the NFT.
              </p>
              <button className="bg-white text-black px-4 py-2 mt-4 rounded-lg shadow-md">
                Mint NFT
              </button>
            </div>
          </div>
        </div>
      );
}

export default Banner