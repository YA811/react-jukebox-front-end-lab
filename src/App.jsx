
import React from 'react';
import { useState, useEffect } from 'react';
import TrackForm from './TrackForm.jsx';
import NowPlaying from './NowPlaying.jsx';

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isFormView, setIsFormView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/tracks');
        const data = await res.json();
        setTracks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleAddTrack = async (track) => {
    try {
      const res = await fetch('http://localhost:3000/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(track),
      });

      if (!res.ok) {
        throw new Error('Failed to add track');
      }

      const newTrack = await res.json();
      setTracks([...tracks, newTrack]);
      setIsFormView(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditTrack = async (track) => {
    try {
      const res = await fetch(`http://localhost:3000/tracks/${track.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(track),
      });

      if (!res.ok) {
        throw new Error('Failed to edit track');
      }

      const updatedTrack = await res.json();
      const updatedTracks = tracks.map((t) => (t.id === updatedTrack.id? updatedTrack : t));
      setTracks(updatedTracks);
      setIsFormView(false);
      setIsEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const res = await fetch(`http://localhost:3000/tracks/${trackId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete track');
      }

      const updatedTracks = tracks.filter((t) => t.id!== trackId);
      setTracks(updatedTracks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormView = (track = null) => {
    setIsFormView(!isFormView);
    if (track) {
      setSelectedTrack(track);
      setIsEditMode(true);
    } else {
      setSelectedTrack(null);
      setIsEditMode(false);
    }
  };

  return (
    <div>
      <NowPlaying selected={selectedTrack} handleFormView={handleFormView} />
      {isFormView && (
        <TrackForm
          handleAddTrack={handleAddTrack}
          handleEditTrack={handleEditTrack}
          track={selectedTrack}
          isEditMode={isEditMode}
        />
      )}
      <TrackList
        trackList={tracks}
        handleFormView={handleFormView}
        handleDeleteTrack={handleDeleteTrack}
      />
    </div>

  )}
