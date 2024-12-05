import { useState, useEffect } from "react";
import Question from "./components/Question";
import SearchBar from "./components/SearchBar";
import Timer from "./components/Timer";
import axios from "axios";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
        );

        const formattedQuestions = response.data.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          correct: q.correct_answer,
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAnswer = (selectedOption) => {
    if (selectedOption === filteredQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizFinished(true); // End the quiz
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setQuizFinished(false);
  };

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (quizFinished) {
    return (
      <div>
        <h1>Quiz Finished!</h1>
        <p>Your final score: {score}/{filteredQuestions.length}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Quiz App</h1>
      <SearchBar onSearch={setSearchTerm} />
      {filteredQuestions.length > 0 ? (
        <>
          <Timer
            initialTime={120} // Set timer to 120 seconds
            onTimeUp={() => {
              alert("Time's up!");
              handleNextQuestion(); // Move to the next question when time is up
            }}
          />
          <Question
            question={filteredQuestions[currentQuestion].question}
            options={filteredQuestions[currentQuestion].options}
            onAnswer={handleAnswer}
          />
        </>
      ) : (
        <p>No questions match your search.</p>
      )}
    </div>
  );
};

export default App;
