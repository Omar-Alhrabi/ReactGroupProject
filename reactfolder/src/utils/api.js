/**
 * Helper for handling API errors
 * @param {Error} error - The error object from API call
 * @returns {string} - Formatted error message
 */
export const getErrorMessage = (error) => {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      if (error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
      
      if (error.response.data && error.response.data.errors) {
        // Format Laravel validation errors
        const errors = error.response.data.errors;
        const messages = Object.values(errors).flat();
        return messages.join(', ');
      }
      
      return `Server error: ${error.response.status}`;
    } else if (error.request) {
      // The request was made but no response was received
      return 'No response from server. Please check your internet connection.';
    } else {
      // Something else happened while setting up the request
      return error.message || 'An unexpected error occurred';
    }
  };
  
  /**
   * Check if a response has more pages (for pagination)
   * @param {Object} response - The API response object
   * @returns {boolean} - Whether there are more pages
   */
  export const hasMorePages = (response) => {
    if (!response.data || !response.data.meta) {
      return false;
    }
    
    const { current_page, last_page } = response.data.meta;
    return current_page < last_page;
  };