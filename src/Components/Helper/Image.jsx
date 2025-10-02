import React from "react";
import styles from "./Image.module.css";

//Componente para criar o esqueleto da imagem, isto é, enquanto a imagem carrega, é mostrada uma espécie de animação cinza no lugar da imagem até que ela carregue por completo
//Isso melhora o carregamento da imagem
const Image = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    setSkeleton(false); //Quando a imagem é carregada, o esqueleto não aparecerá
    target.style.opacity = 1; //Ao ser carregada, a imagem aparecerá
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      {/*O evento onLoad é acionado apenas quando a imagem for 100% carregada*/}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
};

export default Image;
