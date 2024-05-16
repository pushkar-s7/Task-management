import React, { useEffect } from "react"
import "./taskList.css"
import ListCard from "./listCard"
import useTaskStore from "../../stores/taskStore"
import useTask from "../../services/Task"

export interface Task {
  id: number
  task: string
}

const TaskList: React.FC = () => {
  const taskStore = useTaskStore()
  const tasks = taskStore.tasks
  const { getAllTask } = useTask()
  const authData = localStorage.getItem("auth")
  const id = authData ? JSON.parse(authData).id : null

  useEffect(() => {
    if (id) {
      getAllTask(id)
    } else {
      console.error("Authentication data not found or malformed")
    }
  }, [])

  return (
    <div>
      <ul className="list-header">
        <li className="header_li">
          <h6 className="header_h5"> Id </h6>
        </li>
        <li className="header_li">
          <h6 className="header_h5"> Issue Name </h6>
        </li>
        <li className="header_li">
          <h6 className="header_h5"> Action </h6>
        </li>
      </ul>
      {tasks && tasks.length > 0 ? (
        <ListCard tasks={tasks} />
      ) : (
        <h2>No Task found 🤔</h2>
      )}
    </div>
  )
}

export default TaskList
