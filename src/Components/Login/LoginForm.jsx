import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import styles from "./LoginForm.module.css";
import foto from "../../Assets/login.jpg";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import { UserContext } from "../../UserContext";

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
    <section className={styles.login}>
      <div>
        <img src={foto} alt="Cachorro da raça Pug da cor preta" />
      </div>
      <div>
        <div className={styles.entrar}>
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>
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
            {error && <p>{error}</p>}
          </form>
          <Link to="perdeu" className={styles.perdeu}>
            Perdeu a Senha?
          </Link>
        </div>
        <div className={styles.cadastro}>
          <h2>Cadastre-se</h2>
          <p>Ainda não possui uma conta? Cadastre-se no site</p>
          <Link to="criar">
            {" "}
            <Button>Cadastro</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
