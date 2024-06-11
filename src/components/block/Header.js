import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth/AuthProvider";
import { request } from '../../helpers/axios_helper';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    const { isAuthenticated, logout } = useAuth();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 0) {
                try {
                    const response = await request('get', `/good/search-suggestions?query=${query}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error("There was an error fetching search suggestions!", error);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [query]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await request('get', `/good/search?query=${query}`);
            if (response.data !== "") {
                const goodId = response.data;
                setSuggestions([]);
                navigate(`/good/${goodId}`);
            } else {
                console.log("No results found");
            }
        } catch (error) {
            console.error("There was an error searching for goods!", error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSuggestions([]);
        setQuery(suggestion);
    };
    return (
        <header className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/"
                       className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                             fill="currentColor" className="bi me-2">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.25-11.03c-.18.19-.3.44-.3.72v6.62c0 .28.22.5.5.5s.5-.22.5-.5v-5.2l3.75 3.75c.2.2.51.2.71 0s.2-.51 0-.71L12.48 8.76c-.2-.2-.51-.2-.71 0l-4.48 4.48c-.2.2-.2.51 0 .71s.51.2.71 0L11 10.88v5.2c0 .28.22.5.5.5s.5-.22.5-.5v-6.62c0-.28-.12-.53-.3-.72z"/>
                        </svg>
                    </a>

                    {/* Search */}
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <form className="d-flex col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 position-relative" role="search" onSubmit={handleSearch}>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search..."
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)
                            }

                            />
                            <button type="submit" className="btn btn-primary">Search</button>
                            {suggestions.length > 0 && (
                                <ul className="dropdown-menu show position-absolute" style={{ top: '100%', left: 0, right: 0 }}>
                                    {suggestions.map((suggestion, index) => (
                                        <li key={index} className="dropdown-item"  onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </form>
                    </ul>

                    {isAuthenticated && (
                        <a href="/profile/card">
                            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                     className="bi bi-cart" viewBox="0 0 16 16">
                                    <path fill="black"
                                          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                            </form>
                        </a>
                    )}

                    {/* Profile */}
                    <div className="dropdown text-end" data-bs-auto-close="outside">
                        <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                           data-bs-toggle="dropdown" aria-expanded="true">
                            <i className="fas fa-user-circle fa-3x"></i>
                        </a>
                        <ul className="dropdown-menu text-small">
                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <a className="dropdown-item" href="/profile">Profile</a>
                                    </li>
                                    <hr className="dropdown-divider"/>
                                    <li>
                                        <button className="dropdown-item" onClick={logout}>Sign out</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <a className="dropdown-item" href="/log-in">Log in</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/sign-in">Sign up</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
