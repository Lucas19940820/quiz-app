import { useState, useEffect } from "react";
import Question from "./components/Question";
import SearchBar from "./components/SearchBar";
import Timer from "./components/Timer";
import axios from "axios";
import './index.css';


const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("9");
  const [categories, setCategories] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://opentdb.com/api_category.php");
        setCategories(response.data.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
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

    if (category) {
      fetchQuestions();
    }
  }, [category]);

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
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setQuizFinished(false);
    setCategory("9");
    setTimerStarted(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Quiz Finished!</h1>
        <p className="text-xl">Your final score: {score}/{filteredQuestions.length}</p>
        <button
          onClick={restartQuiz}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-6">Nyiko Quiz App</h1>

      {/* Category Selection Dropdown */}
      <div className="mb-4">
        <select
       
       onChange={(e) => {
         setCategory(e.target.value);
         setTimerStarted(true);
       }}
       value={category}
       className="border p-2 rounded-md text-blue-900"
     >
       {categories.map((category) => (
         <option key={category.id} value={category.id}>
           {category.name}
         </option>
       ))}
     </select>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Display Questions */}
      {filteredQuestions.length > 0 ? (
        <>
          {timerStarted && (
            <Timer
              initialTime={120}
              onTimeUp={() => {
                alert("Time's up!");
                handleNextQuestion();
              }}
            />
          )}
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
