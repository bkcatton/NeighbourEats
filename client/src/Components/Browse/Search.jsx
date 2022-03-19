import React from 'react'

const Search = (props) => {

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={props.searchValue}
        onChange={(e) => props.setSearchValue(e.target.value)}
      />
    </div>
  )
}

export default Search