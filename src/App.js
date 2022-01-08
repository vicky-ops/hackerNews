// import { render } from "@testing-library/react"
import React,{useState,useEffect,useRef} from "react"
// import ReactDOM from "react-dom"
import axios from "axios"

export default function App(){


    const [results,setResults]=useState([])
    const [query,setQuery]=useState("node")
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const searchInputRef=useRef()

    useEffect(()=>{
        getResults()
        
    },[])
    

const getResults=async()=>{
    setLoading(true)

    try{
        const response=await axios.get(
            `http://hn.algolia.com/api/v1/search?query=${query}`
            )
        setResults(response.data.hits)
    }catch(err){
        setError(err)
    }
    
    setLoading(false)
    console.log(results)
    }

const handleSearch=event=>{
    event.preventDefault()
    getResults();
}
const handleClearSearch=()=>{
    setQuery("")
    searchInputRef.current.focus()
}

    return(
        <div 
        style={{
            width:"500px",
            height:"500px",
            margin:"0 auto",
            boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px",

        }}
        >
           <h1 style={{color:"green",textAlign:"center"}}>Hacker News</h1>
           <form
                onSubmit={handleSearch}
                style={{textAlign:"center"}}
                    >
                <input
                        type="text"
                        onChange={event=>setQuery(event.target.value)}
                        value={query}
                        ref={searchInputRef}
                        style={{
                            margin:"1rem"
                        }}
                        />
                <button type="submit">Search</button>
                <button 
                
                    type="button"
                    onClick={handleClearSearch}
                    style={{
                        margin:"1rem"
                    }}
                    >Clear</button>

           </form>
           
           {loading?(
               <div>Loading results...</div>
           ) :
               (<ol>
                {results.map((result)=>(
                    <li key={result.objectID}>
                        <a href={result.url}>{result.title}</a>
                    </li>

                ))}    
           </ol>)}
           {error && <div>{error.message}</div>}
        </div>
    )
}