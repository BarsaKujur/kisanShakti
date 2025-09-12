import React, { useState } from 'react';
import axios from 'axios';

const PestDetectionTool = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult('');
  };

  const handleTest = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/detect-pest', formData);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult('Error during pest detection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Pest Detection Tool</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width="300" style={{ margin: '20px 0' }} />}
      <br />
      <button onClick={handleTest} disabled={!image || loading}>
        {loading ? 'Detecting...' : 'Test'}
      </button>
      {result && <p><strong>{result}</strong></p>}
    </div>
  );
};

export default PestDetectionTool;
