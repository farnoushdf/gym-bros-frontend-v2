import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import routineService from '../../services/routine.service';

const RoutineDetailsPage = () => {
  const { id } = useParams(); 
  const [routine, setRoutine] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const fetchedWorkout = await routineService.fetchOneRoutine(id);
        setRoutine(fetchedWorkout);
      } catch (error) {
        console.error('Error fetching workout details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchWorkoutDetails();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!routine) {
    return <div>Workout not found!</div>; 
  }

  return (
    <div className="routine-details">
      <h2>{routine.name}</h2>
      <p>Workout: {routine.workout}</p>
      <p>Body Part: {routine.bodyPart}</p>
      <p>Total Duration: {routine.totalDuration} minutes</p>
      <p>Added on: {new Date(routine.date).toLocaleDateString()}</p>        

    </div>
  );
};

export default RoutineDetailsPage;
