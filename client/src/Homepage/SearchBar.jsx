import React, { useState } from 'react'

function SearchBar() {
    const [searchText, setSearchText] = useState("");
    
  return (
    <>
        <input type="text" placeholder='Search' className='text-sm p-2' onChange={(e)=> setSearchText(e.target.value)}/>
    </>
  )
}

export default SearchBar