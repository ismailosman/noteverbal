import React from 'react';

interface BarcodeProps {
  value: string;
  height?: number;
}

export default function Barcode({ value, height = 40 }: BarcodeProps) {
  // Code 128 pattern generation (simplified)
  const generatePattern = (text: string) => {
    // Start with quiet zone
    let pattern = [0, 0, 0, 0];
    
    // Start code (Code 128B)
    pattern = pattern.concat([1, 1, 0, 1, 0, 0, 1, 1, 0, 0]);
    
    // Convert each character to bars
    text.split('').forEach((char) => {
      const code = char.charCodeAt(0);
      // Generate unique pattern for each character
      const charPattern = [
        (code % 2), 1, (code % 3 === 0), 1,
        (code % 2 === 0), 1, (code % 3 === 1), 1
      ];
      pattern = pattern.concat(charPattern);
    });
    
    // Stop code
    pattern = pattern.concat([1, 1, 0, 1, 1, 0, 0, 1, 1, 0]);
    
    // End with quiet zone
    pattern = pattern.concat([0, 0, 0, 0]);
    
    return pattern;
  };

  const pattern = generatePattern(value);
  const width = pattern.length * 2; // Make bars wider
  
  return (
    <div className="flex flex-col items-center">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="max-w-[300px]"
      >
        {pattern.map((bit, i) => (
          bit ? (
            <rect
              key={i}
              x={i * 2}
              y={0}
              width={2}
              height={height - 10}
              fill="#000066"
            />
          ) : null
        ))}
        <text
          x={width / 2}
          y={height - 2}
          textAnchor="middle"
          fontSize="10"
          fill="#000066"
          fontFamily="monospace"
        >
          {value}
        </text>
      </svg>
    </div>
  );
}