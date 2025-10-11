import React from "react";
import styles from "./UserPhotoPost.module.css";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { PHOTO_POST } from "../../api";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Erro from "../Helper/Erro";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate("/conta");
    }
  }, [data, navigate]); //Se o data muda, significa que foi feita uma postagem de uma foto

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (nome.validate() && peso.validate() && idade.validate() && img) {
      const token = window.localStorage.getItem("token");
      const formData = new FormData(); //Precisa passar os dados como FormData por causa da imagem
      formData.append("nome", nome.value);
      formData.append("peso", peso.value);
      formData.append("idade", idade.value);
      formData.append("img", img.raw);
      const { url, options } = PHOTO_POST(token, formData);
      const { response, json } = await request(url, options);
    }
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head
        title="Poste sua foto"
        description="Página para postar fotos na conta do usuário da rede social Dogs"
      />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" id="nome" {...nome} />
        <Input label="Peso" type="number" id="peso" {...peso} />
        <Input label="Idade" type="number" id="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          id="img"
          name="img"
          placeholder="Escolher arquivo"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        {error && <Erro error={error} />}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
