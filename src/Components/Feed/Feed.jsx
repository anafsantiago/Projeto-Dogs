import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import { useOutletContext } from "react-router-dom";

const Feed = () => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const user = useOutletContext(); //Recebe o user que é passado como contexto do outlet

  return (
    <div style={{ position: "relative" }}>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      <FeedPhotos user={user} setModalPhoto={setModalPhoto} />
    </div>
  );
};

export default Feed;
