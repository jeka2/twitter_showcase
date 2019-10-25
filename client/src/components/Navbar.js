import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        }
    }

    handleToggle = () => {
        this.setState(prevState => {
            return { isOpen: !prevState.isOpen, };
        })
    }

    render() {
        return (
            <nav className="navbar">
                <span className="home-link">
                    <Link to="/">Home</Link>
                </span>
                <span className="user-search-link">
                    <Link to="/search">Search</Link>
                </span>
                <span className="random-tweet-link">
                    <Link to="/random">Random</Link>
                </span>
            </nav>
        );
    }
}