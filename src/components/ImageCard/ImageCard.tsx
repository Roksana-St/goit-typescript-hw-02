import React from 'react';
import styles from './ImageCard.module.css';

interface ImageCardProps {
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, alt, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={alt} className={styles.image} />
    </div>
  );
};

export default ImageCard;
