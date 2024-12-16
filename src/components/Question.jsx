import { useState } from 'react';

const Question = ({ question, options, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (option) => {
    setSelected(option);
    onAnswer(option);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{question}</h2>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleClick(option)}
            className={`cursor-pointer p-2 border rounded-md text-white-700 transition-all duration-300 
              ${selected === option ? 'bg-blue-500 text-white animate-bounce' : 'hover:bg-blue-100 hover:text-blue-700'}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
