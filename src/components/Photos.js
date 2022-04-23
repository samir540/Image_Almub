import React, { useEffect, useState } from "react";
import classes from "./photos.module.css";
import Modal from "./Modal";

const Photos = ({ photos, loading }) => {
  // handling remove photo
  const [photosList, setPhotosList] = useState([]);


  useEffect(() => {
    setPhotosList(photos);
  }, [photos]);

  const removeHandler = (id) => {
    const filtered = photosList.filter((photo) => photo.id !== id);
    setPhotosList(filtered);
  };
  // handling modal
  const [open, setOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState([]);
  const openModalHandler = (id) => {
    setOpen(true);
    const filtered = photosList.filter((photo) => photo.id === id);
    setModalPhoto(filtered);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.photos} >
        {photosList &&
          photosList.map((photo) => (
            <div key={photo.id} className={classes.photoBox}>
              <div className={classes.photoBox__frame}>
                <img
                  src={photo.thumbnailUrl}
                  title={photo.title}
                  onClick={() => openModalHandler(photo.id)}
                />
              </div>
              {open && <Modal url={modalPhoto[0].url} onClose={onClose} />}

              <button onClick={() => removeHandler(photo.id)}>
                remove photo
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Photos;
