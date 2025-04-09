const API_KEY = 'a517682f1cb148639ff9cf431afff950'; //API key for NewsAPI //Potentially explore other API, this is the key location. //OPSEC is NOT clean
const BASE_URL = 'https://newsapi.org/v2';

/**
 * Fetch top headlines from the News API
 * @param {Object} params - Query parameters
 * @param {string} params.country - Country code (e.g., 'us', 'gb')
 * @param {number} params.pageSize - Number of results per page
 * @param {number} params.page - Page number
 * @returns {Promise} - Promise resolving to news data
 */
export const fetchTopHeadlines = async (params = {}) => {
  const defaultParams = {
    country: 'us',
    pageSize: 10,
    page: 1,
    ...params
  };
  
  const queryParams = new URLSearchParams({
    ...defaultParams,
    apiKey: API_KEY
  });
  
  try {
    const response = await fetch(`${BASE_URL}/top-headlines?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch news');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};

/**
 * Fetch news by category from the News API
 * @param {string} category - News category (e.g., 'business', 'technology')
 * @param {Object} params - Additional query parameters
 * @returns {Promise} - Promise resolving to news data
 */
export const fetchNewsByCategory = async (category, params = {}) => {
  // Map the URL path categories to NewsAPI categories if needed
  const categoryMap = {
    'world': 'general', // NewsAPI uses 'general' for world news
    'business': 'business',
    'technology': 'technology',
    'health': 'health',
    'sports': 'sports',
    // Add more mappings as needed
  };
  
  const apiCategory = categoryMap[category] || category;
  
  const defaultParams = {
    country: 'us',
    pageSize: 8,
    page: 1,
    ...params
  };
  
  const queryParams = new URLSearchParams({
    ...defaultParams,
    category: apiCategory,
    apiKey: API_KEY
  });
  
  try {
    const response = await fetch(`${BASE_URL}/top-headlines?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch news');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    throw error;
  }
};

/**
 * Search for news articles from the News API
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters
 * @returns {Promise} - Promise resolving to news data
 */
export const searchNews = async (query, params = {}) => {
  const defaultParams = {
    pageSize: 20,
    page: 1,
    language: 'en',
    sortBy: 'publishedAt',
    ...params
  };
  
  const queryParams = new URLSearchParams({
    ...defaultParams,
    q: query,
    apiKey: API_KEY
  });
  
  try {
    const response = await fetch(`${BASE_URL}/everything?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to search news');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

/**
 * Fetch sources from the News API
 * @param {Object} params - Query parameters
 * @returns {Promise} - Promise resolving to sources data
 */
export const fetchSources = async (params = {}) => {
  const defaultParams = {
    language: 'en',
    ...params
  };
  
  const queryParams = new URLSearchParams({
    ...defaultParams,
    apiKey: API_KEY
  });
  
  try {
    const response = await fetch(`${BASE_URL}/sources?${queryParams}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch sources');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};