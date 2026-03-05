import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RoutinePage.css';

const API_URL = import.meta.env.VITE_API_URL;

const RoutinePage = () => {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutines = async () => {
            try {
                const response = await fetch(`${API_URL}/routines/all-routines`);
                if (response.ok) {
                    const json = await response.json();
                    setRoutines(json);
                } else {
                    setError("Oops! Something went wrong. Please try again later!");
                }
            } catch (error) {
                setError("Oops! Something went wrong. Please try again later!");
            } finally {
                setLoading(false);
            }
        };

        fetchRoutines();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>"Oops! Something went wrong. Please try again later!"</p>;
    }

    return (
        <div className="routine-page">
            <h1 className="page-title">Keep motivated, bro! Stay consistent and achieve your goals!</h1>
            <div className="routine-cards">
                {routines.map(routine => (
                    <div className="routine-card" key={routine._id}>
                        <h2 className="routine-name">{routine.name}</h2>
                        <p><strong>Workout:</strong> {routine.workout}</p>
                        <p><strong>Body Part:</strong> {routine.bodyPart}</p>
                        <p><strong>Total Duration:</strong> {routine.totalDuration} mins</p>
                        <p><strong>Date Added:</strong> {new Date(routine.date).toLocaleDateString()}</p>
                        <Link className="routine-link" to={`/your-routines/${routine._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoutinePage;
