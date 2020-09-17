import React from 'react';
import Form from './Form';
import Search from './Search';
import Task from './Task';


export default function Main({
  tasks,
  handleSubmit,
  handleSearch,
  sortMethod,
  handleTaskDelete,
  handleTaskSave,
  handleIdSort,
  handleNameSort,
  handleDateSort
}) {

  function onIdSort() {
    handleIdSort(tasks, sortMethod);
  }

  function onNameSort() {
    handleNameSort(tasks, sortMethod);
  }

  function onDateSort() {
    handleDateSort(tasks, sortMethod);
  }

  return (

    <main className="main">

      <section className="main__content">

        <Form tasks={tasks} onAddTask={handleSubmit} />

        <Search onSearch={handleSearch} />

        <table cols="4" className="table">
          <thead>
            <tr className="table__title-row">
              <td column="1" className="table__cell table__cell_id" onClick={onIdSort}>ID</td>
              <td column="2" className="table__cell table__cell_name" onClick={onNameSort}>Name</td>
              <td column="3" className="table__cell table__cell_date" onClick={onDateSort}>Date</td>
            </tr>
          </thead>
          <tbody>

            {tasks.map(task => <Task
              key={task.id}
              task={task}
              taskId={task.id}
              taskText={task.name}
              taskDate={task.date}
              removeTask={handleTaskDelete}
              onTaskSave={handleTaskSave}
            />)}

          </tbody>
        </table>

      </section>

    </main>

  );
}
