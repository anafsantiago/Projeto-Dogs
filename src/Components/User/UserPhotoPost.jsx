import React from "react";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Erro from "../Helper/Erro";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("peso");
  const idade = useForm("idade");
  const img = useForm();
  const [erroEnvio, setErroEnvio] = React.useState("");

  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(img.value.name);
    if (
      nome.validate() &&
      peso.validate() &&
      idade.validate() &&
      img.validate()
    ) {
      const token = window.localStorage.getItem("token");
      const formData = new FormData();
      formData.append("nome", nome.value);
      formData.append("peso", peso.value);
      formData.append("idade", idade.value);
      formData.append("img", img.value);

      const { url, options } = PHOTO_POST(token, formData);
      const { response, json } = await request(url, options);
    } else {
      setErroEnvio("Dados incompletos");
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          type="text"
          id="nome"
          valueState={nome.value}
          handleBlur={nome.handleBlur}
          handleChange={nome.handleChange}
          error={nome.error}
        />
        <Input
          label="Peso"
          type="number"
          id="peso"
          valueState={peso.value}
          handleBlur={peso.handleBlur}
          handleChange={peso.handleChange}
          error={peso.error}
        />
        <Input
          label="Idade"
          type="number"
          id="idade"
          valueState={idade.value}
          handleBlur={idade.handleBlur}
          handleChange={idade.handleChange}
          error={idade.error}
        />
        <input
          type="file"
          htmlFor="arquivo"
          id="arquivo"
          name="arquivo"
          placeholder="Escolher arquivo"
          onChange={({ target }) => img.setValue(target.files[0])}
        />
        {loading ? <Button>Enviando...</Button> : <Button>Enviar</Button>}
        {erroEnvio && <Erro error={erroEnvio} />}
      </form>
    </section>
  );
};

export default UserPhotoPost;
