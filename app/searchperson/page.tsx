"use client"

import '../globals.css'
import React, {useState, useEffect, FormEvent} from 'react'
import { headers } from "next/dist/client/components/headers";

type Returnedresults = {
  name: string;
  weight: string;
  record: string;
  country: string;
};

const SearchPerson = () => {

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Returnedresults[]>([]); //reference the type alias above

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/searchfighter', {
      method: 'POST',
      body: JSON.stringify({ inputText }), //this inputText is what we need to bring into out route.ts and destructure
      headers: {
        "Content-Type": "application/json"
      },
    });

    const { fighterList } = await res.json();

    console.log(fighterList);
    setResults(fighterList);
    console.log(results);
    setInputText("");
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
      <div className="grid grid-cols-3 gap-2">
				{results?.map((fighter, i) => (
					<div key={i}>
						<h1>{fighter.name}</h1>
            
						{/* <div>
							<p>weight class : {fighter.weight}</p>
							<p>record : {fighter.record}</p>
							<p>country : {fighter.country}</p>
						</div> */}
					</div>
				))}
			</div>
    </div>
  )
}

export default SearchPerson