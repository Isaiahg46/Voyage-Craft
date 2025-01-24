import { useState, useEffect } from 'react';

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Array of sample image URLs
    const sampleImages = [
      'https://via.placeholder.com/300x200?text=Image+1',
      'https://via.placeholder.com/300x200?text=Image+2',
      'https://via.placeholder.com/300x200?text=Image+3',
      'https://via.placeholder.com/300x200?text=Image+4',
      'https://via.placeholder.com/300x200?text=Image+5',
    ];

    // Shuffle and pick three random images
    const shuffledImages = sampleImages.sort(() => 0.5 - Math.random()).slice(0, 3);
    setImages(shuffledImages);
  }, []);

  return (
    <section className="home">
      <h2>Discover Your Next Destination</h2>
      <p>Explore exciting travel destinations and tips.</p>
      <div className="image-row">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Travel destination ${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default Home;
