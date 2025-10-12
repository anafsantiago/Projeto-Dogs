import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import styles from "./LoginForm.module.css";
import stylesButton from "../Forms/Button.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Erro from "../Helper/Erro";
import Head from "../Helper/Head";

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);

  const password = useForm();
  const username = useForm();

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validate() && username.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head
        title="Login"
        description="Página de login do site Dogs - Rede social para cachorros."
      />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          htmlFor="username"
          type="text"
          id="username"
          name="username"
          valueState={username.value}
          handleBlur={username.handleBlur}
          handleChange={username.handleChange}
          error={username.error}
        />
        <Input
          label="Senha"
          type="password"
          htmlFor="password"
          id="password"
          name="password"
          valueState={password.value}
          handleBlur={password.handleBlur}
          handleChange={password.handleChange}
          error={password.error}
        />

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Erro error={error && "Usuário e/ou senha inválidos"} />
      </form>
      <Link to="/login/perdeu" className={styles.perdeu}>
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui uma conta? Cadastre-se no site</p>
        <Link className={stylesButton.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
