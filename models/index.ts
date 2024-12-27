interface Task {
    id: number;
    description: string;
    completed: boolean; 
}

interface TodoItem {
    id: number;
    title: string;
    tasks: Task[]
    completed: boolean;
}

type TodoList = TodoItem[];

export type { TodoItem, TodoList, Task };