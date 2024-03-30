import React, { useState } from 'react';
import './addTask.css';

const AddTask: React.FC = () => {
  const [task, setTask] = useState("");
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = JSON.parse(localStorage.getItem('auth') || "[]").id;

    let result = await fetch('http://localhost:5000/add', {
      method: 'post',
      body: JSON.stringify({ task, id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    result = await result.json();
    if (result) {
     setTask("");
    }
    console.log(result);


  };

  return (
    <div>
      <div className='taddtask'>
        <form action='' className='tform' onSubmit={handleSubmit}>
          <input className='tinput'
            type='text'
            name='task'
            placeholder='Add your task'
            value={task}
            onChange={(e) => setTask(e.target.value)}

          />
          <button className='tbutton' type='submit'>Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;