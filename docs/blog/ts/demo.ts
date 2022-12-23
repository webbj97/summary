interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};
