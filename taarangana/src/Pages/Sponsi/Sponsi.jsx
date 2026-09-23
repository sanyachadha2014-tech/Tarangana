import React from 'react';
import './Sponsi.css';
import Navbar from '../../Components/Navbar/Navbar';
import bgImage from '../../assets/bgsponsi.webp';

export default function Sponsi() {
    return (
        <div
            className="sponsi-container"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Pass isVisible as true so the Navbar actually renders */}
            <Navbar isVisible={true} />

            <div className="sponsi-content-wrapper">
                {/* Heading Section */}
                <div className="sponsi-title-wrapper">
                    <h1 className="sponsi-title">OUR SPONSORS</h1>
                    <div className="sponsi-decorative-underline">
                        <div className="sponsi-decorative-line left"></div>
                        <div className="sponsi-decorative-icon">
                            <svg width="44" height="16" viewBox="0 0 44 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 0L26 8L22 16L18 8L22 0Z" fill="#dfb873" />
                                <path d="M14 8C14 8 18 5 18 2C18 -1 12 -1 12 2C12 5 16 8 16 8" stroke="#dfb873" strokeWidth="1.2" />
                                <path d="M30 8C30 8 26 5 26 2C26 -1 32 -1 32 2C32 5 28 8 28 8" stroke="#dfb873" strokeWidth="1.2" />
                            </svg>
                        </div>
                        <div className="sponsi-decorative-line right"></div>
                    </div>
                </div>

                {/* Metallic Coming Soon Box */}
                <div className="metallic-container">
                    <div className="metallic-box">
                        <span className="metallic-text">COMING SOON</span>
                        <div className="glare-effect"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}