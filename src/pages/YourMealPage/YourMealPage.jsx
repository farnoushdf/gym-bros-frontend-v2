import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './YourMealPage.css';

const API_URL = import.meta.env.VITE_API_URL;

const YourMealPage = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(`${API_URL}/meals/all-meals`);
                if (response.ok) {
                    const json = await response.json();
                    setMeals(json);
                } else {
                    setError("Oops! Something went wrong. Please try again later!");
                }
            } catch (error) {
                setError("Oops! Something went wrong. Please try again later!");
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Oops! Something went wrong. Please try again later!</p>;
    }

    return (
        <div className="meal-page">
            <h1 className="page-title">What Have You Been Eating So Far?</h1>
            <div className="meal-cards">
                {meals.map(meal => (
                    <div className="meal-card" key={meal._id}>
                        <h2 className="meal-name">{meal.name}</h2>
                        <p><strong>Description:</strong> {meal.description}</p>
                        <p><strong>Ingredients:</strong> {meal.ingredients.join(', ')}</p>
                        <p><strong>Date Added:</strong> {new Date(meal.date).toLocaleDateString()}</p>
                        <Link className="meal-link" to={`/your-meals/${meal._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YourMealPage;
