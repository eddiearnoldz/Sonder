import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";


const Dashboard = () => {
    const { t } = useTranslation();
    const mother = localStorage.getItem("mother")
    const motherJson = JSON.parse(mother)
    const [active, setActive] = useState([])
    const [pending, setPending] = useState([])
    const [finished, setFinished] = useState([])

  useEffect(()=>{
    fetch(`/requests/${motherJson._id}`,{
      headers:{
        'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        sortByStatus(result.requests);
    })
    .catch((err) => {
        console.log('Failed to load requests...', err);
    })},[]);

    const sortByStatus = (requests) => {
        const activeRequests = [];
        const pendingRequests = [];
        const finishedRequests = [];

        requests.forEach( unit => {
            if(unit.status === 'NEW'){
                activeRequests.push(unit)
            }else if(unit.status === "PENDING"){
                pendingRequests.push(unit)
            }else{
                finishedRequests.push(unit)
            }
        })
        setActive(activeRequests);
        setPending(pendingRequests);
        setFinished(finishedRequests)
    };


    const acceptHelp = (id) => {
        fetch(`/requests/accept/${id}`,{
            method: "post",
            headers:{
              'Content-Type':'application/json'
            }
        })
          .then(response => response.json())
          .then(data => {
            const oldPendingData = [...pending]
            const newPendingData = oldPendingData.filter(item => item._id != data[0]._id)
            setPending(newPendingData);
            setFinished([data[0], ...finished])
          })
    }

    const repeatRequest = (id) => {
        fetch(`/requests/repeat/${id}`,{
            method: "post",
            headers:{
              'Content-Type':'application/json'
            }
        })
          .then(response => response.json())
          .then(data => {
              const repeatRequest = data.repeat
              console.log(repeatRequest)
            setActive([repeatRequest, ...active])
          })
    }





  return (
   
    <>
    <div className="container" 
          style={{
            margin: "10px auto",
            maxWidth: "1000px",
            padding: "20px",
            textAlign: "center"
            }}>
      <div className='manage-request-page'>
        <div className='row'>
          <div className='col s4'>
            <h4 className='active-requests-header'>{t("Active Requests")}:</h4>
            {active.map(request => {
                return (
                <>
                <div className="row">
                <div className="card blue darken requests-boxes">
                <div className="card-content">
                    <p className='active-requests-title-text'>{t("Request Note")}{request.text}</p> 
                    <p className='active-requests-title-header'><b>{t("Items in this request")}</b></p>
                    <p>{request.basket.join(',   ')}</p>
                </div>
                </div>
                </div>   
                </>
            )
            })}
          </div>
          <div className='col s4'>
            <h4 className='active-requests-header'>{t("Pending Requests")}:</h4>
            {pending.map(request => {
                return(
                <>
                <div className="row">
                  <div className="card indigo requests-boxes">
                    <div className="card-content">
                      <p className='active-requests-title-text'> {t("These items were requested by you")}{request.basket.join(',   ')} </p>
                      <p className='active-requests-title-header'> {request.fulfilledBy.name}{t("has offered to donate these items")}</p>
                      <div className="card-action">
                        <button className="waves-effect waves-light btn-small call-to-action-button"
                                onClick = {(e) => {
                                e.preventDefault();
                                acceptHelp(request._id)
                                }}> 
                                <i className="material-icons left">check_box</i>
                                {t("Accept this donation")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </>
                )
            })}
          </div>
          <div className='col s4'>
            <h4 className='active-requests-header'>{t("Finished Requests")}:</h4>
            {finished.map(request => {
                return (
                <>
                <div className="row">
                <div className="card deep-purple requests-boxes">
                <div className="card-content">
                    <p className='active-requests-title-text'>{t("These items were requested by you")} {request.basket.join(', ')} </p>
                    <p className='active-requests-title-header'>{request.fulfilledBy.name}{t("has donated these items")}</p>
                    <div className="card-action">
                    <button className="waves-effect waves-light btn-small call-to-action-button"
                        onClick = {(e) => {
                        e.preventDefault();
                        repeatRequest(request._id)
                        }}> 
                        <i className="material-icons left">autorenew</i>
                        {t("Repeat this request")}
                    </button>
                    </div>
                </div>
                </div>
                </div>
                </>
                )
            })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard