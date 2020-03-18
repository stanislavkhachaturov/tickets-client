import React from "react";
import classes from "./TicketList.module.css"

export default function TicketList(props) {
  
  const { tickets, setTicket, selectedTicketId } = props;

  return (
    <div className={classes.container}>
      <ul className={classes.header}>
        <li>Owner</li>
        <li>Reliorted</li>
        <li>Asset</li>
        <li>Status</li>
      </ul>
      <ul className={classes.tickets}>
        {tickets.length ? tickets.map(ticket => (
          <li className={ticket.ticketId === selectedTicketId ? classes.selected_ticket : ""}
          key={ticket.ticketId} onClick={() => {setTicket(ticket.ticketId)}}>

            {/* {ticket.ticketId === selectedTicketId ? <div className={classes.border}> </div> : ""}    */}

            <div className={classes.ticket_conteiner}>
              <img src={ticket.owner.avatar} alt="avatar"/>
              <span>
                {ticket.reportedTime.slice(0, ticket.reportedTime.indexOf("T")) + " " + 
                  ticket.reportedTime.slice(ticket.reportedTime.indexOf("T") + 1, ticket.reportedTime.indexOf(":") + 3)}
              </span>
              <span>{ticket.asset.name}</span>      
              {ticket.status === "assigned" ? <span className="status_asg">ASG</span> : ""}
              {ticket.status === "completed" ? <span className="status_com">COM</span> : ""}
              {ticket.status === "unassigned" ? <span className="status_una">UNA</span> : ""}           

            </div>      
          </li>
        )) : <p>Loading...</p>}
      </ul>
    </div>
  )
}

      
