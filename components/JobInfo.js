import {useEffect,useState} from 'react'
function JobInfo({ id }) {
    
    useEffect(()=>{
        console.log(id)
    },[id])
    return <div>Next stars: {id}</div>
  }

export default JobInfo