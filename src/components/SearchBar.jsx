const SearchBar = ({ onSearch }) => {
    return (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 border rounded-md text-blue-900"
        />
      </div>
    );
  };
  
  export default SearchBar;
  