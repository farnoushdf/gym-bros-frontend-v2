import React, { useEffect, useState } from "react";
import "./WorkoutListPage.css"
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const WorkoutListPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/workouts/all-workouts`);
        setWorkouts(data);
        setFilteredWorkouts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkouts();
  }, []);

  const handleSearch = () => {
    let filtered = workouts;
    if (difficulty) {
      filtered = filtered.filter(
        (workout) => workout.difficulty === difficulty
      );
    }
    if (type) {
      filtered = filtered.filter((workout) => workout.type === type);
    }
    setFilteredWorkouts(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [difficulty, type]);

  return (
    <div className="workout-list">
      <h1>Choose activities that interest you</h1>

      <div className="search-form">
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
        </select>

        {/* <button onClick={handleSearch}>Search</button> */}
      </div>

      <div>
        {filteredWorkouts.map((oneWorkout) => (
          <Link
            to={`/workouts/${oneWorkout._id}`}
            key={oneWorkout._id}
            className="workout-item"
          >
            <div>
              <h2>{oneWorkout.name}</h2>
              {oneWorkout.image && (
                <img src={oneWorkout.image} alt={oneWorkout.name} />
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkoutListPage