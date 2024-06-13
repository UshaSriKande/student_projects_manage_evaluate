import React, { useState } from 'react';
import axios from 'axios';

function PdfViewer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };


  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }) // Use Axios to make the POST request
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDownload = () => {
    
    //window.open('http://localhost:5000/download/13', '_blank');
    const downloadUrl = 'http://localhost:5000/download/10';
    setPdfUrl(downloadUrl);
    console.log(downloadUrl);
    console.log(pdfUrl);
      // Open the download URL in a new tab/window
      window.open(downloadUrl, '_blank');
    
  };

  return (
    <div>
      <h1>File Upload and Download</h1>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Selected File: {fileName}</p>}
      <button onClick={uploadFile}>Upload</button>

      <button onClick={handleDownload}>Download</button>
      {pdfUrl && <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="600px" />}
    </div>
  );
}

export default PdfViewer;