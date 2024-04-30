import React, { useState } from "react";

const RegionSelector = ({ region, onRegionChange, onIdentifierGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const randomIdentifier = Math.random().toString(36).substring(2, 15);
    onIdentifierGenerated(randomIdentifier);
    setIsGenerating(false);
  };

  return (
    <div className="relative inline-block">
      <select
        className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={region}
        onChange={(e) => onRegionChange(e.target.value)}
      >
        <option value="USA">USA</option>
        <option value="Poland">Poland</option>
        <option value="France">France</option>
      </select>
      <div className="flex mt-4 space-x-2">
        <button
          className="flex-grow px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default RegionSelector;
