import React from "react";
import Cards from "@/Components/Cards/cards";
import Icon from "@/Components/icons/Icon";
import SearchBar from "@/Components/SearchBar/SearchBar";
import "./header.css";

export default function Header({
  searchPlaceholder = "Search for Clients, projects or freelancers..",
  searchValue,
  onSearchChange,
  onSearchSubmit,
  avatarInitial = "A",
  onBellClick,
  onMailClick,
  onAvatarClick,
  customSearchBar,
  customActions,
  headerCardClass = "",
}) {
  return (
    <Cards className={`header-card ${headerCardClass}`} padding="0">
      <header className="header">
        {customSearchBar ? (
          customSearchBar
        ) : (
          <SearchBar
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearchSubmit}
          />
        )}

        <div className="header-actions">
          {customActions ? (
            customActions
          ) : (
            <>
              <button className="icon-btn" onClick={onBellClick} aria-label="Notifications">
                <Icon name="Bell" size={18} />
              </button>
              <button className="icon-btn" onClick={onMailClick} aria-label="Messages">
                <Icon name="Mail" size={18} />
              </button>
              <div className="header-avatar" onClick={onAvatarClick}>
                {avatarInitial}
              </div>
            </>
          )}
        </div>
      </header>
    </Cards>
  );
}
