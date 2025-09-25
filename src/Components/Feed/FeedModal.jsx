import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(photo.id);
      const { response, json } = await request(url, options);
    }
    fetchPhoto();
  }, [request]);

  function handleClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <div className={styles.modal} onClick={handleClick}>
        <div className={styles.content}>
          <img src={data.photo.src} alt="" />
          <div className={styles.modalInfos}>
            <div className={styles.details}>
              <p>@{data.photo.author}</p>
              <p>{data.photo.acessos}</p>
            </div>
            <h1 className="title">{data.photo.title}</h1>
            <div className={styles.datas}>
              <p>{data.photo.peso} kg</p>
              <p>{data.photo.idade} anos</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default FeedModal;
