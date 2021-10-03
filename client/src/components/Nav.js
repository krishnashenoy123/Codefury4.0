import React from "react";
import { NavLink } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
// import JSONDATA from '../MOCK_DATA.json';
import Filter  from '../components/Filter';
function Nav() {
    onInputClickHandler=()=>{
        // display:{display:'none'}
    }
    
    return (
        <nav>
            <h3>dummy</h3>
            <div id="search">
                <input type="text" placeholder="Search" onInput={()=>{}}/>
                <i frame id="search-icon" ><GrSearch /></i>
                {/*                 
                {JSONDATA.map((val, key)=>{
                    return (
                    <div> 
                        {val.name} 
                    </div>
                    );
                })}
                 */}
            </div>
            <Filter display= "display:'none'"/>
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