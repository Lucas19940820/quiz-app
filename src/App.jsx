import { useState } from 'react';
import Question from './components/Question';
import SearchBar from './components/SearchBar';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      question: "Which programming language is used for web apps?",
      options: ["Python", "JavaScript", "C++", "Ruby"],
      correct: "JavaScript",
    },
  ];

  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAnswer = (selectedOption) => {
    if (selectedOption === filteredQuestions[currentQuestion].correct) {
      alert("Correct!");
    } else {
      alert("Try Again!");
    }

    // Move to the next question
    setCurrentQuestion((prev) => (prev + 1) % filteredQuestions.length);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <SearchBar onSearch={setSearchTerm} />
      {filteredQuestions.length > 0 ? (
        <Question
          question={filteredQuestions[currentQuestion].question}
          options={filteredQuestions[currentQuestion].options}
          onAnswer={handleAnswer}
        />
      ) : (
        <p>No questions match your search.</p>
      )}
    </div>
  );
};

export default App;
