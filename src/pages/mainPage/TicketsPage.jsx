import React, { useState, useEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import axios from "axios";
import classes from "./TicketsPage.module.css"
import TicketList from "./components/ticketsList/TicketList"
import TicketDetails from "./components/ticketDetails/TicketDetails"

export default function TicketsPage(props) {
  const history = useHistory();
  const [ tickets, setTickets ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ selectedTicketId, setSelectedTicketId ] = useState([]);
  
  const callApi = async () => {
    try {
      const response = await axios.get("https://raw.githubusercontent.com/Tapify/public-code-test/master/web-ui-test/tickets.json");

      const allTickets = response.data;
      setTickets(allTickets);

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect( () => { 
    callApi();
  }, []);  

  const setTicket = (ticketId) => {
    setSelectedTicketId(ticketId)
    history.push("/ticket/" + ticketId);
  }

  const emptyContent = () => {
    return (
      <div className={classes.empty_list}>
        <strong>X</strong>
        No ticket selected
      </div> 
    )
  }

  const filteredTickets = tickets.filter(user => user.owner.firstName.toLowerCase().includes(searchTerm.toLowerCase())); 

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span className={classes.title}>Tickets</span>
        <div className={classes.border}></div>
      </div>
      <div className={classes.content}>
        <div className={classes.tickets}>
          <div className={classes.search_box}>
            <img src="https://image.flaticon.com/icons/svg/49/49116.svg" className={classes.search_icon} alt=""/>
            <input 
              type="text" 
              className={classes.search_panel}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className={classes.tickets_box}>
            <TicketList selectedTicketId={selectedTicketId} tickets={filteredTickets} setTicket={setTicket}/>
          </div>
        </div>
        <div className={classes.ticket_content}>         
          <Route exact path="/ticket/:id" component={TicketDetails}/> 
          <Route exact path="/" component={emptyContent}/>                
        </div>
      </div>
    </div>
  )
}