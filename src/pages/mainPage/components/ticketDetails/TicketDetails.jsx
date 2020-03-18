import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import classes from "./TicketDetails.module.css"

export default withRouter(function TicketDetails(props) {
  
  const [ currentTicket, setCurrentTicket ] = useState([])

  const ticketId = props.match.params.id;

  const getTicket = async () => {
    const response = await axios.get("https://raw.githubusercontent.com/Tapify/public-code-test/master/web-ui-test/tickets.json");
    
    const tickets = response.data
    
    const ticket = tickets.find(item => item.ticketId === Number(ticketId));
    
    setCurrentTicket(ticket);
  }
  
  useEffect( () => { 
    getTicket(); 
  }, [props]);

  return (
    <div className={classes.container}>
      {currentTicket.owner ? 
        <div>
          <div className={classes.header}>
            <span>Ticked NO: {currentTicket.number}</span>
            <span>Last Updated: {currentTicket.lastUpdatedTime.slice(0, currentTicket.lastUpdatedTime.indexOf("T")) + " " + 
                currentTicket.lastUpdatedTime.slice(currentTicket.lastUpdatedTime.indexOf("T") + 1, currentTicket.lastUpdatedTime.indexOf(":") + 3)}</span>
          </div>
          <div className={classes.content}>
            <div className={classes.content_header}>
              <span>Owner</span>
            </div>
            <div className={classes.content_main}>
              <div>
                <img src={currentTicket.owner.avatar} alt=""/>
              </div>
              <div className={classes.content_Owner}>
                <span>{currentTicket.owner.firstName} {currentTicket.owner.lastName}</span>
                <span>{currentTicket.owner.specialities}</span>
              </div>
            </div>
          </div>

          <div className={classes.content}>
            <div className={classes.content_header}>
              <span>Details</span>
            </div>
            <div className={classes.details_content}>
                <label>Reported</label>
                <span>{currentTicket.reportedTime.slice(0, currentTicket.reportedTime.indexOf("T")) + " " + 
                  currentTicket.reportedTime.slice(currentTicket.reportedTime.indexOf("T") + 1, currentTicket.reportedTime.indexOf(":") + 3)}
                </span>
            </div>
            <div className={classes.details_content}>
                <label>Status</label>
                {currentTicket.status === "assigned" ? <span className="status_asg">ASG</span> : ""}
                {currentTicket.status === "completed" ? <span className="status_com">COM</span> : ""}
                {currentTicket.status === "unassigned" ? <span className="status_una">UNA</span> : ""} 
            </div>
            <div className={classes.details_content}>
                <label>Description</label>
                <span>{currentTicket.description}</span>
            </div>
          </div>

          <div className={classes.content}>
            <div className={classes.content_header}>
              <span>Asset</span>
            </div>
            <div className={classes.details_content}>
                <label>Name</label>
                <span>{currentTicket.asset.name}
                </span>
            </div>
            <div className={classes.details_content}>
                <label>GeoCode</label>
                <span>{currentTicket.asset.geoCode}</span>
            </div>
            <div className={classes.details_content}>
                <label>Location</label>
                <div className={classes.asset_location}>
                  <span>{Number(currentTicket.asset.kmFrom).toFixed(3)}</span>
                  <span>{Number(currentTicket.asset.kmTo).toFixed(3)}</span>
                </div>
            </div>
          </div>
        </div>
      :
        <div>
          Loading...   
        </div>
    }
    </div>
  )
});