import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CreateMeal from "../../components/CreateMeal/CreateMeal";
import CreateRoutine from "../../components/CreateRoutine/CreateRoutine";
import { AuthContext } from "../../context/auth.context";
import EditMeal from "../../components/EditMeal/EditMeal";
import EditRoutine from "../../components/EditRoutine/EditRoutine";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import "./UserRoutinePage.css";

const API_URL = import.meta.env.VITE_API_URL;

const UserRoutinePage = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [meals, setMeals] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [editRoutineId, setEditRoutineId] = useState(null);
  const [editMealId, setEditMealId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/auth/profile`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setRoutines(data.currentRoutine);
        setMeals(data.currentMeal);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (!isLoading && currentUser) {
      fetchUserDetails();
    }
  }, [isLoading, currentUser]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleMealCreated = (newMeal) => {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
    setShowCreateMeal(false);
  };

  const handleRoutineCreated = (newRoutine) => {
    setRoutines((prevRoutines) => [...prevRoutines, newRoutine]);
    setShowCreateRoutine(false);
  };

  const handleEditRoutine = (routineId) => {
    setEditRoutineId(routineId);
  };

  const handleEditMeal = (mealId) => {
    setEditMealId(mealId);
  };

  const handleCancelEdit = () => {
    setEditRoutineId(null);
  };

  const handleCancelEditMeal = () => {
    setEditMealId(null);
  };

  const handleMealUpdated = (updatedMeal) => {
    const updatedMeals = meals.map((meal) =>
      meal._id === updatedMeal._id ? updatedMeal : meal
    );
    setMeals(updatedMeals);
    setEditMealId(null);
  };

  const handleRoutineUpdated = (updatedRoutine) => {
    const updatedRoutines = routines.map((routine) =>
      routine._id === updatedRoutine._id ? updatedRoutine : routine
    );
    setRoutines(updatedRoutines);
    setEditRoutineId(null);
  };

  const handleDeleteMeal = async (mealId) => {
    try {
      await axios.delete(`${API_URL}/meals/delete-meal/${mealId}`);
      setMeals((prevMeals) => prevMeals.filter((meal) => meal._id !== mealId));
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    try {
      await axios.delete(`${API_URL}/routines/delete-routine/${routineId}`);
      setRoutines((prevRoutines) =>
        prevRoutines.filter((routine) => routine._id !== routineId)
      );
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  const filterEntriesByDate = (entries) => {
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date).toDateString();
      const selectedDateString = selectedDate.toDateString();
      return entryDate === selectedDateString;
    });
  };

  const filteredMeals = filterEntriesByDate(meals);
  const filteredRoutines = filterEntriesByDate(routines);

  console.log("Meals:", meals);  // Debug log
  console.log("Filtered Meals:", filteredMeals);  // Debug log
  console.log("Routines:", routines);  // Debug log
  console.log("Filtered Routines:", filteredRoutines);  // Debug log

  if (isLoading) return <div>Loading...</div>;
  if (!currentUser) return <div>Please log in to view your routines.</div>;

  return (
    <div className="user-routine-page">
      <h1 className="page-title">Your Routine</h1>

      <div className="calendar-and-entries">
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>

        <div className="entries-container">
          <div className="routine-links">
            <button className="btn btn-add btn-add-meal" onClick={() => setShowCreateMeal(true)}>Add Meal</button>
            <button className="btn btn-add btn-add-routine" onClick={() => setShowCreateRoutine(true)}>Add Routine</button>
          </div>

          <div className="user-entries">
            <h2 className="entries-title">Meals and Routines for {selectedDate.toDateString()}</h2>
            <div className="entries">
              <div className="entries-section">
                <h3>Meals</h3>
                <ul>
                  {filteredMeals.length > 0 ? (
                    filteredMeals.map((meal) => (
                      <li key={meal._id}>
                        {meal.name}
                        <button className="btn btn-edit btn-edit-meal" onClick={() => handleEditMeal(meal._id)}>Edit</button>
                        <button className="btn btn-delete btn-edit-routine" onClick={() => handleDeleteMeal(meal._id)}>Delete</button>
                      </li>
                    ))
                  ) : (
                    <p>No meals available</p>
                  )}
                </ul>
              </div>
              <div className="entries-section">
                <h3>Routines</h3>
                <ul>
                  {filteredRoutines.length > 0 ? (
                    filteredRoutines.map((routine) => (
                      <li key={routine._id}>
                        {routine.name}{" "}
                        <button className="btn btn-edit" onClick={() => handleEditRoutine(routine._id)}>Edit</button>
                        <button className="btn btn-delete" onClick={() => handleDeleteRoutine(routine._id)}>Delete</button>
                      </li>
                    ))
                  ) : (
                    <p>No routines available</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showCreateMeal} handleClose={() => setShowCreateMeal(false)}>
        <CreateMeal
          setOpen={setShowCreateMeal}
          onMealCreated={handleMealCreated}
          selectedDate={selectedDate}
        />
      </Modal>

      <Modal show={showCreateRoutine} handleClose={() => setShowCreateRoutine(false)}>
        <CreateRoutine
          setOpen={setShowCreateRoutine}
          onRoutineCreated={handleRoutineCreated}
          selectedDate={selectedDate}
        />
      </Modal>

      {editRoutineId && (
        <Modal show={editRoutineId !== null} handleClose={handleCancelEdit}>
          <div className="edit-routine-form">
            <h2>Edit Routine</h2>
            <EditRoutine
              routineId={editRoutineId}
              onCancel={handleCancelEdit}
              onRoutineUpdated={handleRoutineUpdated}
            />
          </div>
        </Modal>
      )}

      {editMealId && (
        <Modal show={editMealId !== null} handleClose={handleCancelEditMeal}>
          <div className="edit-meal-form">
            <h2>Edit Meal</h2>
            <EditMeal
              mealId={editMealId}
              onCancel={handleCancelEditMeal}
              onMealUpdated={handleMealUpdated}
            />
          </div>
        </Modal>
      )}

      <Link className="link" to="/your-meals">Check All Added Meals</Link>
      <Link className="link" to="/your-routines">Check All Added Routines</Link>
    </div>
  );
};

export default UserRoutinePage;
