import React from "react";
import styles from "./FeedPhotos.module.css";
import { PHOTOS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import FeedPhotosItem from "./FeedPhotosItem";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";

const FeedPhotos = ({ setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 }); //User: 0 significa que vai puxar de qualquer usuário e não de um específico
      const { response, json } = await request(url, options);
    }
    fetchPhotos();
  }, [request]);

  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <>
        <ul className={`${styles.feed} animeLeft`}>
          {data &&
            data.map((photo) => {
              return (
                <FeedPhotosItem
                  key={photo.id}
                  photo={photo}
                  setModalPhoto={setModalPhoto}
                />
              );
            })}
        </ul>
      </>
    );
  else return null;
};

export default FeedPhotos;
