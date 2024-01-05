import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Exp() {
    const [value,setvalue]=useState("")
    const [key,setkey]=useState(0)
    const [fuck,setfuck]=useState([])
    const handlesubmit= ()=>{
        setvalue(`Hey Man${key+1}`)
        setkey(key+1)
    }
     useEffect(()=>{
      if(key===0){
      }
      else{
        sessionStorage.setItem(JSON.stringify(key),JSON.stringify(value))
      }
      const sessiondata=[]
      for(let i=1;i<=key;i++){
        const val=sessionStorage.getItem(JSON.stringify(i))
        sessiondata.push(val)
      }
      setfuck(sessiondata)
    },[key,value])   

  return (
    <>
    <div>
      <button onClick={handlesubmit}>Submit</button>
    </div>
    <div>
      {fuck.map((item,index)=>(
        <div key={index}>{item}</div>
      )
      )}
    </div>
  </>
  )
}

