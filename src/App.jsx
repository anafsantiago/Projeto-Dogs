import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Api from "./api/Api";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import LoginForm from "./Components/Login/LoginForm";
import LoginPasswordLost from "./Components/Login/LoginPasswordLost";
import LoginPasswordReset from "./Components/Login/LoginPasswordReset";
import LoginCreate from "./Components/Login/LoginCreate";
import { UserStorage } from "./UserContext";
import User from "./Components/User/User";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import UserStats from "./Components/User/UserStats";
import Feed from "./Components/Feed/Feed";
import UserPhotoPost from "./Components/User/UserPhotoPost";
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/*" element={<Login />}>
            <Route path="" element={<LoginForm />} />
            <Route path="criar" element={<LoginCreate />} />
            <Route path="perdeu" element={<LoginPasswordLost />} />
            <Route path="resetar" element={<LoginPasswordReset />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="conta/*"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Feed />} />
            <Route path="estatisticas" element={<UserStats />} />
            <Route path="postar" element={<UserPhotoPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="foto/:id" element={<Photo />} />
          <Route path="perfil/:user" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/*Para qualquer rota que não seja uma das especificadas, renderiza o componente NotFound*/}
        </Routes>
        <Footer />
      </UserStorage>
    </BrowserRouter>
  );
};

export default App;
