import React from "react";
import styles from "./FeedPhotos.module.css";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";

const FeedPhotos = () => {
  const { data, loading, error, request } = useFetch();
  const [imgSrc, setImgSrc] = React.useState([]);

  React.useEffect(() => {
    async function getPhoto() {
      const { url, options } = PHOTO_GET();
      const { response, json } = await request(url.endpoint.photos, options);
    }
    getPhoto();
  }, []);

  React.useEffect(() => {
    if (data) {
      const arrayImg = data.map((item) => {
        return item.src;
      });
      setImgSrc(arrayImg);
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;
  if (data)
    return (
      <div className={styles.feedPhotos}>
        {imgSrc &&
          imgSrc.map((item, index) => {
            return <img key={index} src={item} alt="" />;
          })}
      </div>
    );
};

export default FeedPhotos;
