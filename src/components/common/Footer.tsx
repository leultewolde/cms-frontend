import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px 0",
            textAlign: "center"
        }}>
            <div className={styles.container}>
                <p>© {new Date().getFullYear()} CMS. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
