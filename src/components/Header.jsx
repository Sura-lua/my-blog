import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n";

const Header = () => {
  const [lang, setLang] = useState("th");
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = lang === "th" ? "en" : "th";
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media (max-width: 768px) {
        .nav {
          display: ${isMobileMenuOpen ? "flex" : "none"} !important;
          flex-direction: column;
          background: #1e1e1e;
          position: absolute;
          top: 70px;
          left: 0;
          right: 0;
          padding: 1rem;
          gap: 1rem;
          z-index: 9999; /* ✅ สำคัญมาก */
        }

        .search-toggle,
        .lang-toggle {
          font-size: 1rem !important;
        }
        .hamburger {
          display: inline-block !important;
        }
      }
      @media (min-width: 769px) {
        .nav {
          display: flex !important;
          position: static !important;
          flex-direction: row !important;
          gap: 2rem !important;
        }
        .hamburger {
          display: none !important;
        }
      }
      a:hover {
        color: #61dafb !important;
        border-bottom: 2px solid #61dafb;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [isMobileMenuOpen]);

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src="/BN-LOGO.png" alt="logo" style={styles.logo} />
        </Link>
      </div>

      <div className="hamburger" style={styles.hamburger} onClick={toggleMobileMenu}>
        ☰
      </div>

      <nav className="nav" style={styles.nav}>
  <Link to="/" style={styles.link}>{t("HOME")}</Link>
  <Link to="/lifestyles" style={styles.link}>{t("LIFESTYLES")}</Link>
  <Link to="/psychology" style={styles.link}>{t("PSYCHOLOGY")}</Link>
  <Link to="/self-development" style={styles.link}>{t("SELF_DEVELOPMENT")}</Link>
  <Link to="/review" style={styles.link}>{t("REVIEW")}</Link>
  <Link to="/about" style={styles.link}>{t("ABOUT")}</Link>
</nav>


      <div style={styles.actions}>
        {showSearch && (
          <input
            type="text"
            placeholder={t("SEARCH_PLACEHOLDER")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={styles.searchInput}
          />
        )}
        <span onClick={toggleSearch} className="search-toggle" style={styles.iconBtn}>🔍</span>
        <span onClick={toggleLanguage} className="lang-toggle" style={styles.langToggle}>
          {lang.toUpperCase()}
        </span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    padding: "1rem 2rem",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "'Barlow Condensed', sans-serif",
    flexWrap: "wrap"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    height: "48px",
    width: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
    cursor: "pointer"
  },
  nav: {
    display: "flex",
    gap: "2rem",
    alignItems: "center"
  },
  link: {
    color: "#eee",
    textDecoration: "none",
    fontWeight: "600",
    letterSpacing: "0.05em",
    fontSize: "1.05rem",
    transition: "color 0.3s, border-bottom 0.3s",
    borderBottom: "2px solid transparent"
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem"
  },
  iconBtn: {
    color: "#aaa",
    fontSize: "1.2rem",
    cursor: "pointer"
  },
  langToggle: {
    color: "#eee",
    fontSize: "0.95rem",
    fontWeight: "bold",
    cursor: "pointer",
    border: "1px solid #444",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    backgroundColor: "#2a2a2a"
  },
  searchInput: {
    padding: "0.3rem 0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: "0.9rem"
  },
  hamburger: {
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "none"
  }
};

export default Header;
