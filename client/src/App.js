import Post from "./Post";
import Header from "./Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/errors/ErrorPage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/*The nested route in the layout is passed as the outlet defined 
      in the Layout.js 
      Thus keeping the layout for all the page
      
      * remember the child url must be parent  route url+ something
      
      */}

        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/error" element={<ErrorPage />}></Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
