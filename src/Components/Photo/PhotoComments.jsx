import React from "react";
import styles from "./PhotoComments.module.css";
import PhotoCommentsForm from "./PhotoCommentsForm";
import { UserContext } from "../../UserContext";

const PhotoComments = ({ id, comments }) => {
  const { login } = React.useContext(UserContext);
  const commentSection = React.useRef();
  const [userComments, setUserComments] = React.useState(() => comments);

  //Mostra os últimos comentários sempre que o userComments mudar, ou seja, ao entrar e sempre que um novo comentário for adicionado
  React.useEffect(() => {
    commentSection.current.scrollTop = commentSection.current.scrollHeight;
  }, [userComments]);

  return (
    <>
      <ul ref={commentSection} className={styles.comments}>
        {userComments.map((comment) => {
          return (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}:</b>
              <span>{comment.comment_content}</span>
            </li>
          );
        })}
      </ul>
      {login && <PhotoCommentsForm id={id} setUserComments={setUserComments} />}
    </>
  );
};

export default PhotoComments;
