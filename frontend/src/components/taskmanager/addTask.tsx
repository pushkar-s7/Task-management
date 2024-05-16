import React, { useState } from "react"
import "./addTask.css"
import useTask from "../../services/Task"

const AddTask: React.FC = () => {
  const [task, setTask] = useState("")

  const { addTask } = useTask()

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = JSON.parse(localStorage.getItem("auth") || "[]").id
    await addTask(task, id)
    setTask("")
  }

  return (
    <div>
      <div className="taddtask">
        <form action="" className="tform" onSubmit={HandleSubmit}>
          <input
            className="tinput"
            type="text"
            name="task"
            placeholder="Add your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="tbutton" type="submit">
            Add Task
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddTask
