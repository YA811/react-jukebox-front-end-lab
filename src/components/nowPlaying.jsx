

const nowPlaying = (props) => {
    // return if props.selected is null
    if (!props.selected)
      return (
        <div>
          <h1>NO DETAILS</h1>
        </div>
      );
  
    return (
      // return statement if props.selected has a truthy value
      <div>
        <h1>{props.selected.name}</h1>
        <button onClick={() => props.handleFormView(props.selected)}>Edit</button>
      </div>
    );
  };
  
  export default nowPlaying;