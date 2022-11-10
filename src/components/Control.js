function Control({ reset, startPause, paused }) {
  return (
    <div className="control-component">
      {paused ? (
        <button id="start_stop" onClick={startPause}>
          <i className="fa-solid fa-play"></i>
        </button>
      ) : (
        <button id="start_stop" onClick={startPause}>
          <i className="fa-solid fa-pause"></i>
        </button>
      )}

      <button id="reset" onClick={reset}>
        <i className="fa-solid fa-rotate"></i>
      </button>
    </div>
  );
}

export default Control;
