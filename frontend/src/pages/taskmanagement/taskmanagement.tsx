import Sidebar from "../../components/sidebar/sideBar"
import AddTask from "../../components/taskmanager/addTask"
import TaskList from "../../components/taskmanager/taskList"
import "./taskmanagement.css"

const TaskManager = () => {
  return (
    <div>
      <div className="taskmanager">
        <div className="taskmanager__left">
          <Sidebar />
        </div>
        <div className="taskmanager__right">
          <div className="taskmanager__addtask">
            <AddTask />
          </div>
          <div className="taskmanager__tasklist">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager
