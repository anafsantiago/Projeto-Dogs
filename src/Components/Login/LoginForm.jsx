import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import foto from "../../Assets/login.jpg";
import Input from "../Forms/Input";
import Button from "../Forms/Button";

const LoginForm = () => {
  const [username, setUsername] = React.useState("Ana");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
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
              value={username}
              setValue={setUsername}
            />
            <Input
              label="Senha"
              type="password"
              htmlFor="password"
              id="password"
              name="password"
              value={password}
              setValue={setPassword}
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
