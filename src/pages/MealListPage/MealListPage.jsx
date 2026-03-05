import React, { useState, useEffect } from "react";
import "./MealListPage.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const MealListPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`${API_URL}/data-meal/all-data-meals`);
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
    return <p>"Oops! Something went wrong. Please try again later!"</p>;
  }

  return (
    <div className="meal-list-container">
      <h1>Meal List</h1>
      <div className="meal-list">
        {meals.map((meal) => (
          <Link
            to={`/meals/${meal._id}`}
            key={meal._id}
            className="meal-item"
          >
            <div>
              <h2>{meal.name}</h2>
              {meal.image && <img src={meal.image} alt={meal.name} />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealListPage;