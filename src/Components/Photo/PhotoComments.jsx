import React from "react";
import styles from "./PhotoComments.module.css";
import { COMMENT_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";
import PhotoCommentsForm from "./PhotoCommentsForm";

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
        <>
          {data.length > 0 &&
            data.map((item) => {
              return (
                <p>
                  <span className={styles.commentAuthor}>
                    {item.comment_author}:
                  </span>
                  {item.comment_content}
                </p>
              );
            })}

          <PhotoCommentsForm id={id} comments={comments} />
        </>
      )}
    </div>
  );
};

export default PhotoComments;
