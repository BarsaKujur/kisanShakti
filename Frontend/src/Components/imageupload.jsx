import React, { useState } from 'react'
 import { useDropzone } from 'react-dropzone';
import './Styles/imageUpload.css';

const imageupload = ({ onSubmit }) => {
    const [image, setImage] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setImage(Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
    }
  });

  const handleSubmit = () => {
    if (image) {
      onSubmit(image);
    }
  };
  return (
    <div>
       <section className="container my-5">
      <h2 className="text-center mb-4">📷 Upload Pest Image</h2>
      <div {...getRootProps({ className: 'dropzone p-4 mb-3 text-center' })}>
        <input {...getInputProps()} />
        {!image ? (
          <p className="text-muted">Drag & drop an image here, or click to select</p>
        ) : (
          <img src={image.preview} alt="Preview" className="img-fluid rounded shadow-sm" />
        )}
      </div>
      {image && (
        <div className="text-center">
          <button className="btn btn-success mt-3" onClick={handleSubmit}>
            Submit for Detection
          </button>
        </div>
      )}
    </section>
    </div>
  )
}

export default imageupload
