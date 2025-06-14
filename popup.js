document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm');
  const fileInput = document.getElementById('environment');
  const initialContent = document.getElementById('initialContent');
  const processingContent = document.getElementById('processingContent');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('filename', file);

    try {
      // Hide initial content and show processing state
      initialContent.style.display = 'none';
      processingContent.style.display = 'block';

      const response = await fetch('http://localhost:3000/getImage', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Simulate processing with a 10-second timeout
        setTimeout(() => {
          processingContent.style.display = 'none';
          successContent.style.display = 'block';
          
          // Add click event listener to the view model button
          const viewModelBtn = document.getElementById('viewModelBtn');
          viewModelBtn.addEventListener('click', () => {
            window.location.href = 'https://www.google.com';
          });
        }, 10000); // 10 seconds timeout
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
      // Show initial content again on error
      initialContent.style.display = 'block';
      processingContent.style.display = 'none';
    }
  });
});
