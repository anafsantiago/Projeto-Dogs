import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = () => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [target, setTarget] = React.useState(null);

  React.useEffect(() => {
    function handleClickOut(event) {
      if (event.target !== target) {
        setModalPhoto(null);
      }
    }
    document.body.addEventListener("click", handleClickOut);
    return () => {
      document.body.removeEventListener("click", handleClickOut);
    };
  }, [modalPhoto]);

  return (
    <div style={{ position: "relative" }}>
      {modalPhoto && <FeedModal photo={modalPhoto} target={target} />}
      <FeedPhotos setModalPhoto={setModalPhoto} setTarget={setTarget} />
    </div>
  );
};

export default Feed;
