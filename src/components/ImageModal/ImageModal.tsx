import React from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root'); 

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  imageUrl: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, imageUrl, alt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={alt} className={styles.image} />
      </div>
    </Modal>
  );
};

export default ImageModal;
