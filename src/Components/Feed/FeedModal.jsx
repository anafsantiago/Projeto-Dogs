import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(photo.id);
      const { response, json } = await request(url, options);
    }
    fetchPhoto();
  }, [photo, request]);

  function handleClick(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <section className={styles.modal} onClick={handleClick}>
      {error && <Erro error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </section>
  );
};

export default FeedModal;
