
// API Service to connect with your Flask backend
// Replace the base URL with your Flask server URL

const API_BASE_URL = 'http://localhost:5000'; // Change this to your Flask server URL

export class ApiService {
  static async searchQuestions(query: string, category: string = 'All') {
    try {
      const params = new URLSearchParams({
        q: query,
        category: category === 'All' ? '' : category
      });
      
      const response = await fetch(`${API_BASE_URL}/api/search?${params}`);
      
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  }

  static async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      
      if (!response.ok) {
        throw new Error('Categories request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Categories API error:', error);
      throw error;
    }
  }

  static async getAllQuestions() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/questions`);
      
      if (!response.ok) {
        throw new Error('Questions request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Questions API error:', error);
      throw error;
    }
  }
}
