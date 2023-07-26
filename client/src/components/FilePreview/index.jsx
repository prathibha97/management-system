/* eslint-disable no-shadow */
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function FilePreview({ fileToView }) {

  const handleOpenPdf = async () => {
    try {
      const response = await fetch(
        `http://34.217.133.161:5000/pdf?filepath=${fileToView}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className='border-2 p-3 ml-12' type="button" onClick={handleOpenPdf} >
        <div className='flex items-center gap-2'>
          <FontAwesomeIcon icon={faEye}/>
          <span>View</span>
        </div>
      </button>
    </div>
  );
}
export default FilePreview;


