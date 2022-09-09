
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, createContext, useReducer, useContext } from "react";
import Signup from "./components/signup";
import Signin from "./components/Signin";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import NewPassword from "./components/Newpassword";
import Reset from "./components/reset";
import Navbar from "./components/navbar";
import { PostDetails } from "./components/PostDetails";
import { reducer, initialState } from "./reducers/userReducer";
export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({ type: "USER", payload: user });
    if (location.pathname.startsWith("/createpost") && !user) navigate("/signin");
  }, []);

  return (

    <>
      <Routes >
        <Route path="/" element={<Posts />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/reset/:token" element={<NewPassword />} />
        <Route path="/post/:id" element={<PostDetails />} />

      </Routes>
    </>
  );

};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
