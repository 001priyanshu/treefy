import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";
const Navbar = () => {
    // const user = localStorage.getItem("jwt");
    const [user, setUser] = useState("")
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        const User = JSON.parse(localStorage.getItem("user"));
        dispatch({ type: "USER", payload: user });
        setUser(User)
    }, [localStorage.getItem("user")]);
    return (
        <nav>
            <nav>
                <div class="nav-wrapper">
                    <a href="/" class="brand-logo">Treefy</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        {!user ? (<div>
                            <li><a href="/signin">Login</a></li>
                            <li><a href="/signup">Sign Up</a></li>
                        </div>) :
                            (<div>
                                <li><a href="/createpost">Create Post</a></li>
                                <li><button className="btn #c62828 red darken-3" onClick={() => {
                                    localStorage.clear();
                                    navigate("/signin");
                                }} >Log Out</button></li>
                            </div>)
                        }

                    </ul>
                </div>
            </nav>




        </nav>
    );
};

export default Navbar;
