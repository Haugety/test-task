import React from 'react';

export default function Search({ onSearch }) {

  const [searchField, setSearchField] = React.useState('');

  function handleSearch(evt) {
    const { value } = evt.target;
    setSearchField(value);
    onSearch(value);
  }

  return (

    <input onChange={handleSearch} type="text" placeholder="Найти задачу" value={searchField || ''} autoComplete="on" className="search" />

  );
}
