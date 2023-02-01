import React, { useState, useEffect } from "react";
import { uploadImg, deleteImg, getGallery } from "../../services/api";
import "./photo.css";

const Photo = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = () => {
    try {
      getGallery()
        .then((res) => {
          const photos = res.data;
          setSelectedImages(photos);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const upload = (img) => {
    try {
      const imgObj = { photo: img, id: new Date().getTime() };
      uploadImg(imgObj).then(() => {
        const arr = [...selectedImages];
        arr.push(imgObj);
        setSelectedImages(arr);
      });
    } catch (error) {
      console.log(error);
    }
  };

  function deleteHandler(imageId) {
    deleteImg(imageId)
      .then(() => fetchGallery())
      .catch((error) => console.log(error));
  }

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      upload(event.target.result);
    };
  };

  return (
    <>
    <h2 className="title-gallery">Top 10 cele mai bune lucrari</h2>
    <section>
      <label className="add-img">
        + Adauga Imagini
        <br />
        <span className="info-span">nu mai mult de 10 imagini</span>
        <input type="file" name="images" onChange={onFileChange} />
      </label>
      <br />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <p className="error">
            Ai depasit numarul maxim de imagini <br />
            <span>
              te rog sterge <b> {selectedImages.length - 10} </b> din ele!
            </span>
          </p>
        ) : (
          <button
            className="upload-btn"
            onClick={() => {
              console.log(selectedImages);
            }}
          >
            Adaugate {selectedImages.length} /10
          </button>
        ))}

      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={"photo-" + index} className="image">
                  <img src={image.photo} height="250" alt="..." />
                <button
                  className="delete-btn"
                  onClick={() => deleteHandler(image.id)}
                >
                  sterge
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
    </section>
    </>
  );
};

export default Photo;
