import { useState } from "react";
import { CellularAutomaton } from "@/components/CellularAutomaton";
import { ControlPanel } from "@/components/ControlPanel";

const Index = () => {
  const [rule, setRule] = useState(30);
  const [cellSize, setCellSize] = useState(8);
  const [delay, setDelay] = useState(50);
  const [maxGenerations, setMaxGenerations] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [colorMode, setColorMode] = useState("white");

  const handleReset = () => {
    setIsPlaying(false);
    setResetKey((prev) => prev + 1);
  };

  const handleRuleChange = (newRule: number) => {
    const clampedRule = Math.max(0, Math.min(255, newRule));
    setRule(clampedRule);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Cellular Automaton Explorer
          </h1>
          <p className="text-muted-foreground">
            Explore Wolfram's 256 Elementary Cellular Automata Rules
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ControlPanel
              rule={rule}
              onRuleChange={handleRuleChange}
              cellSize={cellSize}
              onCellSizeChange={setCellSize}
              delay={delay}
              onDelayChange={setDelay}
              maxGenerations={maxGenerations}
              onMaxGenerationsChange={setMaxGenerations}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onReset={handleReset}
              zoom={zoom}
              onZoomChange={setZoom}
              colorMode={colorMode}
              onColorModeChange={setColorMode}
            />
          </div>

          <div className="lg:col-span-2">
            <CellularAutomaton
              key={resetKey}
              rule={rule}
              cellSize={cellSize}
              delay={delay}
              maxGenerations={maxGenerations}
              isPlaying={isPlaying}
              onReset={handleReset}
              zoom={zoom}
              colorMode={colorMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
