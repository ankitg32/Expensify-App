import React from 'react';
import {NavLink} from 'react-router-dom';

//if we don't want to use the client-side roouting then we can use the standard <a> tags
//but for client side routing, we use <Link> & <NavLink> named methods from the react-router-dom library
const Header = () => (
    <header>
        <h1>Expensify App</h1>
        <NavLink to="/" exact activeClassName="is-active">Dashboard</NavLink>
        <NavLink to="/create" exact activeClassName="is-active">Create Expense</NavLink>
        <NavLink to="/help" exact activeClassName="is-active">Help</NavLink>
    </header>
    );

export default Header;