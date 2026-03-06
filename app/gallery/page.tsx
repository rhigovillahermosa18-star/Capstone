import Image from "next/image";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-[#e8c1cc] flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center font-semibold mb-4">Gallery</h2>

        <div className="grid grid-cols-3 gap-3">
          <Image src="/nail1.jpg" width={100} height={100} alt="" />
          <Image src="/nail2.jpg" width={100} height={100} alt="" />
          <Image src="/nail3.jpg" width={100} height={100} alt="" />
        </div>
      </div>
    </div>
  );
}