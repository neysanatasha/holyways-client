import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./Pages/LandingPage";
import ProfilePage from "./Pages/ProfilePage";
import MakeRaiseFund from "./Pages/MakeRaiseFund";
import AddRaiseFundPage from "./Pages/AddRaiseFundPage";
import DetailDonatePage from "./Pages/DetailDonatePage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import {API, setAuthToken} from "./config/api";
import { useContext, useEffect } from "react";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext); // membuat atau memanggil useContext yang dimana state menampung UserContext
  console.log("ini state", state)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
  },[state])

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // return console.log("response check auth" , response.data.data)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []); 

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/detail-donation/:fund_id" element={<DetailDonatePage />} />
      <Route path="/raisefund" element={<MakeRaiseFund />} />
      <Route path="/add-raisefund" element={<AddRaiseFundPage />} />
    </Routes>
  );
}

export default App;
