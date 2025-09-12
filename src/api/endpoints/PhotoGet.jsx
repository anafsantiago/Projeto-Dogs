import React from "react";

const PhotoGet = () => {
  const [id, setId] = React.useState("");
  const [foto, setFoto] = React.useState("");
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://dogsapi.origamid.dev/json/api/photo/${id}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setFoto(json.photo.src);
        return json;
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id}
          onChange={({ target }) => setId(target.value)}
        />
        <button>Enviar</button>
      </form>
      <div>
        <img
          style={{ display: "block", maxWidth: "600px" }}
          src={foto}
          alt="Cachorro da raça poodle de cor preta"
        />
      </div>
    </>
  );
};

export default PhotoGet;
