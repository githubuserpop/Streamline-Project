import { useState, useEffect } from 'react';
import { fetchTopHeadlines, fetchNewsByCategory, searchNews } from '../services/newsApi';

export function useNews(initialCategory = null) {
  const [breakingNews, setBreakingNews] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [trending, setTrending] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial homepage news
  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      try {
        // Fetch breaking news (top headlines)
        const breakingNewsData = await fetchTopHeadlines({ pageSize: 5 });
        setBreakingNews(breakingNewsData.articles.slice(0, 4));
        
        // Set the first article as featured
        if (breakingNewsData.articles.length > 0) {
          setFeaturedArticle(breakingNewsData.articles[0]);
        }
        
        // Fetch category-specific news
        const businessNews = await fetchNewsByCategory('business', { pageSize: 2 });
        const techNews = await fetchNewsByCategory('technology', { pageSize: 2 });
        const healthNews = await fetchNewsByCategory('health', { pageSize: 1 });
        const sportsNews = await fetchNewsByCategory('sports', { pageSize: 1 });
        
        // Combines the category news
        const combinedArticles = [
          ...(businessNews.articles || []),
          ...(techNews.articles || []),
          ...(healthNews.articles || []),
          ...(sportsNews.articles || [])
        ];
        
        setArticles(combinedArticles);
        
        // Fetch trending news using popular queries
        const trendingNewsData = await searchNews('trending OR popular', { 
          pageSize: 5,
          sortBy: 'popularity'
        });
        
        setTrending(trendingNewsData.articles.slice(0, 5));
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }
    
    fetchNews();
    
    // Set up an interval to refresh news data every 5 minutes
    const intervalId = setInterval(() => {
      fetchNews();
    }, 5 * 60 * 1000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Fetch category-specific news when currentCategory changes
  useEffect(() => {
    async function fetchCategoryNews() {
      if (!currentCategory) return;
      
      setIsLoading(true);
      try {
        const data = await fetchNewsByCategory(currentCategory, { pageSize: 10 });
        setCategoryArticles(data.articles || []);
      } catch (err) {
        console.error(`Error fetching ${currentCategory} news:`, err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (currentCategory) {
      fetchCategoryNews();
    }
  }, [currentCategory]);
  
  // Function to fetch news by a specific category
  const getNewsByCategory = async (category) => {
    setIsLoading(true);
    try {
      const data = await fetchNewsByCategory(category, { pageSize: 10 });
      return data.articles;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to search news
  const searchNewsArticles = async (query) => {
    setIsLoading(true);
    try {
      const data = await searchNews(query, { pageSize: 20 });
      return data.articles;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    breakingNews,
    featuredArticle,
    articles,
    trending,
    categoryArticles,
    isLoading,
    error,
    getNewsByCategory,
    searchNewsArticles,
    setCurrentCategory
  };
}