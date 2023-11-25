import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import Registerpage from "./pages/Registerpage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import PlacePage from "./pages/PlacePage";
import AccountPage from "./pages/AccountPage";
import BookingsPage from "./pages/BookingsPage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<Registerpage />}></Route>
          <Route path="/place/:id" element={<PlacePage />}></Route>
          <Route path="/account/:subpage?" element={<AccountPage />}></Route>
          <Route path="/account/bookings" element={<BookingsPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
