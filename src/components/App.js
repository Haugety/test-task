import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { defaultTasks } from '../utils/data.js';

export default function App() {

  const [initialTasks, setInitialTasks] = React.useState(defaultTasks);
  const [tasks, setTasks] = React.useState(defaultTasks);
  const [fieldOfSort, setFieldOfSort] = React.useState({
    sort: true,
    data: tasks
  });

  function handleSubmit(data) {
    const newTasks = data.concat(initialTasks);
    setInitialTasks(newTasks);
    setTasks(newTasks);
  }

  function handleSearch(string) {
    const value = string.toLowerCase();
    const newTasks = initialTasks.filter((t) => {
      return (t.name.toLowerCase().includes(value) || t.date.toLowerCase().includes(value));
    });
    setTasks(newTasks);
  }

  function handleTaskDelete(task) {
    const newTasks = initialTasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);
    setInitialTasks(newTasks);
  }

  function handleTaskSave(task, data) {
    const newTasks = initialTasks.map((t) => {
      if (t.id === task.id) {
        t.name = data.name;
        t.date = data.date.split(/\W/).join('.');
      }
      return t;
    });
    setTasks(newTasks);
    setInitialTasks(newTasks);
  }

  function handleIdSort(tasks, method) {
    const newTasks = tasks.sort((task1, task2) => {
      return method ? task2.id - task1.id : task1.id - task2.id;
    });
    setFieldOfSort({
      sort: !method,
      data: newTasks
    });
  }

  function handleNameSort(tasks, method) {
    const newTasks = tasks.sort((task1, task2) => {
      if (task1.name > task2.name) {
        return method ? 1 : -1;
      }
      if (task1.name < task2.name) {
        return method ? -1 : 1;
      }
      return 0;
    });
    setFieldOfSort({
      sort: !method,
      data: newTasks
    });
  }

  function handleDateSort(tasks, method) {
    const newTasks = tasks.sort((task1, task2) => {
      let date1 = new Date(task1.date.split('.').reverse());
      let date2 = new Date(task2.date.split('.').reverse());
      return method ? date2 - date1 : date1 - date2;
    });
    setFieldOfSort({
      sort: !method,
      data: newTasks
    });
  }

  return (
    <div className="page">

      <Header />

      <Main
        tasks={tasks}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
        sortMethod={fieldOfSort.sort}
        handleTaskDelete={handleTaskDelete}
        handleTaskSave={handleTaskSave}
        handleIdSort={handleIdSort}
        handleNameSort={handleNameSort}
        handleDateSort={handleDateSort}
      />

      <Footer />

    </div>
  );

}
