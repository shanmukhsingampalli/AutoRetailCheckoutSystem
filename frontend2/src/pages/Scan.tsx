import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import toast from "react-hot-toast";

interface ScanProps {
  setData: React.Dispatch<React.SetStateAction<string>>; // ✅ correct typing
}

const Scan: React.FC<ScanProps> = ({ setData }) => {
  const beepSound = new Audio("/beep.mp3");
  // @ts-expect-error: result type is handled manually
  const handleScan = (_err: unknown, result) => {
    if (result?.text) {
      setData(result?.text); // ✅ update parent state
      beepSound.play();
      toast.success(`Product scanned: ${result?.text}`);
    }
  };

  return (
    <div className="box">
      <div className="scan">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={handleScan}
          delay={1500}
        />
      </div>
    </div>
  );
};

export default Scan;
