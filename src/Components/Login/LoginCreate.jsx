import React from "react";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button";
import Erro from "../Helper/Erro";
import { UserContext } from "../../UserContext";
import { USER_POST } from "../../api";

const LoginCreate = () => {
  const username = useForm();
  const password = useForm("password");
  const email = useForm("email");

  const context = React.useContext(UserContext);
  const requestApi = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = await requestApi.request(url, options);
      if (response.ok) {
        await context.userLogin(username.value, password.value);
      }
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          htmlFor="username"
          type="text"
          name="username"
          id="username"
          {...username}
        />
        <Input
          label="Email"
          htmlFor="email"
          type="email"
          name="email"
          id="email"
          {...email}
        />
        <Input
          label="Senha"
          htmlFor="password"
          type="password"
          name="password"
          id="password"
          {...password}
        />
        {requestApi.loading ? (
          <Button disabled>Cadastrar</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Erro error={requestApi.error} />
      </form>
    </section>
  );
};

export default LoginCreate;
