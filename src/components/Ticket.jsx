import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function Ticket(props) {

  function handleSavingSelectedTicket(ticketId) {
    const { dispatch } = props;
    const action = {
      type: 'SELECT_TICKET',
      ticketId: ticketId
    };
    dispatch(action);
  }

  const ticketInformation =
    <div>
      <style jsx>{`

      `}</style>
      <h3>{props.location} - {props.names}</h3>
      <p>{props.issue}</p>
      <hr/>
    </div>;
  if (props.currentRouterPath === '/admin') {
    return (
      <div onClick = {() => {handleSavingSelectedTicket(props.ticketId);}}>
        {ticketInformation}
      </div>
    );
  } else {
    return(
      <div>
        {ticketInformation}
      </div>
    );
  }
}


Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location:PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string.isRequired,
  currentRouterPath: PropTypes.string,
};
export default connect()(Ticket);
