import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { toast, ToastContainer } from "react-toastify";

const BarcodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
              <ToastContainer position="top-center" theme="light" />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => setScanning(!scanning)}
      >
        {scanning ? "Close Scanner" : "Scan Barcode"}
      </button>

      {scanning && (
        <div className="border-2 border-gray-300 p-2">
          <BarcodeScannerComponent
            width={300}
            height={200}
            onUpdate={(err, result) => {
              if (result) {
                setScanResult(result.text);
                setScanning(false); 
                console.log(result.text);
                toast.success("Barcode scanned successfully");
              }
            }}
          />
        </div>
      )}

      {scanResult && <p className="text-lg font-bold">Scanned: {scanResult}</p>}
    </div>
  );
};

export default BarcodeScanner;