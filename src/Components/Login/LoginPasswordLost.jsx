import React from "react";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../api";
import useForm from "../../Hooks/useForm";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Erro from "../Helper/Erro";
import Head from "../Helper/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"), //URL da página onde o usuário entra para resetar a senha
      });
      const { response, json } = await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head
        title="Perdeu a senha"
        description="Página para recuperar a senha do site Dogs - Rede social para cachorros."
      />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input id="login" type="text" label="E-mail / Usuário" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}
      <Erro error={error} />
    </section>
  );
};

export default LoginPasswordLost;
