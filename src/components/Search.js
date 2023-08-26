import React from 'react'
import { useGlobalContext } from '../context'

function Search() {
    const name = useGlobalContext();
  return (
    <div>Search{name}</div>
  )
}

export default Search