import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, BookOpen, Target, Lightbulb } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  content: string;
  code?: string;
  hint?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface TutorialViewerProps {
  tutorial: {
    title: string;
    description: string;
    steps: TutorialStep[];
  };
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onCodeInsert?: (code: string) => void;
}

export const TutorialViewer = ({ 
  tutorial, 
  currentStep = 0, 
  onStepChange,
  onCodeInsert 
}: TutorialViewerProps) => {
  const [showHint, setShowHint] = useState(false);
  const step = tutorial.steps[currentStep];
  const progress = ((currentStep + 1) / tutorial.steps.length) * 100;

  const handleNext = () => {
    if (currentStep < tutorial.steps.length - 1) {
      onStepChange?.(currentStep + 1);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange?.(currentStep - 1);
      setShowHint(false);
    }
  };

  const insertCode = () => {
    if (step.code) {
      onCodeInsert?.(step.code);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-accent text-accent-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">{tutorial.title}</h2>
        </div>
        <p className="text-muted-foreground mb-4">{tutorial.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{currentStep + 1} of {tutorial.steps.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <Badge className={getDifficultyColor(step.difficulty)}>
              {step.difficulty}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1}
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-6">
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {step.content}
          </div>
        </div>

        {step.code && (
          <Card className="bg-code-bg border-code-border p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Example Code</span>
              <Button 
                onClick={insertCode}
                size="sm" 
                variant="outline"
                className="text-xs"
              >
                Insert Code
              </Button>
            </div>
            <pre className="text-sm text-syntax-variable overflow-x-auto">
              <code>{step.code}</code>
            </pre>
          </Card>
        )}

        {step.hint && (
          <div className="space-y-2">
            <Button
              onClick={() => setShowHint(!showHint)}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? "Hide" : "Show"} Hint
            </Button>
            
            {showHint && (
              <Card className="bg-warning/10 border-warning/20 p-4 animate-fade-in">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{step.hint}</p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={currentStep >= tutorial.steps.length - 1}
          className="bg-gradient-primary hover:opacity-90"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};