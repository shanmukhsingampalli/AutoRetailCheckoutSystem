import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import toast, { Toaster } from "react-hot-toast";

interface ScanProps {
  setData: React.Dispatch<React.SetStateAction<string>>; // ✅ correct typing
}

const Scan: React.FC<ScanProps> = ({ setData }) => {
  const [currentData, setCurrentData] = useState("No result");
  const [scanHistory, setScanHistory] = useState<string[]>([]);
  const beepSound = new Audio("/beep.mp3");

  const handleScan = (_err: unknown, result: { text: string } | null) => {
    if (result && result.text) {
      setData(result.text); // ✅ update parent state
      setCurrentData(result.text);
      setScanHistory((prev) => [...prev, result.text]);
      console.log("Scanned:", result.text);
      beepSound.play();
      toast.success(`Product scanned: ${result.text}`);
    } else {
      setCurrentData("No result");
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
