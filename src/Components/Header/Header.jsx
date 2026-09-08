import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cards from "@/Components/Cards/cards";
import Icon from "@/Components/icons/Icon";
import SearchBar from "@/Components/SearchBar/SearchBar";
import { useAuth } from "@/context/AuthContext";
import { showSnackbar } from "@/store";
import authApi from "@/features/auth/api/authApi";
import "./header.css";

export default function Header({
  searchPlaceholder = "Search for Clients, projects or freelancers..",
  searchValue,
  onSearchChange,
  onSearchSubmit,
  avatarInitial,
  onBellClick,
  onMailClick,
  onAvatarClick,
  customSearchBar,
  customActions,
  headerCardClass = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isClientFlow = location.pathname.startsWith("/client");
  const displayName = user?.name || (user?.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : null) || user?.email?.split("@")[0] || "My Account";
  const displayAvatar = avatarInitial || user?.avatar || displayName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAvatarClick = (e) => {
    if (onAvatarClick) {
      onAvatarClick(e);
    } else {
      setDropdownOpen((prev) => !prev);
    }
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    try {
      await authApi.logout().catch(() => {});
    } finally {
      logout();
      dispatch(showSnackbar({
        message: "You have been signed out.",
        type: "info",
      }));
      navigate("/login");
    }
  };

  return (
    <Cards className={`header-card ${headerCardClass}`} padding="0">
      <header className="header position-relative">
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
              
              <div className="position-relative" ref={dropdownRef}>
                <div
                  className="header-avatar"
                  onClick={handleAvatarClick}
                  title={displayName}
                >
                  {displayAvatar}
                </div>

                {dropdownOpen && (
                  <div className="header-dropdown-menu shadow-lg">
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name">{displayName}</div>
                      <div className="dropdown-user-email">{user?.email || "Signed in"}</div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate(isClientFlow ? "/client-settings/profile" : "/settings/profile");
                      }}
                    >
                      <Icon name="User" size={16} />
                      <span>Profile & Settings</span>
                    </button>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate(isClientFlow ? "/client-settings/account-security" : "/settings/account-security");
                      }}
                    >
                      <Icon name="ShieldCheck" size={16} />
                      <span>Account Security</span>
                    </button>
                    <div className="dropdown-divider"></div>
                    <button
                      type="button"
                      className="dropdown-item text-danger"
                      onClick={handleSignOut}
                    >
                      <Icon name="LogOut" size={16} color="#ef4444" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </Cards>
  );
}
