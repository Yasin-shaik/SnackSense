import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = ({ setBarcode }) => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0]?.deviceId;

        if (selectedDeviceId && videoRef.current) {
          await codeReader.current.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result, err) => {
              if (result) {
                setBarcode(result.getText()); // Set the barcode text
              }
              if (err && !(err.name === "NotFoundException")) {
                console.error("Scanner Error:", err);
              }
            }
          );
        }
      } catch (err) {
        console.error("Camera Access Error:", err);
      }
    };

    startScanner();

    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, [setBarcode]);

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "50vh",
          backgroundColor: "#000",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <video
          ref={videoRef}
          style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          muted
          autoPlay
        ></video>
      </div>
      <p>Scanning for barcode...</p>
    </div>
  );
};

export default BarcodeScanner;
