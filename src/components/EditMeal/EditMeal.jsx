import React, { useState, useEffect } from "react";
import mealService from "../../services/meal.service";

const EditMeal = ({ mealId, onCancel, onMealUpdated }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await mealService.fetchOneMeal(mealId);
        const { name, calories, description } = response;
        setName(name);
        setCalories(calories);
        setDescription(description);
      } catch (error) {
        console.error('Error fetching meal details:', error);
        setErrorMessage("Oops! Something went wrong. Please try again later!");
      }
    };

    fetchMealDetails();
  }, [mealId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedMeal = {
      name,
      calories,
      description,
    };

    try {
      const response = await mealService.updateMeal(mealId, updatedMeal);
      onMealUpdated(response.data);
    } catch (error) {
      console.error('Error updating meal:', error);
      setErrorMessage('Error updating meal');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <label>Meal Name:</label>
      <select
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <option value="">Select Meal Type</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
        <option value="Other">Other</option>
      </select>
      <label>Calories:</label>
      <input
        type="number"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Update Meal</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditMeal;