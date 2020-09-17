import React from 'react';

export default function Form({ tasks, onAddTask }) {

  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [validationErrors, setValidationErrors] = React.useState({
    name: true,
    date: true
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddTask([{
      id: tasks.length + 1,
      name: name,
      date: date.split(/\W/).join('.')
    }]);
    setName('');
    setDate('');
    setValidationErrors({
      name: true,
      date: true
    });
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

  return (

    <form action="url" className="form" onSubmit={handleSubmit}>

      <button
        type="submit"
        className={
          `form__submit
          ${(validationErrors.name || validationErrors.date) || (!name || !date)
            ? 'form__submit_disabled'
            : ''}`}
        disabled={(validationErrors.name || validationErrors.date) || !name || !date}
      >
        Добавить
      </button>
      <input
        onChange={handleNameChange}
        type="text"
        placeholder="Новая задача"
        value={name || ''}
        autoComplete="on"
        className="form__task-text"
        minLength="2"
        required
      />
      <input
        onChange={handleDateChange}
        type="text"
        placeholder="дд.мм.гггг"
        value={date || ''}
        autoComplete="on"
        className="form__task-date"
        minLength="10"
        maxLength="10"
        required
      />

    </form>

  );
}
