import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import styles from "./LoginForm.module.css";
import foto from "../../Assets/login.jpg";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import { TOKEN_POST, USER_GET } from "../../api";

const LoginForm = () => {
  const password = useForm();
  const username = useForm();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      getUser(token);
    }
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.validate() && username.validate()) {
      const { url, options } = TOKEN_POST({
        username: username.value,
        password: password.value,
      });
      const response = await fetch(url, options);
      const json = await response.json();
      window.localStorage.setItem("token", json.token);
      getUser(json.token);
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
            <Button>Entrar</Button>
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
