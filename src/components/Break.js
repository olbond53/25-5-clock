function Break({ incrementBreak, decrementBreak, breakLength }) {
  return (
    <div className="break-component">
      <h3 id="break-label" className="box1">
        Break Length
      </h3>

      <button id="break-decrement" className="box2" onClick={decrementBreak}>
        <i id="break-decrement-icon" className="fa-solid fa-minus"></i>
      </button>
      <p id="break-length" className="box3">
        {breakLength / 60}
      </p>
      <button id="break-increment" className="box4" onClick={incrementBreak}>
        <i id="break-increment-icon" className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export default Break;
