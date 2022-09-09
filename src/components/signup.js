import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import('./Signin.css');


const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const uploadFields = () => {
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" });
                    navigate("/signin");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const PostData = () => {

        uploadFields();

    };

    return (
        <div className="mycard">
            <div class="card auth-card input-field signin-container">
                <h2>Treefy</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => PostData()}
                >
                    Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account ?</Link>
                </h5>
            </div>
        </div>
    );
};

export default Signup;
