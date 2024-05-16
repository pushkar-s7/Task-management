import { create } from "zustand"
import { toast } from "react-toastify"

type TaskType = { id: number; task: string }

type TaskStore = {
  tasks: TaskType[]
  addTask: (task: string, id: number) => void
  deleteTask: (id: number) => void
  getAllTask: (data: TaskType[]) => void
}

const useTaskstore = create<TaskStore>()((set) => ({
  tasks: [],

  addTask: (task: string, id: number) => {
    const newTask: TaskType = { id, task }

    if (newTask) {
      set((state: any) => ({
        tasks: [...state.tasks, newTask],
      }))
      toast.success("Task added successfully", {
        position: "top-center",
        autoClose: 1000,
      })
    }
  },

  deleteTask: (id: number) => {
    if (id) {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }))
    }
    toast.success("Task deleted successfully", {
      position: "top-center",
      autoClose: 1000,
    })
  },

  getAllTask: (data: TaskType[]) => {
    if (data) {
      set(() => ({
        tasks: data,
      }))
    }
  },
}))

export default useTaskstore
