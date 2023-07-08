"use client"
import React, {useState, useEffect, FormEvent} from 'react'

const SearchPerson = () => {

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault
    
    setLoading(true)
    console.log(inputText)
    setLoading(false)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='conor mcgregor'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></input>
        <button
          disabled={inputText === ""} 
          className='border'
        >{ loading ? "fetching the data" : "get data"}</button>
      </form>

      <div>
      <p>{inputText && inputText}</p>
      </div>
      {loading && <p>loading stuff now</p>}
      <div>
        
      </div>
    </div>
  )
}

export default SearchPerson