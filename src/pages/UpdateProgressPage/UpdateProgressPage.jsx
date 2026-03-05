import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import "./UpdateProgressPage.css";
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const UpdateProgressPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    water: "",
    weight: "",
    workout: "",
    sleep: "",
    walk: "",
  });

  const [message, setMessage] = useState("");

  const units = {
    water: "ml",
    weight: "kg",
    workout: "hours",
    sleep: "hours",
    walk: "meters",
  };

  const limits = {
    water: 5000,
    weight: 300,
    workout: 24,
    sleep: 24,
    walk: 50000,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formState) {
      if (formState[key] > limits[key]) {
        setMessage(
          `The value for ${key} exceeds the limit of ${limits[key]} ${units[key]}.`
        );
        return;
      }
    }

    try {
      const response = await axios.post(
        `${API_URL}/updateProgress/create-progress`,
        {
          ...formState,
          userId: currentUser._id,
        }
      );
      setFormState(response.data);
      setMessage("Progress updated successfully!");
      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Error posting progress:", error);
      setMessage("Error posting progress.");
    }

    navigate("/progress");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: parseFloat(value) || "",
    }));
    setMessage("");
  };

  return (
    <div className="update-progress-page">
      <h1>Update Progress</h1>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        {Object.keys(formState).map((key) => (
          <InputGroup className="mb-3" key={key}>
            <InputGroup.Text>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </InputGroup.Text>
            <Form.Control
              type="number"
              name={key}
              value={formState[key]}
              onChange={handleChange}
              placeholder={`Enter ${key} (0 to ${limits[key]} ${units[key]})`}
            />
            <InputGroup.Text>{units[key]}</InputGroup.Text>
          </InputGroup>
        ))}

        <Button type="submit">Update Progress</Button>
      </Form>
    </div>
  );
};

export default UpdateProgressPage;
