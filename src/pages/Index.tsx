import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { CodeEditor } from "@/components/CodeEditor";
import { TutorialViewer } from "@/components/TutorialViewer";
import { ExerciseGenerator } from "@/components/ExerciseGenerator";

const sampleTutorial = {
  title: "JavaScript Functions Mastery",
  description: "Learn how to create and use functions effectively in JavaScript",
  steps: [
    {
      id: "1",
      title: "Function Declaration",
      content: "Functions are reusable blocks of code that perform specific tasks. Let's start with the basic function declaration syntax.\n\nA function declaration consists of:\n- The 'function' keyword\n- A function name\n- Parameters in parentheses\n- Code block in curly braces",
      code: "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));",
      hint: "Remember to use the 'function' keyword and give your function a descriptive name.",
      difficulty: "beginner" as const
    },
    {
      id: "2", 
      title: "Function Parameters",
      content: "Parameters allow functions to accept input values. You can have multiple parameters separated by commas.\n\nDefault parameters provide fallback values when arguments aren't provided.",
      code: "function calculateArea(width = 1, height = 1) {\n  return width * height;\n}\n\nconsole.log(calculateArea(5, 3)); // 15\nconsole.log(calculateArea()); // 1",
      hint: "Use default parameters to make your functions more robust.",
      difficulty: "beginner" as const
    },
    {
      id: "3",
      title: "Return Values",
      content: "Functions can return values using the 'return' statement. This makes functions more useful as they can produce output.\n\nWithout a return statement, functions return 'undefined'.",
      code: "function multiply(a, b) {\n  return a * b;\n}\n\nconst result = multiply(4, 5);\nconsole.log(result); // 20",
      hint: "Always return a value when your function performs a calculation.",
      difficulty: "beginner" as const
    }
  ]
};

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentCode, setCurrentCode] = useState("// Welcome to CodeLearn!\n// Start writing your code here...\n\nfunction hello() {\n  console.log('Hello, World!');\n}\n\nhello();");
  const [currentTutorialStep, setCurrentTutorialStep] = useState(0);

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
  };

  const handleRunCode = (code: string) => {
    console.log("Running code:", code);
    // In a real app, this would execute the code safely
  };

  const handleCodeInsert = (code: string) => {
    setCurrentCode(code);
  };

  const handleExerciseSelect = (exercise: any) => {
    setCurrentCode(exercise.starterCode);
    setActiveView("practice");
  };

  const renderMainContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard onNavigate={setActiveView} />;
      
      case "learn":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <TutorialViewer 
              tutorial={sampleTutorial}
              currentStep={currentTutorialStep}
              onStepChange={setCurrentTutorialStep}
              onCodeInsert={handleCodeInsert}
            />
            <CodeEditor 
              initialCode={currentCode}
              onCodeChange={handleCodeChange}
              onRunCode={handleRunCode}
            />
          </div>
        );
      
      case "practice":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <CodeEditor 
              initialCode={currentCode}
              onCodeChange={handleCodeChange}
              onRunCode={handleRunCode}
            />
            <ExerciseGenerator onExerciseSelect={handleExerciseSelect} />
          </div>
        );
      
      case "challenges":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Coding Challenges</h1>
            <ExerciseGenerator onExerciseSelect={handleExerciseSelect} />
          </div>
        );
      
      case "ai-help":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <h2 className="text-xl font-semibold mb-4">AI-Powered Coding Help</h2>
              <p className="text-muted-foreground">
                Get instant help with debugging, code explanations, and programming concepts!
              </p>
            </div>
          </div>
        );
      
      case "progress":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <h2 className="text-xl font-semibold mb-4">Track Your Learning Journey</h2>
              <p className="text-muted-foreground">
                View detailed analytics of your coding progress and achievements.
              </p>
            </div>
          </div>
        );
      
      default:
        return <Dashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="h-full p-6">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
