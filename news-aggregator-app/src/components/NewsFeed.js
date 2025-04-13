import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TrendingNews from './TrendingNews';
import PersonalizedNews from './PersonalizedNews';
import SportsNews from './SportsNews';
import RefreshNewsButton from './RefreshNewsButton';
import CategoryFilter from './CategoryFilter';

function NewsFeed() {
  const [activeSection, setActiveSection] = useState('trending');
  const [layout, setLayout] = useState('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categories, setCategories] = useState([
    { id: 'technology', name: 'Technology', active: true },
    { id: 'business', name: 'Business', active: false },
    { id: 'health', name: 'Health', active: true },
    { id: 'sports', name: 'Sports', active: true },
    { id: 'entertainment', name: 'Entertainment', active: false },
    { id: 'science', name: 'Science', active: true },
    { id: 'world', name: 'World', active: true }
  ]);

  const handleRefreshNews = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
    return Promise.resolve();
  };

  const handleToggleCategory = (categoryId) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, active: !category.active }
        : category
    ));
  };

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="news-feed-header">
        <div className="news-feed-controls">
        <motion.button 
            className={`section-button ${activeSection === 'yournews' ? 'active' : ''}`}
            onClick={() => setActiveSection('yournews')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Your News
          </motion.button>
          <motion.button 
            className={`section-button ${activeSection === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveSection('trending')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trending & Breaking
          </motion.button>
          <motion.button 
            className={`section-button ${activeSection === 'personalized' ? 'active' : ''}`}
            onClick={() => setActiveSection('personalized')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            For You
          </motion.button>
          <motion.button 
            className={`section-button ${activeSection === 'sports' ? 'active' : ''}`}
            onClick={() => setActiveSection('sports')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sports
          </motion.button>
        </div>
        
        <div className="news-feed-actions">
          <div className="layout-toggle">
            <motion.button 
              className={`layout-button ${layout === 'grid' ? 'active' : ''}`}
              onClick={() => setLayout('grid')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-th-large"></i>
            </motion.button>
            <motion.button 
              className={`layout-button ${layout === 'list' ? 'active' : ''}`}
              onClick={() => setLayout('list')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-th-list"></i>
            </motion.button>
          </div>
          
          <RefreshNewsButton onRefresh={handleRefreshNews} />
        </div>
      </div>

      <motion.div 
        className="category-filters"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="filters-label">Filter by:</div>
        <div className="category-chips">
          {categories.map(category => (
            <CategoryFilter
              key={category.id}
              category={category}
              onToggleCategory={handleToggleCategory}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={`${activeSection}-${layout}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`news-feed-content layout-${layout}`}
        >
          {activeSection === 'trending' && (
            <TrendingNews 
              layout={layout} 
              isRefreshing={isRefreshing} 
              categoryFilters={categories.filter(c => c.active).map(c => c.id)}
            />
          )}
          {activeSection === 'personalized' && (
            <PersonalizedNews 
              layout={layout} 
              isRefreshing={isRefreshing}
              categoryFilters={categories.filter(c => c.active).map(c => c.id)}
            />
          )}
          {activeSection === 'sports' && (
            <SportsNews 
              layout={layout} 
              isRefreshing={isRefreshing}
            />
          )}
          {activeSection === 'yournews' && (
            <PersonalizedNews 
              layout={layout} 
              isRefreshing={isRefreshing}
              categoryFilters={categories.filter(c => c.active).map(c => c.id)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default NewsFeed;
