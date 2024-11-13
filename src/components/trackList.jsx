

const trackList = (props) => {
    const tracks = props.trackList.map((track) => (
        <a key={track._id} onClick={() => props.updateSelected(track)}>
          <li>{track.name}</li>
        </a>
      ));
      
      
    return (
        <div>
          <h1>track List</h1>
          <button onClick={props.handleFormView}>
           {props.isFormOpen ? 'Close Form' : 'New track'}
          </button>
          {!props.trackList.length ? <h2>No tracks Yet!</h2> : <ul>{tracks}</ul>}
        </div>
      );
      
  };
  
  export default trackList;