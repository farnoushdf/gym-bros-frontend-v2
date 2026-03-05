import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mealService from '../../services/meal.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const YourMealDetailsPage = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await mealService.fetchOneMeal(id);
                setMeal(response.data);
            } catch (error) {
                setError("Oops! Something went wrong. Please try again later!"); 
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>"Oops! Something went wrong. Please try again later!"</p>;
    }

    if (!meal) {
        return <p>Meal not found!</p>;
    }

    return (
        <div>
            <h2>{meal.name}</h2>
            <p>Description: {meal.description}</p>
            <p>Calories: {meal.calories}</p>
            <p>Ingredients: {meal.ingredients.join(', ')}</p>
            <p>Added on: {new Date(meal.date).toLocaleDateString()}</p>  
            <button onClick={() => navigate('/your-routines')}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>     
        </div>
    );
};

export default YourMealDetailsPage;
