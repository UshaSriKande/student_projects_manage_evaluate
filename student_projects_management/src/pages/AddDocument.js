import React, { useState,useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Document, Page, pdfjs } from 'react-pdf';

// Specify the location of the PDF worker script
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AddDocument() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfContent, setPdfContent] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPageNumber(1); // Reset page number when a new file is selected
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://127.0.0.1:5000/upload', formData, {
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


  const handleDisplayPDF1 = () => {
    // Fetch the PDF file from the backend
    fetch('http://localhost:5000/get_pdf/1') // Replace '1' with the actual PDF ID
    
    .then(response => {
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      //setPdfUrl(pdfUrl);
      window.open(pdfUrl, '_blank');
    })
    .catch(error => {
      console.error('Error fetching PDF:', error);
    });
  };

  useEffect(() => {
    const documentId = 1; // Define documentId here
    axios.get(`http://localhost:5000/pdf/${documentId}`, { responseType: 'blob' })
      .then(response => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        setPdfUrl(URL.createObjectURL(pdfBlob));
        window.open(pdfUrl, '_blank');
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  }, []);


  useEffect(() => {
    // Fetch PDF content from the backend when component mounts
    fetchPdfContent();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const fetchPdfContent = () => {
    // Replace 'pdf_id' with the actual ID of the PDF you want to fetch
    axios.get('http://localhost:5000/get_pdf/1')
      .then(response => {
        // Assuming the response contains PDF content as a Blob
        const pdfBlob = new Blob([response.data]);
        setPdfContent(pdfBlob); // Set the PDF content as Blob
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
      });
  };

  const handleDisplayPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `document.pdf`; // Set the filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      <button onClick={handleDisplayPDF}>Display PDF</button>

      {pdfContent ? (
        <div>
          <Document
            file={pdfContent} // Pass PDF content to Document component
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  
    
  );
}

export default AddDocument;
