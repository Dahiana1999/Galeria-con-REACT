import { useEffect, useRef, useState } from "react";
import "./index.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';

const IMAGES_PER_PAGE = 30;


function App() {

  console.log('key', import.meta.env.VITE_API_KEY)
  const searchInput = useRef(null);
  
  const [images, setImages] = useState([]);
  const [Page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [Page]);

  //useEffect(() => {
  //const getImages = async () => {}
      
    //getImages();
  //}, []);//


  const fetchImages = async () => {

    try {
      const {data} = await axios.get(`${API_URL}?query=${
        searchInput.current.value
        }&page=${Page}&per_page=${IMAGES_PER_PAGE}&client_id=${
        import.meta.env.VITE_API_KEY}`);
    
        setImages(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
    fetchImages();
    setPage(1);
  };
  
  

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    fetchImages();
    setPage(1);
  };
  

  return (
    <div className="container">
      <h1 className="title">Galería</h1>
      <div className="search-section">
        <Form onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Busca algo"
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>
      <div className="filters">
        <div onClick={() => handleSelection ('Naturaleza')}>Naturaleza</div>
        <div onClick={() => handleSelection ('Paisajes')}>Paisajes</div>
        <div onClick={() => handleSelection ('Tecnologia')}>Tecnología</div>
        <div onClick={() => handleSelection ('Animales')}>Animales</div>
        <div onClick={() => handleSelection ('Flores')}>Flores</div>
      </div>
      <div className="images">
        {images.map((image) => (
            <img 
            key={image.id} 
            src={image.urls.small} 
            alt={image.alt_description} 
            className="image"
            />
          ))}
      </div>
      <div className="buttons">
        {
          Page > 1 && 
          <Button onClick={() => setPage(Page - 1)}>Anterior</Button>
        }
        {
          Page < totalPages && 
          <Button onClick={() => setPage(Page + 1)}>Siguiente</Button>
        }
      </div>
    </div>
  );
}

export default App;
