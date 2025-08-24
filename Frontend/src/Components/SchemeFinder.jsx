import React, { useState, useEffect } from 'react';
import schemesData from '../data/schemesData.json';
import AOS from 'aos';
// import 'aos/dist/aos.css';
import './Styles/SchemeFinder.css';

const SchemeFinder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [savedSchemes, setSavedSchemes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800, offset: 100, once: true });
        const saved = JSON.parse(localStorage.getItem('savedSchemes')) || [];
        setSavedSchemes(saved);
    }, []);

    const handleSearch = () => {
        // Optional: trigger search manually
    };

    const handleSave = (scheme) => {
        const updated = [...savedSchemes, scheme];
        setSavedSchemes(updated);
        localStorage.setItem('savedSchemes', JSON.stringify(updated));
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        if (value !== 'All') {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const filteredSchemes = schemesData.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="scheme-finder">
            <h2 data-aos="zoom-in">🌱 Government Scheme & Subsidy Finder</h2>

            {/* 🔍 Unified Filter Row */}
            <div className="filter-row" data-aos="fade-up">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Search schemes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        🔍Search
                    </button>
                </div>

                <div className="floating-label">
                    <label htmlFor="category-select">🗂️ Category</label>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="dropdown-select fade-in"
                    >
                        <option value="All">All Categories</option>
                        <option value="Subsidy">💰 Subsidy</option>
                        <option value="Insurance">🌾 Insurance</option>
                        <option value="Soil Health">🧪 Soil Health</option>
                        <option value="Equipment">🚜 Equipment</option>
                        <option value="Loan">💳 Loan</option>
                        <option value="Organic">🌿 Organic</option>
                        <option value="Infrastructure">🏗️ Infrastructure</option>
                        <option value="Training">📚 Training</option>
                    </select>
                </div>
            </div>

            {/* 🪟 Modal */}
            {showModal && selectedCategory !== 'All' && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>🔍 Showing schemes under: {selectedCategory}</h3>
                        <p>Explore all government schemes related to <strong>{selectedCategory}</strong>. Scroll down to see results.</p>
                        <button className="close-modal-btn" onClick={closeModal}>Got it!</button>
                    </div>
                </div>
            )}

            {/* 📦 Scheme Cards */}
            <div className="scheme-list">
                {filteredSchemes.map((scheme, index) => (
                    <div key={index} className="scheme-card" data-aos="fade-up" data-aos-delay={index * 100}>
                        <div className="image-container">
                            <img src={scheme.image} alt={scheme.name} className="scheme-image" />
                            <span className={`category-badge ${scheme.category.toLowerCase()}`}>
                                {scheme.category}
                            </span>

                        </div>
                        <div className="scheme-info">
                            <h3>{scheme.emoji} {scheme.name}</h3>
                            <p>{scheme.description}</p>
                            <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                                <button className="learn-more-btn">Learn More </button>
                            </a>
                            <button onClick={() => handleSave(scheme)} className="emoji-save-btn">
                                💾
                            </button>
                        </div>
                    </div>
                ))}
                {filteredSchemes.length === 0 && (
                    <p className="no-results">😕 No schemes found. Try a different keyword or category.</p>
                )}
            </div>
        </div>
    );
};

export default SchemeFinder;
