import React from 'react';

interface QRCodeProps {
  data: string;
  size?: number;
}

export default function QRCode({ data, size = 200 }: QRCodeProps) {
  // Create a simple QR code pattern based on the data
  const cells = 25; // QR code matrix size
  const cellSize = size / cells;
  
  // Convert data to binary for visualization
  const binaryData = Array.from(data).map(char => char.charCodeAt(0).toString(2)).join('');
  
  // Create QR code pattern matrix
  const matrix = Array(cells).fill(0).map(() => Array(cells).fill(false));
  
  // Add finder patterns (the three large squares in corners)
  const addFinderPattern = (startX: number, startY: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          i === 0 || i === 6 || j === 0 || j === 6 || // Outer square
          (i >= 2 && i <= 4 && j >= 2 && j <= 4) // Inner square
        ) {
          matrix[startY + i][startX + j] = true;
        }
      }
    }
  };

  // Add finder patterns in corners
  addFinderPattern(0, 0); // Top-left
  addFinderPattern(cells - 7, 0); // Top-right
  addFinderPattern(0, cells - 7); // Bottom-left

  // Fill remaining cells with data pattern
  let dataIndex = 0;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (!matrix[i][j]) { // If cell is not part of finder patterns
        if (dataIndex < binaryData.length) {
          matrix[i][j] = binaryData[dataIndex] === '1';
          dataIndex++;
        }
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {matrix.map((row, i) =>
        row.map((cell, j) => (
          cell && (
            <rect
              key={`${i}-${j}`}
              x={j * cellSize}
              y={i * cellSize}
              width={cellSize}
              height={cellSize}
              fill="black"
            />
          )
        ))
      )}
    </svg>
  );
}