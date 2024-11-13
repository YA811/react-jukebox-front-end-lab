
import { useState } from 'react';

const trackForm = (props) => {
  const [formData, setFormData] = useState({
    trackName: '',
    
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.trackName]: evt.target.value });
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    props.handleAddTrack(formData);
    setFormData({ trackName: ''});
  };

  return (
    <div>
      <form>
        <label htmlFor="trackName"> trackName </label>
        <input
          id="trackName"
          name="trackName"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add New track</button>
      </form>
    </div>
  );
};

export default trackForm;