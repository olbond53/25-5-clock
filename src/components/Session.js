import React from 'react';

function Session({ incrementSession, decrementSession, sessionLength }) {
  return (
    <div className="session-component">
      <h3 id="session-label" className="box1">
        Session Length
      </h3>

      <button
        id="session-decrement"
        className="box2"
        onClick={decrementSession}
      >
        <i id="session-decrement-icon" className="fa-solid fa-minus"></i>
      </button>
      <p id="session-length" className="box3">
        {sessionLength / 60}
      </p>
      <button
        id="session-increment"
        className="box4"
        onClick={incrementSession}
      >
        <i id="session-increment-icon" className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default Session;
