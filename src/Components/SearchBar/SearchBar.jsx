import React from "react";
import Icon from "@/Components/icons/Icon";
import "./searchbar.css";

export default function SearchBar({
  placeholder = "Search for Clients, projects or freelancers..",
  value,
  onChange,
  onSearch,
  className = "",
  iconSize = 15,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`header-search-bar ${className}`}>
      <Icon name="Search" size={iconSize} className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="search-input"
        {...props}
      />
    </div>
  );
}
