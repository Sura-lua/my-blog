import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n"; // เรียกใช้ config ภาษา

const Header = () => {
  const [lang, setLang] = useState("th");
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = lang === "th" ? "en" : "th";
    setLang(newLang);
    i18n.changeLanguage(newLang); // ✅ เปลี่ยนภาษาในระบบจริง
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Link to="/">
          <img src="/BN-LOGO.png" alt="logo" style={styles.logo} />
        </Link>
      </div>

      <nav style={styles.nav}>
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
        <span onClick={toggleSearch} style={styles.iconBtn}>🔍</span>
        <span onClick={toggleLanguage} style={styles.langToggle}>
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
    fontFamily: "'Barlow Condensed', sans-serif"
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
  }
};

// เพิ่ม hover ผ่าน style tag
const styleElement = document.createElement("style");
styleElement.innerHTML = `
  a:hover {
    color: #61dafb !important;
    border-bottom: 2px solid #61dafb;
  }
`;
document.head.appendChild(styleElement);

export default Header;
