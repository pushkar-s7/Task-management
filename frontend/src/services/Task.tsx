import axios from "axios"
import useTaskstore from "../stores/taskStore"

const useTask = () => {
  const AddTask = useTaskstore().addTask
  const addTask = async (task: string, id: number) => {
    try {
      let result = await axios.post(
        "http://localhost:5000/add",
        { task, id },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${
              JSON.parse(localStorage.getItem("auth") || "[]").token
            }`,
          },
        }
      )
      if (result.data) {
        AddTask(result.data.task, result.data.id)
      }
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  const DeleteTask = useTaskstore().deleteTask
  const deleteTask = async (id: number) => {
    const Id = id
    try {
      let response = await axios.delete(`http://localhost:5000/task/${id}`, {
        headers: {
          authorization: `bearer ${
            JSON.parse(localStorage.getItem("auth") || "[]").token
          }`,
        },
      })
      if (response.data) {
        DeleteTask(Id)
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }
  const GetAllTask = useTaskstore().getAllTask
  const getAllTask = async (id: number) => {
    try {
      let result = await axios.get(`http://localhost:5000/task/${id}`, {
        headers: {
          authorization: `bearer ${
            JSON.parse(localStorage.getItem("auth") || "[]").token
          }`,
        },
      })
      if (result.data) {
        GetAllTask(result.data)
      }
    } catch (error) {
      console.error("Error fetching tasks:", error)
    }
  }
  return { addTask, deleteTask, getAllTask }
}
export default useTask
