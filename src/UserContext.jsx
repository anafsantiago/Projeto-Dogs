import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null); //Estado que guarda os dados do usuário
  const [login, setLogin] = React.useState(null); //Verifica se o usuário está logado ou não
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLogin(false);
    setLoading(false);
    window.localStorage.removeItem("token");
  }, []);

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
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Usuário e/ou senha inválidos");
      }
      const json = await response.json();
      window.localStorage.setItem("token", json.token);
      await getUser(json.token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`Token Inválido`);
          }
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]); //Qualquer função ou estado criado do "lado de fora" da função precisa ser passado como dependência

  return (
    <UserContext.Provider
      value={{
        data,
        login,
        error,
        loading,
        userLogin,
        userLogout,
        setLoading,
        setError,
        setLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
