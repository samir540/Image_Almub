import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";
//Components
import Photos from "./components/Photos";
import Pagination from "./components/Pagination";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoPerPage] = useState(10);
  const [albumsId, setAlbumsId] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [openAlbum, setOpenAlbum] = useState(false);

  useEffect(() => {
    //data fetching
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("http://jsonplaceholder.typicode.com/photos");
      const slicedPhotos = res.data.slice(0, 100);

      setPhotos(slicedPhotos);
    };
    fetchData();
    setLoading(false);
  }, []);

  useEffect(() => {
    // sorting
    const ambulsIds = photos.map((photo) => photo.albumId);
    let uniqueChars = [...new Set(ambulsIds)];

    setAlbumsId(uniqueChars);
  }, [photos]);

  const indexOfLastPhoto = currentPage * photoPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photoPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const currentPhotosAlbum = sorted.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const soritngHandler = (id) => {
    const sortedAlbum = photos.filter((photo) => photo.albumId === id);
    setSorted(sortedAlbum);
    setOpenAlbum(true);
  };

  const paginateHandler = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="App container">
      <nav className="album ">
        Albums:
        <ul className="pagination">
          {albumsId.map((id) => (
            <li className="page-item" key={id}>
              <a
                href="!#"
                className="page-link"
                onClick={() => soritngHandler(id)}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {!openAlbum && <Photos loading={loading} photos={currentPhotos} />}

      {openAlbum && <Photos loading={loading} photos={currentPhotosAlbum} />}

      <Pagination
        totalPhotos={openAlbum ? sorted.length : photos.length}
        photosPerPage={photoPerPage}
        paginate={paginateHandler}
      />
    </div>
  );
}

export default App;
