import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./MealDetailsPage.css"
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


const MealDetailsPage = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOneMealDetail = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/data-meal/one-data-meal/${id}`);
        setMeal(data);
      } catch (error) {
        setError("Oops! Something went wrong. Please try again later!");
      } finally {
        setLoading(false);
      }
    };

    fetchOneMealDetail();
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
    <div className="meal-details">
      <h2>{meal.name}</h2>
      <p>Description: {meal.description}</p>
      <p>Calories: {meal.calories}</p>
      <p>Ingredients: {meal.ingredients.join(", ")}</p>
      <p>Added on: {new Date(meal.date).toLocaleDateString()}</p>
      {meal.image && <img src={meal.image} alt={meal.name} />}
      <button onClick={() => navigate("/your-routines")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default MealDetailsPage;
