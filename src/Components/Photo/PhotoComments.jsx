import React from "react";
import styles from "./PhotoComments.module.css";
import { COMMENT_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";

const PhotoComments = ({ id, comments }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function fetchGetComments() {
      const { url, options } = COMMENT_GET(id);
      const { response, json } = await request(url, options);
    }
    fetchGetComments();
  }, [comments, request]);

  return (
    <div>
      {error && <Erro error={error} />}
      {loading && <Loading />}
      {data && (
        <p>
          {data.length > 0 && (
            <span className={styles.commentAuthor}>
              {data[0].comment_author}:
            </span>
          )}
          {data.length > 0 && data[0].comment_content}
        </p>
      )}
    </div>
  );
};

export default PhotoComments;
