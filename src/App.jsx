import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import UserRoutinePage from "./pages/UserRoutinePage/UserRoutinePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navbar from "./components/NavBar/NavBar";
import MealListPage from "./pages/MealListPage/MealListPage";
import IsPrivate from "./components/IsPrivate";
import MealDetailsPage from "./pages/MealDetailsPage/MealDetailsPage";
import YourMealPage from "./pages/YourMealPage/YourMealPage";
import YourMealDetailsPage from "./pages/YourMealDetailsPage/YourMealDetailPage";
import Footer from "./components/Footer/Footer";
import RoutinePage from "./pages/RoutinePage/RoutinePage";
import RoutineDetailsPage from "./pages/RoutineDetailsPage/RoutineDetailsPage";
import ProgressPage from "./pages/ProgressPage/ProgressPage";
import SetTargetPage from "./pages/SetTargetPage/SetTargetPage";
import UpdateProgressPage from "./pages/UpdateProgressPage/UpdateProgressPage";
import WorkoutListPage from "./pages/WorkoutListPage/WorkoutListPage";
import WorkoutDetailsPage from "./pages/WorkoutDetailsPage/WorkoutDetailsPage";


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <>
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserRoutinePage />
            </IsPrivate>
          }
        />
        <Route
          path="/meals"
          element={
            <IsPrivate>
              <MealListPage />
            </IsPrivate>
          }
        />

        <Route
          path="/meals/:id"
          element={
            <IsPrivate>
              <MealDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/your-meals"
          element={
            <IsPrivate>
              <YourMealPage />
            </IsPrivate>
          }
        />

        <Route
          path="/your-meals/:id"
          element={
            <IsPrivate>
              <YourMealDetailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/your-routines"
          element={
            <IsPrivate>
              <RoutinePage />
            </IsPrivate>
          }
        />
        <Route
          path="/your-routines/:id"
          element={
            <IsPrivate>
              <RoutineDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/progress"
          element={
            <IsPrivate>
              <ProgressPage />
            </IsPrivate>
          }
        />
        <Route
          path="/set-targets"
          element={
            <IsPrivate>
              <SetTargetPage />
            </IsPrivate>
          }
        />
        <Route
          path="/update-progress"
          element={
            <IsPrivate>
              <UpdateProgressPage />
            </IsPrivate>
          }
        />
        <Route path="/workouts-list" element={<WorkoutListPage />} />
        <Route path="/workouts/:id" element={<WorkoutDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;