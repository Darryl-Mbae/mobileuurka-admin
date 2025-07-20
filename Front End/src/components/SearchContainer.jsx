import React, { useState, useCallback } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import "../css/SearchContainer.css";

const SearchContainer = ({
  placeholder = "Search...",
  onSearch,
  onAdd,
  addButtonText = "Add",
  searchValue = "",
  onSearchChange,
  showAddButton = true, // New prop to control Add button visibility
  className = "",
  disabled = false,
}) => {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setLocalSearchValue(value);

      if (onSearchChange) {
        onSearchChange(value);
      }

      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch, onSearchChange]
  );

  const handleAddClick = useCallback(() => {
    if (onAdd && !disabled) {
      onAdd();
    }
  }, [onAdd, disabled]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(localSearchValue);
      }
    },
    [onSearch, localSearchValue]
  );

  return (
    <div className={`search-container ${className}`}>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder={placeholder}
            value={localSearchValue}
            onChange={handleSearchChange}
            disabled={disabled}
          />
        </div>
      </form>
      {showAddButton && (
        <button
          type="button"
          className={`add-button ${disabled ? "disabled" : ""}`}
          onClick={handleAddClick}
          disabled={disabled}
        >
          <FiPlus className="add-icon" />
          <span>{addButtonText}</span>
        </button>
      )}
    </div>
  );
};

export default SearchContainer;
