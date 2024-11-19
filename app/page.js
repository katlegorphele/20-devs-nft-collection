import Image from "next/image";
import Banner from "./components/Banner";
import NFTGrid from "./components/NFTGrid";

export default function Home() {
  return (
    <div>
      <Banner/>
      <hr className="my-8 border-grey-300"/>
      <div className="flex justify-center">
      <h2 className="text-2xl font-bold text-center">
        View NFTs</h2>
      </div>
      <NFTGrid/>
    </div>
  );
}
