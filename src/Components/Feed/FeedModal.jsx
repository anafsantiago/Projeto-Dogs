import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";

const FeedModal = ({ photo }) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(photo.id);
      const { response, json } = await request(url, options);
    }
  }, []);

  return (
    <div className={styles.modal}>
      <img src={photo.src} alt="" />
    </div>
  );
};

export default FeedModal;
