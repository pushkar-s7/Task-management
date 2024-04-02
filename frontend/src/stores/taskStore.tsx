import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

type TaskType = { id: number; task: string };

type TaskStore = {
    tasks: TaskType[];
    addTask: (task: string, id: number) => void;
    deleteTask: (id: number) => void;
    getAllTask: (id: number) => void;
};

const useTaskstore = create<TaskStore>()(

    ((set) => ({
        tasks: [],

        addTask: async (task: string, id: number) => {
            try {
                let result = await fetch('http://localhost:5000/add', {
                    method: 'post',
                    body: JSON.stringify({ task, id }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                result = await result.json();
               
                if (result) {

                    set((state: any) => ({
                        tasks: [...state.tasks, result],
                    }));
                    toast.success('Task added successfully', {
                        position: 'top-center',
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                console.error('Error adding task:', error);
            }
        },

        deleteTask: async (id: number) => {
            try {
                let response = await fetch(`http://localhost:5000/task/${id}`, {
                    method: 'Delete',
                })
                if (response.ok) {
                    set((state) => ({
                        tasks: state.tasks.filter((task) => task.id !== id),
                    }));
                    toast.success('Task deleted successfully', {
                        position: 'top-center',
                        autoClose: 1000,
                    });
                }
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        },

        getAllTask: async (id: number) => {
            try {
                let result = await fetch(`http://localhost:5000/task/${id}`, {
                    method: 'get',
                });
                const data: TaskType[] = await result.json(); 

                if (data) {
                    set((state) => ({
                        tasks: data, 
                    }));
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        },
    })),

);

export default useTaskstore;

