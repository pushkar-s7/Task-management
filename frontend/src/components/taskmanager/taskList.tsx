import React, { useEffect } from 'react';
import "./taskList.css";
import ListCard from './listCard';
import useTaskStore from '../../stores/taskStore';

export interface Task {
  id: number;
  task: string;
}

const TaskList: React.FC = () => {
  const { tasks, getAllTask } = useTaskStore((state) => ({
    tasks: state.tasks,
    getAllTask: state.getAllTask
  }));

  const authData = localStorage.getItem('auth');
  const id = authData ? JSON.parse(authData).id : null;

  useEffect(() => {
    if (id !== null && id !== undefined) {
      getAllTask(id);
    } else {
      console.error("Authentication data not found or malformed");
    }
  }, [getAllTask, id]);

  return (
    <div>
      <ul className='list-header'>
        <li className='header_li'>
          <h6 className='header_h5'> Id </h6>
        </li>
        <li className='header_li'>
          <h6 className='header_h5'> Issue Name </h6>
        </li>
        <li className='header_li'>
          <h6 className='header_h5'> Action </h6>
        </li>
      </ul>
      {tasks && tasks.length > 0 ? (
        <ListCard tasks={tasks} />
      ) : (
        <h2>No Task found 🤔</h2>
      )}
    </div>
  );
};

export default TaskList;