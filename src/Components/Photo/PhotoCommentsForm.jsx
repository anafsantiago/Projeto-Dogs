import React from "react";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Enviar from "../../Assets/enviar.svg?react";

const PhotoCommentsForm = ({ id, comments }) => {
  const { data, error, loading, request } = useFetch();
  const [comment, setComment] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, token, { comment });
    const { response, json } = await request(url, options);
  }

  console.log(comments);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          id="comments"
          name="comments"
          placeholder="Comente..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button style={{ backgroundColor: "transparent", border: "none" }}>
          <Enviar />
        </button>
      </form>
    </div>
  );
};

export default PhotoCommentsForm;
