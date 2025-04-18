// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 BN-Space. Powered by DevBonno 🔥</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: "1rem",
    backgroundColor: "#1e1e1e",
    color: "#ccc",
    textAlign: "center",
    fontSize: "0.9rem",
    fontFamily: "'Barlow Condensed', sans-serif"
  }
};

export default Footer;
