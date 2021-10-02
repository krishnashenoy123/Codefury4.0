import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
    return(
        <nav>
            <h3>dummy</h3>
            <ul>
                <li>
                    <NavLink exact activeClassName="active" to = "/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to = "/About">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink exact activeClassName="active" to = "/Contact">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;