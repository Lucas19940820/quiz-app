import { useState } from 'react';

const Question = ({ question, options, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (option) => {
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleClick(option)}
            className={`cursor-pointer p-2 transition-all duration-300 ${
              selected === option ? 'bg-blue-500 text-white animate-bounce' : ''
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
