import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./UserContext";
import Layout from "./components/Layout";
import ErrorPage from "./errors/ErrorPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SinglePost from "./pages/SinglePost";
import Test from "./pages/Test";

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
          <Route path="/test" element={<Test />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
