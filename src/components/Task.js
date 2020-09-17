import React from 'react';

export default function Task({
  task,
  taskId,
  taskText,
  taskDate,
  removeTask,
  onTaskSave
}) {

  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(taskText);
  const [date, setDate] = React.useState(taskDate);
  const [validationErrors, setValidationErrors] = React.useState({
    name: false,
    date: false
  });

  function handleRemove() {
    removeTask(task);
  }

  function onEdit() {
    setIsEditing(true);
  }

  function handleNameChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setName(value);

    if (value.length < 2) {
      errors.name = true;
    } else {
      errors.name = false;
    }

    setValidationErrors(errors);
  }

  function handleDateChange(evt) {
    const { value } = evt.target;
    let errors = validationErrors;

    setDate(value);

    if (value.length !== 10) {
      errors.date = true;
    } else {
      errors.date = false;
    }

    setValidationErrors(errors);
  }

  function handleSave() {
    onTaskSave(task, {
      name: name,
      date: date
    });
    setIsEditing(false);
    setValidationErrors({
      name: false,
      date: false
    });
  }

  return (

    <tr className="table__task-row">
      <td column="1" className="table__cell table__task-cell table__cell_id">{taskId}</td>
      <td column="2" className="table__cell table__task-cell table__cell_name">
        {isEditing ?
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="Задача"
            value={name}
            autoComplete="on"
            className="table__cell_edit-input"
            minLength="2"
            required
          />
          : taskText
        }
      </td>
      <td column="3" className="table__cell table__task-cell table__cell_date">
        {isEditing ?
          <input
            onChange={handleDateChange}
            type="text"
            placeholder="дд.мм.гггг"
            value={date}
            autoComplete="on"
            className="table__cell_edit-input"
            minLength="10"
            maxLength="10"
            required
          />
          : taskDate
        }
      </td>
      <td column="4" className="table__cell table__task-cell table__cell_options">
        {isEditing ?
          <button
            type="button"
            className={
              `table__cell_options-edit table__cell_options-edit_save
              ${(validationErrors.name || validationErrors.date) || (!name || !date) ?
                'table__cell_options-edit_save-disabled'
                : ''
              }`
            }
            onClick={handleSave}
            disabled={(validationErrors.name || validationErrors.date) || !name || !date}
          >
          </button>
          : <button type="button" className="table__cell_options-edit" onClick={onEdit}></button>
        }
        <button type="button" className="table__cell_options-remove" onClick={handleRemove}></button>
      </td>
    </tr>

  );
}
