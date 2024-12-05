const SearchBar = ({ onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search questions..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
