import React, { useRef } from 'react';
import * as htmlToImage from 'html-to-image';

import QRCode from 'react-qr-code';
const IDCard = ({ data, template, onDownload }) => {
    const cardRef = useRef();

    const handleDownload = async () => {
        const node = cardRef.current;
      
        try {
          // Wait for images to load
          const images = node.querySelectorAll("img");
          await Promise.all(
            Array.from(images).map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise((res, rej) => {
                    img.onload = res;
                    img.onerror = rej;
                  })
            )
          );
      
          // Optional: give html-to-image more time
          setTimeout(async () => {
            try {
              const dataUrl = await htmlToImage.toPng(node, {
                cacheBust: true,
              });
              const link = document.createElement('a');
              link.download = `${data.name}_IDCard.png`;
              link.href = dataUrl;
              link.click();
      
              if (onDownload) onDownload();
            } catch (err) {
              console.error("Image conversion error:", err);
              alert("Failed to capture card. Try again.");
            }
          }, 100);
        } catch (error) {
          console.error("Image load error:", error);
          alert("Oops! Could not download image. Try again.");
        }
      };
      
      

    //  TEMPLATE 1
    if (template === 'template1') {
        return (
            <div className="my-6">
                <div
                    ref={cardRef}
                    className="p-4 rounded-lg shadow-md w-[350px] mx-auto bg-blue-100"
                >

                    <h2 className="text-3xl font-bold mb-5 mt-4 text-center font-serif">Student ID Card</h2>
                    <div className='w-[70%] bg-slate-600 h-[1px] ml-12 mt-5'></div>
                    <div className="flex flex-col justify-center items-center gap-4 mb-2">
                        <div>
                            <img
                                src={data.photoPreview}
                                alt="Student"
                                className="h-24 w-24 object-cover mt-6 rounded border"
                            /></div>
                        <div>
                            <p className="text-lg"><strong>Name:</strong> {data.name}</p>
                            <p className="text-lg"><strong>Roll:</strong> {data.rollNumber}</p>
                            <p className="text-lg"><strong>Class:</strong> {data.classDivision}</p>


                            <p className='text-lg'><strong>Rack Number:</strong> {data.rackNumber}</p>
                            <p className='text-lg'><strong>Bus Route:</strong> {data.busRoute}</p>
                            {data.allergies.length > 0 && (
                                <p className='text-lg'><strong>Allergies:</strong> {data.allergies.join(', ')}</p>
                            )}</div>
                    </div>
                    <div className='w-[70%] bg-slate-600 h-[1px] ml-12 mt-5'></div>

                    <div className="bg-white p-4 ml-24 rounded border inline-block">

                        <QRCode value={JSON.stringify({
                            name: data.name,
                            rollNumber: data.rollNumber,
                            classDivision: data.classDivision,
                            rackNumber: data.rackNumber,
                            busRoute: data.busRoute,
                            allergies: data.allergies
                        })}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            size={128}
                            style={{ height: "auto", maxWidth: "100%", width: "100px" }} />

                    </div>

                </div>

                <button
                    onClick={handleDownload}
                    className="mt-4 block mx-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Download as PNG
                </button>
            </div>
        );
    }

    // TEMPLATE 2 
    if (template === 'template2') {
        return (
            <div className="mx-6 md:my-6">
                <div
                    ref={cardRef}
                    className="flex flex-col items-center justify-between gap-4 bg-gradient-to-r from-fuchsia-200 to-purple-300 shadow-lg p-6 rounded-2xl w-[350px] mx-auto"
                >
                    <div className='flex flex-col justify-center items-center'>
                    <h2 className="text-3xl font-bold mb-2 font-serif">ID Badge</h2>
                        <div className='w-[90%] bg-slate-600 h-[1px]  mt-5'></div>
                    </div>
                    <div className='flex justify-center gap-6 items-center'>
                    <div className='flex flex-col items-center gap-8'>
                        <img
                            src={data.photoPreview}
                            alt="Student"
                            className="w-28 h-28 object-cover rounded-full border-4 border-white shadow"
                        />
                        <div className="bg-white p-2 rounded border">
                            <QRCode
                                value={JSON.stringify({
                                    name: data.name,
                                    rollNumber: data.rollNumber,
                                    classDivision: data.classDivision,
                                })}
                                size={100}
                            />
                        </div>
                    </div>
                    <div className="text-center flex flex-col items-center justify-end text-gray-800">
                        <p className='text-3xl'><strong>{data.name}</strong></p>
                        <p className='text-lg font-semibold'>Roll: {data.rollNumber}</p>
                        <p className='text-lg font-semibold'>Class: {data.classDivision}</p>
                        <p className='text-lg font-semibold'>Rack: {data.rackNumber}</p>
                        <p className='text-lg font-semibold'>Bus: {data.busRoute}</p>
                        {data.allergies.length > 0 && (
                            <p className='text-lg font-semibold'>Allergies: {data.allergies.join(', ')}</p>
                        )}
                    </div>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    className="mt-4 block mx-auto bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                >
                    Download as PNG
                </button>
            </div>
        );
    }
    return null;
};
export default IDCard;
