import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    correctQuestions,
    index,
    questions,
    handleNextQuestion,
    checkAnwers,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];
  //  const answers = [...incorrect_answers, correct_answer];
  const answers = [...incorrect_answers];
  
  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correctQuestions}/{index}
        </p>

        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} /> {/* how to converthtml to string or convert html string to jsx */}
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  className="answer-btn"
                  key={index}
                  onClick={() => checkAnwers(answer === correct_answer)} //if my answer chosen is equal to the correct answer from my api,add 1 to the correct question  else move to the next quesstion
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={handleNextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
