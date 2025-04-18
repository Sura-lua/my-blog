import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const categories = [
  "EDUCATIONS",
  "ENTERTAINMENT",
  "EVENTS",
  "HOW TO",
  "LIFESTYLES",
  "SELF DEVELOPMENT",
  "TECH",
  "TRAVEL"
];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    const colRef = collection(db, "posts");
    const q = selectedCategory
      ? query(colRef, where("category", "==", selectedCategory), orderBy("createdAt", "desc"))
      : query(colRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(list);
  };

  return (
    <div>
      {/* รูปปกใหญ่ */}
      <section style={styles.hero}>
        <img src="/hero.png" alt="cover" style={styles.heroImage} />
      </section>

      {/* Content + Sidebar */}
      <section style={styles.wrapper}>
        <div style={styles.mainContent}>
          <h2>บทความ{selectedCategory ? `: ${selectedCategory}` : "ล่าสุด"}</h2>

          {posts.length === 0 ? (
            <p>ไม่มีบทความในหมวดนี้</p>
          ) : (
            <div style={styles.cardGrid}>
              {posts.map((post) => (
                <div key={post.id} style={styles.card}>
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt={post.title} style={styles.cardImage} />
                  )}
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{post.title}</h3>
                    <small style={styles.category}>{post.category}</small>
                    <div
                    style={styles.preview}
                    dangerouslySetInnerHTML={{
                        __html:
                        post.content.length > 200
                            ? post.content.slice(0, 200) + "..."
                            : post.content
                    }}
                    />
                    <button
                      style={styles.readMoreBtn}
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      อ่านต่อ →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Categories */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarTitle}>CATEGORIES</div>
          {categories.map((cat, i) => (
            <div
              key={i}
              style={styles.sidebarItem}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </div>
          ))}
          <div style={styles.clearBtn} onClick={() => setSelectedCategory(null)}>
            ล้างตัวกรอง
          </div>
        </aside>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    width: "100%",
    overflow: "hidden"
  },
  heroImage: {
    width: "100%",
    height: "240px",
    objectFit: "cover"
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "0 1rem",
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start"
  },
  mainContent: {
    flex: 3
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  sidebarTitle: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: "0.75rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "1rem"
  },
  sidebarItem: {
    padding: "0.5rem 0",
    borderBottom: "1px dotted #ccc",
    cursor: "pointer",
    fontSize: "0.95rem"
  },
  clearBtn: {
    marginTop: "1rem",
    fontSize: "0.85rem",
    textDecoration: "underline",
    cursor: "pointer",
    color: "#888"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "1.5rem"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s"
  },
  cardImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  },
  cardBody: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  cardTitle: {
    margin: "0 0 0.5rem 0"
  },
  category: {
    fontSize: "0.8rem",
    color: "#888",
    marginBottom: "0.5rem"
  },
  preview: {
    flexGrow: 1,
    fontSize: "0.95rem",
    color: "#333"
  },
  readMoreBtn: {
    marginTop: "1rem",
    alignSelf: "flex-start",
    padding: "0.5rem 1rem",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Home;
