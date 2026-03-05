import React, { useState, useEffect } from 'react';
import routineService from '../../services/routine.service';

const EditRoutine = ({ routineId, onCancel, onRoutineUpdated }) => {
  const [name, setName] = useState('');
  const [workout, setWorkout] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchRoutineDetails = async () => {
      try {
        const response = await routineService.fetchOneRoutine(routineId);
        const { name, workout, bodyPart, totalDuration } = response; 
        setName(name);
        setWorkout(workout);
        setBodyPart(bodyPart);
        setTotalDuration(totalDuration);
      } catch (error) {
        console.error('Error fetching routine details:', error);
        setErrorMessage("Oops! Something went wrong. Please try again later!");
      }
    };

    fetchRoutineDetails();
  }, [routineId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedRoutine = {
      name,
      workout,
      bodyPart,
      totalDuration,
    };

    try {
      const response = await routineService.updateRoutine(routineId, updatedRoutine);
      onRoutineUpdated(response); 
    } catch (error) {
      console.error('Error updating routine:', error);
      setErrorMessage('Error updating routine');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>Routine Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Workout:</label>
      <input
        type="text"
        value={workout}
        onChange={(e) => setWorkout(e.target.value)}
      />
      <label>Body Part:</label>
      <input
        type="text"
        value={bodyPart}
        onChange={(e) => setBodyPart(e.target.value)}
      />
      <label>Total Duration:</label>
      <input
        type="number"
        value={totalDuration}
        onChange={(e) => setTotalDuration(e.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Update Routine</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditRoutine;
