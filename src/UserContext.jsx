import React from "react";
import { TOKEN_POST, USER_GET } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null); //Estado que guarda os dados do usuário
  const [login, setLogin] = React.useState(null); //Verifica se o usuário está logado ou não
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  //Faz uma chamada à API passando o token nos headers e recebendo um GET dos dados de usuário. Puxa o usuário
  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const json = await response.json(); //Valida o usuário, obtendo os dados dele
    setData(json); //Guarda os dados do usuário no estado "data"
    setLogin(true); //Indica que o usuário está logado
  }

  //Faz uma chamada à API fazendo um POST do login do usuário para pegar o token de acesso
  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });
    const response = await fetch(url, options);
    const json = await response.json();
    window.localStorage.setItem("token", json.token);
    getUser(json.token);
  }

  return (
    <UserContext.Provider value={{ data, login, userLogin }}>
      {children}
    </UserContext.Provider>
  );
};
