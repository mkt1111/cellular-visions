import { Card } from "@/components/ui/card";

interface RuleVisualizationProps {
  rule: number;
}

const getRuleDescription = (rule: number): string => {
  const descriptions: Record<number, string> = {
    0: "All cells die - the void of nothingness.",
    30: "Chaotic and random-looking patterns. Class III complexity - produces pseudo-random sequences used in cryptography.",
    45: "Complex localized structures with some stability.",
    54: "Nested fractal triangular patterns.",
    57: "Creates nested patterns with complex boundaries.",
    60: "XOR pattern - creates perfect Sierpiński triangle fractals.",
    62: "Mix of order and chaos with triangular structures.",
    73: "Interesting periodic patterns with vertical structures.",
    90: "Perfect Sierpiński triangle - Class II fractal patterns.",
    94: "Complex nested structures with regularity.",
    102: "Simple vertical stripes - periodic behavior.",
    105: "Creates interesting nested patterns.",
    106: "Mix of regularity and complexity.",
    110: "Turing complete! Class IV - complex computation, capable of universal computation.",
    122: "Creates fractal triangular patterns.",
    124: "Complex nested structures.",
    126: "Dense chaotic patterns.",
    129: "Interesting periodic vertical structures.",
    135: "Creates nested triangular patterns.",
    146: "Branching tree-like structures.",
    150: "XOR-based fractal patterns.",
    158: "Complex nested patterns.",
    182: "Symmetric nested structures.",
    184: "Creates dense triangular patterns.",
    188: "Regular triangular structures.",
    190: "Dense Sierpiński-like patterns.",
    220: "Creates complex nested triangles.",
    222: "Dense fractal structures.",
    225: "Creates vertical periodic patterns.",
    226: "Dense triangular nested patterns.",
    250: "Creates regular nested structures.",
    254: "Almost all cells survive - the fullness."
  };

  return descriptions[rule] || "Explore this rule's unique pattern evolution.";
};

export const RuleVisualization = ({ rule }: RuleVisualizationProps) => {
  const ruleBinary = rule.toString(2).padStart(8, "0");
  const patterns = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 0],
  ];

  return (
    <Card className="p-4 bg-secondary/50 border-border space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Rule {rule} Binary: {ruleBinary}
        </h3>
        <p className="text-xs text-muted-foreground">{getRuleDescription(rule)}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {patterns.map((pattern, idx) => {
          const output = parseInt(ruleBinary[7 - idx]);
          return (
            <div
              key={idx}
              className="flex flex-col items-center gap-1 p-2 bg-background/50 rounded border border-border"
            >
              <div className="flex gap-0.5">
                {pattern.map((cell, cellIdx) => (
                  <div
                    key={cellIdx}
                    className={`w-3 h-3 rounded-sm ${
                      cell === 1 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">→</div>
              <div
                className={`w-3 h-3 rounded-sm ${
                  output === 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
