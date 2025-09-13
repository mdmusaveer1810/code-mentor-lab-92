import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code, 
  BookOpen, 
  Trophy, 
  Settings, 
  Home,
  Brain,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({ 
  activeView, 
  onViewChange, 
  isCollapsed = false,
  onToggleCollapse 
}: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "practice", label: "Practice", icon: Code },
    { id: "challenges", label: "Challenges", icon: Trophy },
    { id: "ai-help", label: "AI Assistant", icon: Brain, badge: "New" },
    { id: "progress", label: "Progress", icon: TrendingUp },
  ];

  return (
    <div className={`bg-card border-r border-border h-full flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">CodeLearn</h1>
                <p className="text-xs text-muted-foreground">Master Programming</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-10 ${
                  isCollapsed ? 'px-2' : 'px-3'
                } ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : ''}`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </div>

        {!isCollapsed && (
          <>
            <Separator className="my-4" />
            
            {/* Quick Stats */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium">0/50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Points</span>
                  <span className="font-medium text-accent">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Streak</span>
                  <span className="font-medium text-warning">0 days</span>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 h-10 ${
            isCollapsed ? 'px-2' : 'px-3'
          }`}
          onClick={() => onViewChange('settings')}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
};