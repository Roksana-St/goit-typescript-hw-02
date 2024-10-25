import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageModal from '../ImageModal/ImageModal'; 
import { fetchImages } from '../../api/unsplashAPI';
import { UnsplashImage } from '../../types';
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';

const App = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.results]);
        setTotalImages(data.total);
      } catch (error) {
        setError('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <p>{error}</p>}
      <ImageGallery images={images} onImageClick={openModal} /> 
      {loading && <Loader />}
      {images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      <Toaster position="top-right" />
      
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          imageUrl={selectedImage!}
          alt="Selected image"
        />
      )}
    </div>
  );
};

export default App;
