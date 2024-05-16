import React from 'react';

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    onFileUpload(uploadedFile);
  };

  return (
    <input type="file" onChange={handleFileChange} />
  );
};

export default FileUpload;

