import React from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ userProfile, conta }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const user = useOutletContext(); //Recebe o user que é passado como contexto do outlet
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true); //Define se deve ou não continuar puxando os valores e fazendo o scroll infinito

  //Scroll Infinito
  React.useEffect(() => {
    let wait = false; //Permite que o scroll não seja ativado diversas vezes seguidamente
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY; //Pega o total de scroll que já foi feito na página
        const height = document.body.offsetHeight - window.innerHeight; //Total de altura da página para fazer o scroll

        //Verifica se o scroll feito é maior do que 75% da altura
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => {
            return [...pages, pages.length + 1];
          }); //Adiciona mais itens na array, à medida que ocorre o scroll
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }
    window.addEventListener("scroll", infiniteScroll);
    window.addEventListener("wheel", infiniteScroll); //Efeito de rolar a bolinha do mouse
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  return (
    <div style={{ position: "relative" }}>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => {
        return (
          <FeedPhotos
            key={page}
            user={user || userProfile}
            page={page}
            setModalPhoto={setModalPhoto}
            setInfinite={setInfinite}
          />
        );
      })}
      {!infinite && !conta && (
        <p
          style={{
            color: "rgb(136, 136, 136)",
            textAlign: "center",
            padding: "2rem 0px 4rem",
          }}
        >
          Não existem mais postagens
        </p>
      )}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
  userProfile: 0,
};

Feed.propTypes = {
  userProfile: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Feed;
