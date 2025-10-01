import React from "react";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import styles from "./PhotoCommentsForm.module.css";
import Enviar from "../../Assets/enviar.svg?react";
import Erro from "../Helper/Erro";

const PhotoCommentsForm = ({ id, setUserComments }) => {
  const { error, request } = useFetch();
  const [comment, setComment] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, token, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      setUserComments((userComments) => [...userComments, json]);
    }
  }
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          id="comments"
          name="comments"
          placeholder="Comente..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button className={styles.button}>
          <Enviar />
        </button>
        <Erro error={error} />
      </form>
    </div>
  );
};

export default PhotoCommentsForm;
