import React from 'react'
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! Looks like you're lost in the gym.</p>
      <p className="not-found-suggestion">No worries, let's get you back on track!</p>
      <Link to="/profile" className="not-found-link">🏋️ Back to Your Routine 🏋️</Link>
    </div>
  );
}
export default NotFoundPage;