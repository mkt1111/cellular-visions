import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface CellularAutomatonProps {
  rule: number;
  cellSize: number;
  delay: number;
  maxGenerations: number;
  isPlaying: boolean;
  onReset: () => void;
  zoom: number;
  colorMode: string;
}

export const CellularAutomaton = ({
  rule,
  cellSize,
  delay,
  maxGenerations,
  isPlaying,
  onReset,
  zoom,
  colorMode,
}: CellularAutomatonProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generation, setGeneration] = useState(0);
  const [grid, setGrid] = useState<number[][]>([]);
  const animationRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  const width = Math.floor(800 / cellSize);
  const height = maxGenerations;

  // Get color for cell based on color mode and generation
  const getCellColor = (generation: number, totalGenerations: number): string => {
    const rootStyle = getComputedStyle(document.documentElement);
    
    switch (colorMode) {
      case "rainbow": {
        // Rainbow gradient from red through spectrum
        const hue = (generation / totalGenerations) * 300; // 0 to 300 degrees (red to purple)
        return `hsl(${hue}, 85%, 70%)`;
      }
      case "blue-gradient": {
        const lightness = 95 - (generation / totalGenerations) * 40; // 95% to 55%
        return `hsl(210, 100%, ${lightness}%)`;
      }
      case "green-gradient": {
        const lightness = 95 - (generation / totalGenerations) * 40;
        return `hsl(140, 80%, ${lightness}%)`;
      }
      case "purple-gradient": {
        const lightness = 95 - (generation / totalGenerations) * 40;
        return `hsl(270, 80%, ${lightness}%)`;
      }
      case "fire": {
        // Fire gradient: yellow to orange to red
        const progress = generation / totalGenerations;
        const hue = 60 - (progress * 60); // 60 (yellow) to 0 (red)
        const lightness = 70 - (progress * 20); // 70% to 50%
        return `hsl(${hue}, 100%, ${lightness}%)`;
      }
      case "ocean": {
        // Ocean gradient: cyan to deep blue
        const progress = generation / totalGenerations;
        const hue = 180 + (progress * 60); // 180 (cyan) to 240 (blue)
        const lightness = 80 - (progress * 30);
        return `hsl(${hue}, 85%, ${lightness}%)`;
      }
      case "white":
      default: {
        const cellColor = rootStyle.getPropertyValue('--cell-active').trim();
        return cellColor ? `hsl(${cellColor})` : '#f0f4ff';
      }
    }
  };

  const getGlowColor = (cellColor: string): string => {
    if (colorMode === "white") {
      const rootStyle = getComputedStyle(document.documentElement);
      const glowColor = rootStyle.getPropertyValue('--cell-glow').trim();
      return glowColor ? `hsl(${glowColor})` : '#3b82f6';
    }
    return cellColor; // Use same color for glow in gradient modes
  };

  // Convert rule number to binary array
  const getRuleBinary = (ruleNum: number): number[] => {
    return ruleNum
      .toString(2)
      .padStart(8, "0")
      .split("")
      .map(Number)
      .reverse();
  };

  // Calculate next state based on rule
  const applyRule = (left: number, center: number, right: number): number => {
    const ruleBinary = getRuleBinary(rule);
    const index = (left << 2) | (center << 1) | right;
    return ruleBinary[index];
  };

  // Initialize grid
  useEffect(() => {
    const initialGrid: number[][] = [];
    const firstRow = new Array(width).fill(0);
    firstRow[Math.floor(width / 2)] = 1;
    initialGrid.push(firstRow);
    setGrid(initialGrid);
    setGeneration(0);
    lastUpdateRef.current = 0;
  }, [width, rule]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || generation >= maxGenerations) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= delay) {
        lastUpdateRef.current = timestamp;

        setGrid((prevGrid) => {
          if (prevGrid.length >= maxGenerations) return prevGrid;

          const currentRow = prevGrid[prevGrid.length - 1];
          const nextRow = currentRow.map((_, i) => {
            const left = currentRow[i - 1] || 0;
            const center = currentRow[i];
            const right = currentRow[i + 1] || 0;
            return applyRule(left, center, right);
          });

          return [...prevGrid, nextRow];
        });

        setGeneration((prev) => prev + 1);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, generation, maxGenerations, delay, rule]);

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get computed colors from CSS variables on root element
    const rootStyle = getComputedStyle(document.documentElement);
    const bgColor = rootStyle.getPropertyValue('--background').trim();

    // Convert HSL values to full HSL string or use fallback
    const backgroundColor = bgColor ? `hsl(${bgColor})` : '#0a0f1e';

    // Clear canvas with dark background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Only draw if we have grid data
    if (grid.length === 0) return;

    // Draw grid
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          const cellColor = getCellColor(y, grid.length);
          const glowColor = getGlowColor(cellColor);
          
          // Draw cell with enhanced glow effect
          const glowSize = Math.max(cellSize * 1.5, 8);
          ctx.shadowBlur = glowSize;
          ctx.shadowColor = glowColor;
          ctx.fillStyle = cellColor;
          
          // Draw slightly larger cell for visibility
          const padding = 0.5;
          ctx.fillRect(
            x * cellSize + padding,
            y * cellSize + padding,
            cellSize - padding * 2,
            cellSize - padding * 2
          );
          ctx.shadowBlur = 0;
        }
      });
    });
  }, [grid, cellSize, colorMode]);

  return (
    <Card className="p-4 bg-card border-border">
      <div className="overflow-x-auto overflow-y-hidden">
        <div style={{ width: `${width * cellSize * zoom}px`, height: `${height * cellSize * zoom}px` }}>
          <canvas
            ref={canvasRef}
            width={width * cellSize}
            height={height * cellSize}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
            className="border border-grid-line rounded"
          />
        </div>
      </div>
    </Card>
  );
};
