import { Task } from '../types';

interface TaskOperations {
    title: string;
    setTitle: (title: string) => void;
    setTasks: (tasks: Task[]) => void;
    setModalVisible: (visible: boolean) => void;
    setError: (error: string | null) => void;
    tasks: Task[];
}

interface AddTaskType extends TaskOperations { }

interface UpdateTaskType extends TaskOperations {
    selectedTask: Task | null;
    setSelectedTask: (task: Task | null) => void;
}


const addTask = ({
    title,
    setTitle,
    setTasks,
    setModalVisible,
    setError,
    tasks,
}: AddTaskType) => {
    if (!title.trim()) {
        setError('Please enter a task title');
        return;
    }
    const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setModalVisible(false);
    setError(null);
};

const updateTask = ({
    title,
    setTitle,
    setTasks,
    setModalVisible,
    setError,
    tasks,
    selectedTask,
    setSelectedTask,
}: UpdateTaskType) => {
    if (!title.trim()) {
        setError('Please enter a task title');
        return;
    }
    if (!selectedTask) return;

    const updatedTasks = tasks.map(task =>
        task.id === selectedTask.id ? { ...task, title } : task
    );
    setTasks(updatedTasks);
    setModalVisible(false);
    setTitle('');
    setSelectedTask(null);
    setError(null);
};


export { addTask, updateTask};