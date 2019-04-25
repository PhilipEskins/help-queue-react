import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: [],
      selectedTicket: null
    };

    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  handleChangingSelectedTicket(ticket) {
    this.setState({selectedTicket: ticket});
    console.log('The selected ticket is now: ' +this.state.selectedTicket.names);
  }

  handleAddingNewTicketToList(newTicket) {
    var newMasterTicketList = this.state.masterTicketList.slice();
    newTicket.formattedWaitTime = (newTicket.timeOpen).fromNow(true);
    newMasterTicketList.push(newTicket);
    this.setState({masterTicketList: newMasterTicketList});
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(()=>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  updateTicketElapsedWaitTime() {
    let newMasterTicketList = this.state.masterTicketList.slice();
    newMasterTicketList.forEach((ticket) =>
      ticket.formattedWaitTime = (ticket.timeOpen).fromNow(true)
    );
    this.setState({masterTicketList: newMasterTicketList});
  }

  componentWillUnmount() {
    clearInterval(this.waitTimeUpdateTimer);
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path = '/' render = {()=><TicketList ticketList = {this.state.masterTicketList} />} />
          <Route path = '/newticket' render = {()=><NewTicketControl onNewTicketCreation = {this.handleAddingNewTicketToList} />} />
          <Route path = '/admin' render = {(props)=><Admin ticketList = {this.state.masterTicketList} currentRouterPath = {props.location.pathname} onTicketSelection={this.handleChangingSelectedTicket}/>}/>
          <Route component = {Error404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
