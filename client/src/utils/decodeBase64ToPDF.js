/* eslint-disable no-plusplus */
function decodeBase64ToPDF(base64String) {
  // Convert base64 string to byte array
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create blob and URL for the PDF file
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Open the PDF file in a new tab
  window.open(url, '_blank');
}

export default decodeBase64ToPDF;