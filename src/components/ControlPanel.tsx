import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause, RotateCcw } from "lucide-react";
import { RuleVisualization } from "./RuleVisualization";

interface ControlPanelProps {
  rule: number;
  onRuleChange: (rule: number) => void;
  cellSize: number;
  onCellSizeChange: (size: number) => void;
  delay: number;
  onDelayChange: (delay: number) => void;
  maxGenerations: number;
  onMaxGenerationsChange: (max: number) => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  colorMode: string;
  onColorModeChange: (mode: string) => void;
}

export const ControlPanel = ({
  rule,
  onRuleChange,
  cellSize,
  onCellSizeChange,
  delay,
  onDelayChange,
  maxGenerations,
  onMaxGenerationsChange,
  isPlaying,
  onPlayPause,
  onReset,
  zoom,
  onZoomChange,
  colorMode,
  onColorModeChange,
}: ControlPanelProps) => {
  return (
    <Card className="p-6 space-y-6 bg-card border-border">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Wolfram Rule {rule}
        </h2>
        <p className="text-sm text-muted-foreground">
          Elementary Cellular Automaton
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="rule" className="text-foreground">
              Rule (0-255)
            </Label>
            <Input
              id="rule"
              type="number"
              min={0}
              max={255}
              value={rule}
              onChange={(e) => onRuleChange(Number(e.target.value))}
              className="w-20 bg-secondary border-border text-foreground"
            />
          </div>
          <Slider
            value={[rule]}
            onValueChange={([value]) => onRuleChange(value)}
            min={0}
            max={255}
            step={1}
            className="w-full"
          />
        </div>

        <RuleVisualization rule={rule} />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="cellSize" className="text-foreground">
              Cell Size
            </Label>
            <span className="text-sm text-muted-foreground">{cellSize}px</span>
          </div>
          <Slider
            value={[cellSize]}
            onValueChange={([value]) => onCellSizeChange(value)}
            min={4}
            max={20}
            step={2}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="delay" className="text-foreground">
              Animation Speed
            </Label>
            <span className="text-sm text-muted-foreground">{delay}ms</span>
          </div>
          <Slider
            value={[delay]}
            onValueChange={([value]) => onDelayChange(value)}
            min={0}
            max={500}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="maxGen" className="text-foreground">
              Max Generations
            </Label>
            <span className="text-sm text-muted-foreground">
              {maxGenerations}
            </span>
          </div>
          <Slider
            value={[maxGenerations]}
            onValueChange={([value]) => onMaxGenerationsChange(value)}
            min={50}
            max={500}
            step={10}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="zoom" className="text-foreground">
              Zoom
            </Label>
            <span className="text-sm text-muted-foreground">{zoom}x</span>
          </div>
          <Slider
            value={[zoom]}
            onValueChange={([value]) => onZoomChange(value)}
            min={0.5}
            max={3}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="colorMode" className="text-foreground">
            Color Mode
          </Label>
          <Select value={colorMode} onValueChange={onColorModeChange}>
            <SelectTrigger className="w-full bg-secondary border-border text-foreground">
              <SelectValue placeholder="Select color mode" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="white">Classic White</SelectItem>
              <SelectItem value="rainbow">Rainbow Gradient</SelectItem>
              <SelectItem value="blue-gradient">Blue Gradient</SelectItem>
              <SelectItem value="green-gradient">Green Gradient</SelectItem>
              <SelectItem value="purple-gradient">Purple Gradient</SelectItem>
              <SelectItem value="fire">Fire (Red-Orange-Yellow)</SelectItem>
              <SelectItem value="ocean">Ocean (Cyan-Blue)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onPlayPause}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isPlaying ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Play
            </>
          )}
        </Button>
        <Button
          onClick={onReset}
          variant="secondary"
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Elementary cellular automata from Stephen Wolfram's "A New Kind of
          Science". Each rule defines how cells evolve based on their
          neighborhood configuration.
        </p>
      </div>
    </Card>
  );
};
