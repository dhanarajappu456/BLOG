import Post from "./components/Post";
import Header from "./components/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./errors/ErrorPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";

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
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/error" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
