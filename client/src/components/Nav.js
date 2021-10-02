import React from "react";
import { NavLink } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
function Nav() {
    return (
        <nav>
            <h3>dummy</h3>
            <div id="search">
                <input type="text" placeholder="Search" />
                <i frame id="search-icon"><GrSearch /></i>
            </div>
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/About">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to="/Contact">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;