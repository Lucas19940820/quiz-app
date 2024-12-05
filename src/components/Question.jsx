const Question = ({ question, options, onAnswer }) => (
  <div>
    <h2>{question}</h2>
    <ul>
      {options.map((option, index) => (
        <li key={index} onClick={() => onAnswer(option)}>
          {option}
        </li>
      ))}
    </ul>
  </div>
);
export default Question;
