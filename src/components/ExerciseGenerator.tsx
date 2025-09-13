import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dices, Trophy, Clock, Star } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  topic: string;
  estimatedTime: string;
  points: number;
  starterCode: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

interface ExerciseGeneratorProps {
  onExerciseSelect?: (exercise: Exercise) => void;
}

const sampleExercises: Exercise[] = [
  {
    id: "1",
    title: "Hello World Function",
    description: "Create a function that returns 'Hello, World!' when called.",
    difficulty: "beginner",
    topic: "Functions",
    estimatedTime: "5 mins",
    points: 10,
    starterCode: "function helloWorld() {\n  // Your code here\n}",
    solution: "function helloWorld() {\n  return 'Hello, World!';\n}",
    testCases: [
      { input: "helloWorld()", expectedOutput: "'Hello, World!'" }
    ]
  },
  {
    id: "2",
    title: "Sum Calculator",
    description: "Write a function that takes two numbers and returns their sum.",
    difficulty: "beginner",
    topic: "Functions",
    estimatedTime: "8 mins",
    points: 15,
    starterCode: "function sum(a, b) {\n  // Your code here\n}",
    solution: "function sum(a, b) {\n  return a + b;\n}",
    testCases: [
      { input: "sum(2, 3)", expectedOutput: "5" },
      { input: "sum(-1, 1)", expectedOutput: "0" }
    ]
  },
  {
    id: "3",
    title: "Array Filter",
    description: "Create a function that filters even numbers from an array.",
    difficulty: "intermediate",
    topic: "Arrays",
    estimatedTime: "12 mins",
    points: 25,
    starterCode: "function filterEven(numbers) {\n  // Your code here\n}",
    solution: "function filterEven(numbers) {\n  return numbers.filter(num => num % 2 === 0);\n}",
    testCases: [
      { input: "filterEven([1, 2, 3, 4, 5])", expectedOutput: "[2, 4]" },
      { input: "filterEven([1, 3, 5])", expectedOutput: "[]" }
    ]
  },
  {
    id: "4",
    title: "Binary Search",
    description: "Implement binary search algorithm to find element in sorted array.",
    difficulty: "advanced",
    topic: "Algorithms",
    estimatedTime: "25 mins",
    points: 50,
    starterCode: "function binarySearch(arr, target) {\n  // Your code here\n}",
    solution: "function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
    testCases: [
      { input: "binarySearch([1, 3, 5, 7, 9], 5)", expectedOutput: "2" },
      { input: "binarySearch([1, 3, 5, 7, 9], 6)", expectedOutput: "-1" }
    ]
  }
];

export const ExerciseGenerator = ({ onExerciseSelect }: ExerciseGeneratorProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");

  const filteredExercises = sampleExercises.filter(exercise => {
    const difficultyMatch = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    const topicMatch = selectedTopic === "all" || exercise.topic === selectedTopic;
    return difficultyMatch && topicMatch;
  });

  const generateRandomExercise = () => {
    const filtered = filteredExercises.length > 0 ? filteredExercises : sampleExercises;
    const randomExercise = filtered[Math.floor(Math.random() * filtered.length)];
    onExerciseSelect?.(randomExercise);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-accent text-accent-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getUniqueTopics = () => {
    return Array.from(new Set(sampleExercises.map(ex => ex.topic)));
  };

  return (
    <Card className="h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Exercise Generator</h2>
          </div>
          <Button 
            onClick={generateRandomExercise}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Dices className="w-4 h-4 mr-2" />
            Random Challenge
          </Button>
        </div>

        <div className="flex gap-4">
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {getUniqueTopics().map(topic => (
                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="exercises" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="exercises">Browse Exercises</TabsTrigger>
            <TabsTrigger value="progress">Your Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="exercises" className="space-y-4 mt-4">
            {filteredExercises.map((exercise) => (
              <Card 
                key={exercise.id} 
                className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                onClick={() => onExerciseSelect?.(exercise)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{exercise.title}</h3>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    {exercise.points} pts
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>Topic: {exercise.topic}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exercise.estimatedTime}
                    </div>
                  </div>
                  <span>{exercise.testCases.length} test case{exercise.testCases.length !== 1 ? 's' : ''}</span>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="progress" className="mt-4">
            <Card className="p-6 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start Your Journey!</h3>
              <p className="text-muted-foreground mb-4">
                Complete exercises to track your progress and earn points.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">0</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">0</div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};