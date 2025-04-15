
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, PlusCircle, Trash2, ClipboardList } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

export default function TodoCard() {
  const [todos, setTodos] = useState<Todo[]>([
    { 
      id: '1', 
      text: 'Follow up with client regarding contract renewal', 
      completed: false, 
      createdAt: new Date(), 
      dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      priority: 'high'
    },
    { 
      id: '2', 
      text: 'Review performance metrics for Q2', 
      completed: false, 
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), 
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      priority: 'medium'
    },
    { 
      id: '3', 
      text: 'Prepare monthly report', 
      completed: true, 
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      priority: 'low'
    },
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const { role } = useUser();

  const handleAddTodo = () => {
    if (!newTodo.trim()) {
      toast({
        title: "Task cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date(),
      priority: 'medium'
    };
    
    setTodos([todo, ...todos]);
    setNewTodo('');
    setIsAdding(false);
    
    toast({
      title: "Task added",
      description: "Your new task has been added successfully",
    });
  };
  
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed",
    });
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  // Role-specific title
  const getTitleByRole = () => {
    switch (role) {
      case 'relationship_manager':
        return 'My Tasks';
      case 'team_lead':
        return 'Team Tasks';
      case 'head_of_department':
        return 'Department Tasks';
      default:
        return 'Tasks';
    }
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <ClipboardList className="mr-2 h-5 w-5 text-primary" />
          {getTitleByRole()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isAdding ? (
          <div className="p-4 border-b">
            <Textarea
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleAddTodo}
              >
                Add Task
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => setIsAdding(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Task
            </Button>
          </div>
        )}
        
        <ul className="divide-y max-h-[300px] overflow-y-auto">
          {todos.length === 0 ? (
            <li className="p-4 text-center text-muted-foreground">
              No tasks yet. Add your first task above.
            </li>
          ) : (
            todos.map(todo => (
              <li 
                key={todo.id} 
                className={cn(
                  "p-3 flex items-start gap-2 hover:bg-muted/30 transition-colors",
                  todo.completed && "bg-muted/20"
                )}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 rounded-full"
                  onClick={() => toggleComplete(todo.id)}
                >
                  <CheckCircle 
                    className={cn(
                      "h-5 w-5", 
                      todo.completed ? "text-green-500" : "text-muted-foreground/40"
                    )} 
                  />
                </Button>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm",
                    todo.completed && "line-through text-muted-foreground"
                  )}>
                    {todo.text}
                  </p>
                  <div className="flex items-center mt-1 gap-2">
                    {todo.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(todo.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    )}
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      getPriorityClass(todo.priority)
                    )}>
                      {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 rounded-full opacity-0 group-hover:opacity-100"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
