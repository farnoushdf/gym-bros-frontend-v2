import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import mealService from '../../services/meal.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const CreateMeal = ({ setOpen, onMealCreated, selectedDate }) => {
  const { currentUser } = useContext(AuthContext);
  const [name, setMealName] = useState('');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newMeal = {
      name,
      description,
      calories: Number(calories),
      ingredients,
      date: new Date(selectedDate).toISOString(), // Ensure the date is correctly formatted
    };

    try {
      setIsDisabled(true);
      const response = await mealService.createMeal(newMeal, currentUser._id);
      onMealCreated(response.data);
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error creating meal');
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleAddIngredient = () => {
    if (ingredients.length < 5) {
      setIngredients([...ingredients, '']);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <div>
      <div>
        <FontAwesomeIcon icon={faUtensils} />
        <form onSubmit={handleSubmit}>
          <div>
            <label>Meal Name:</label>
            <select
              value={name}
              onChange={(e) => setMealName(e.target.value)}
              disabled={isDisabled}
            >
              <option value="">Select Meal Type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isDisabled}
              placeholder="Enter meal description"
            />
          </div>

          <div>
            <label>Calories:</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              disabled={isDisabled}
              placeholder="Enter calories"
            />
          </div>

          <div>
            <label>Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                disabled={isDisabled}
                placeholder={`Ingredient ${index + 1}`}
              />
            ))}
            {ingredients.length < 5 && (
              <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
              </button>
            )}
          </div>

          <div>
            <p className="error-message">{errorMessage && errorMessage}</p>
            <button type="submit" disabled={isDisabled}>
              Save
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;
