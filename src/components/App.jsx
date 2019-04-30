import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import Admin from './Admin';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';
import Moment from 'moment';
import { v4 } from 'uuid';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterTicketList: {},
      selectedTicket: null
    };
    this.handleChangingSelectedTicket = this.handleChangingSelectedTicket.bind(this);
  }

  handleChangingSelectedTicket(ticketId) {
    this.setState({selectedTicket: ticketId});
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(()=>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  updateTicketElapsedWaitTime() {
    const newMasterTicketList = Object.assign({}, this.state.masterTicketList);
    Object.keys(newMasterTicketList).forEach(ticketId => {
      newMasterTicketList[ticketId].formattedWaitTime = (newMasterTicketList[ticketId].timeOpen).fromNow(true);
    });
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
          <Route path = '/newticket' render = {()=><NewTicketControl />} />
          <Route path = '/admin' render = {(props)=><Admin ticketList = {this.state.masterTicketList} currentRouterPath = {props.location.pathname} onTicketSelection = {this.handleChangingSelectedTicket} selectedTicket = {this.state.selectedTicket}/>}/>
          <Route component = {Error404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
