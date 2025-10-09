import React from "react";
import { PASSWORD_RESET } from "../../api";
import useForm from "../../Hooks/useForm";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useFetch from "../../Hooks/useFetch";
import Erro from "../Helper/Erro";

const LoginPasswordReset = () => {
  const { data, loading, error, request } = useFetch();
  const [key, setKey] = React.useState("");
  const [login, setLogin] = React.useState("");
  const password = useForm("password");
  const navigate = useNavigate();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); //Instancia um objeto para capturar os parâmetros do search da URL
    const key = urlParams.get("key");
    const login = urlParams.get("login");
    if (key) {
      setKey(key); //Utiliza o método get do objeto urlParams para pegar o parâmetro key
    }
    if (login) {
      setLogin(login); //Utiliza o método get do objeto urlParams para pegar o parâmetro login
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        password: password.value,
        key,
      });
      const { response, json } = await request(url, options);
      if (response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <section>
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input id="password" type="password" label="Nova Senha" {...password} />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Erro error={error} />
    </section>
  );
};

export default LoginPasswordReset;
