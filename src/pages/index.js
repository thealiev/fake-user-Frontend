import { useState, useCallback } from "react";
import RegionSelector from "./RegionSelector";
import ErrorAmountSelector from "./ErrorAmountSelector";
import UserDataDisplay from "./UserDataDisplay";

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState("USA");
  const [randomIdentifier, setRandomIdentifier] = useState("");
  const [errorAmount, setErrorAmount] = useState(0);
  const seed = 1;

  const handleRegionChange = useCallback((region) => {
    setSelectedRegion(region);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fake User Data Generator</h1>
      <div className="mb-4">
        <RegionSelector
          region={selectedRegion}
          onRegionChange={handleRegionChange}
          onIdentifierGenerated={setRandomIdentifier}
        />
      </div>
      <div className="mb-4">
        <ErrorAmountSelector
          errorAmount={errorAmount}
          setErrorAmount={setErrorAmount}
        />
      </div>
      <UserDataDisplay
        key={randomIdentifier}
        region={selectedRegion}
        randomIdentifier={randomIdentifier}
        seed={seed}
        errorAmount={errorAmount}
      />
    </div>
  );
}
