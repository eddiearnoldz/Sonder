import React, { useState, useEffect } from 'react'
import AddRequest from '../components/AddRequest/AddRequest.js'
import ListRequest from '../components/ListRequest/ListRequest.js'

const RequestPage = () => {

    const [allRequests, setAllRequests] = useState([])

    useEffect(()=>{
        fetch("/requests",{
          headers:{
            'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setAllRequests(result.requests)
            })
        }, [])

    return (
      <div className="container">
      <h1>Request Page</h1>
      < AddRequest 
        setAllRequests={setAllRequests}
        allRequests={allRequests}
        />
        <>
        {allRequests.map( oneRequest => {
            return < ListRequest 
            oneRequest={oneRequest}
            key={oneRequest._id}
            />
        })}
        </>
      </div>
    )
  }

  export default RequestPage