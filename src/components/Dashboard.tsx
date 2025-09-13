import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  Trophy, 
  Target, 
  BookOpen, 
  Code,
  Star,
  Calendar,
  Zap
} from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const recentActivities = [
    { type: "lesson", title: "JavaScript Basics", time: "2 hours ago", points: 15 },
    { type: "exercise", title: "Array Methods", time: "1 day ago", points: 25 },
    { type: "challenge", title: "Algorithm Challenge", time: "2 days ago", points: 50 },
  ];

  const upcomingLessons = [
    { title: "Functions & Scope", difficulty: "beginner", duration: "15 min" },
    { title: "Async Programming", difficulty: "intermediate", duration: "25 min" },
    { title: "Data Structures", difficulty: "advanced", duration: "40 min" },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-accent text-accent-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Welcome back, Coder! 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to level up your programming skills today?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold text-accent">1,247</p>
            </div>
            <Star className="w-8 h-8 text-accent" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Lessons Completed</p>
              <p className="text-2xl font-bold text-primary">23/50</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Streak</p>
              <p className="text-2xl font-bold text-warning">7 days</p>
            </div>
            <Zap className="w-8 h-8 text-warning" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Rank</p>
              <p className="text-2xl font-bold text-destructive">#142</p>
            </div>
            <Trophy className="w-8 h-8 text-destructive" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Progress
            </h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate('progress')}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">JavaScript Fundamentals</span>
                <span className="text-sm text-muted-foreground">46%</span>
              </div>
              <Progress value={46} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Data Structures</span>
                <span className="text-sm text-muted-foreground">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Algorithms</span>
                <span className="text-sm text-muted-foreground">12%</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="h-20 flex-col gap-2 bg-gradient-primary hover:opacity-90"
              onClick={() => onNavigate('learn')}
            >
              <BookOpen className="w-6 h-6" />
              Continue Learning
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-accent text-accent hover:bg-accent/10"
              onClick={() => onNavigate('practice')}
            >
              <Code className="w-6 h-6" />
              Practice Coding
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-warning text-warning hover:bg-warning/10"
              onClick={() => onNavigate('challenges')}
            >
              <Trophy className="w-6 h-6" />
              Take Challenge
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2 border-destructive text-destructive hover:bg-destructive/10"
              onClick={() => onNavigate('ai-help')}
            >
              <Zap className="w-6 h-6" />
              AI Assistant
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>

          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'lesson' ? 'bg-primary/10 text-primary' :
                    activity.type === 'exercise' ? 'bg-accent/10 text-accent' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {activity.type === 'lesson' ? <BookOpen className="w-4 h-4" /> :
                     activity.type === 'exercise' ? <Code className="w-4 h-4" /> :
                     <Trophy className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">+{activity.points} pts</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Lessons */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Recommended Next
          </h2>

          <div className="space-y-3">
            {upcomingLessons.map((lesson, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors cursor-pointer">
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getDifficultyColor(lesson.difficulty)}>
                      {lesson.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};