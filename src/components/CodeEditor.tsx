import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Bug, CheckCircle, AlertTriangle } from "lucide-react";

interface CodeError {
  line: number;
  message: string;
  type: "error" | "warning";
}

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRunCode?: (code: string) => void;
}

export const CodeEditor = ({ 
  initialCode = "", 
  language = "javascript",
  onCodeChange,
  onRunCode 
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [errors, setErrors] = useState<CodeError[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Simple error detection for demo
    const lines = code.split('\n');
    const detectedErrors: CodeError[] = [];

    lines.forEach((line, index) => {
      if (line.includes('console.log') && !line.includes(';')) {
        detectedErrors.push({
          line: index + 1,
          message: "Missing semicolon",
          type: "warning"
        });
      }
      if (line.includes('function') && !line.includes('{')) {
        detectedErrors.push({
          line: index + 1,
          message: "Missing opening brace",
          type: "error"
        });
      }
    });

    setErrors(detectedErrors);
  }, [code]);

  const handleCodeChange = (value: string) => {
    setCode(value);
    onCodeChange?.(value);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRunning(false);
    onRunCode?.(code);
  };

  const addSyntaxHighlighting = (text: string) => {
    return text
      .replace(/(function|const|let|var|if|else|for|while|return)/g, '<span class="text-syntax-keyword font-semibold">$1</span>')
      .replace(/(".*?"|'.*?')/g, '<span class="text-syntax-string">$1</span>')
      .replace(/(\d+)/g, '<span class="text-syntax-number">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-syntax-comment italic">$1</span>');
  };

  return (
    <Card className="bg-card border-code-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-code-border">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {language}
          </Badge>
          {errors.length === 0 ? (
            <div className="flex items-center gap-1 text-accent text-sm">
              <CheckCircle className="w-4 h-4" />
              No issues
            </div>
          ) : (
            <div className="flex items-center gap-1 text-warning text-sm">
              <AlertTriangle className="w-4 h-4" />
              {errors.length} issue{errors.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
        <Button 
          onClick={handleRunCode}
          disabled={isRunning}
          size="sm"
          className="bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <Play className="w-4 h-4 mr-2" />
          {isRunning ? "Running..." : "Run Code"}
        </Button>
      </div>

      <div className="relative">
        <div className="flex">
          {/* Line numbers */}
          <div className="bg-code-bg px-3 py-4 text-muted-foreground text-sm font-mono border-r border-code-border">
            {code.split('\n').map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code area */}
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-foreground font-mono text-sm leading-6 resize-none border-none outline-none z-10"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <div 
              className="p-4 font-mono text-sm leading-6 pointer-events-none whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ 
                __html: addSyntaxHighlighting(code || ' ') 
              }}
            />
          </div>
        </div>

        {/* Error indicators */}
        {errors.map((error) => (
          <div
            key={`${error.line}-${error.message}`}
            className={`absolute left-0 w-1 h-6 ${
              error.type === 'error' ? 'bg-destructive' : 'bg-warning'
            }`}
            style={{ 
              top: `${(error.line - 1) * 24 + 16}px`,
              marginLeft: '48px'
            }}
          />
        ))}
      </div>

      {/* Error panel */}
      {errors.length > 0 && (
        <div className="border-t border-code-border p-4 bg-code-bg">
          <div className="flex items-center gap-2 mb-2">
            <Bug className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Issues Detected</span>
          </div>
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Badge variant={error.type === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                Line {error.line}
              </Badge>
              {error.message}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};