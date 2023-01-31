import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

// const url = "";

// const tempUrl =
//   "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true); //this is for the sign up form and when the signup question is filled,we would display the question afterwards
  const [loading, setLoading] = useState(false); //this is set to false cause we need to display our signup form before loading
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correctQuestions, setCorrectQuestions] = useState(0);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const response = await axios(url);
      const data = await response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setWaiting(true);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { amount, category, difficulty } = quiz;

    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`; //the table is used to reference the category because category in  the api is a number
    fetchQuestions(url);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true); //dispaly the setup form when the modal is closed
    setCorrectQuestions(0); //set the correct questions to zero that way it doesnt show
    setModalOpen(false);
  };

  const handleNextQuestion = () => {
    setIndex((prevIndex) => {
      const index = prevIndex + 1;
      if (index > questions.length - 1) {
        //open modal
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnwers = (value) => {
    //value is  true or false in app.js
    console.log(value);
    if (value) {
      setCorrectQuestions((oldState) => {
        return oldState + 1;
      });
    }
    handleNextQuestion();
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correctQuestions,
        error,
        modalOpen,
        handleNextQuestion,
        checkAnwers,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
