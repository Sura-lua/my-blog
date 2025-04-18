import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/login");
      } else {
        await fetchPosts();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postList);
    } catch (error) {
      console.error("โหลดบทความล้มเหลว", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?");
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("ลบโพสต์ล้มเหลว", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>แดชบอร์ดผู้ดูแล</h2>
        <div style={styles.actions}>
          <button onClick={handleLogout} style={styles.logout}>ออกจากระบบ</button>
          <button onClick={() => navigate("/create")} style={styles.createBtn}>➕ เขียนบทความ</button>
        </div>
      </div>

      {loading ? (
        <p>กำลังโหลดบทความ...</p>
      ) : posts.length === 0 ? (
        <p>ยังไม่มีบทความ</p>
      ) : (
        <ul style={styles.postList}>
          {posts.map((post) => (
            <li key={post.id} style={styles.postItem}>
              <h3>{post.title}</h3>
              <small style={styles.meta}>{post.category}</small>
              <p style={styles.preview}>{post.content.substring(0, 100)}...</p>
              <div style={styles.buttons}>
                <button
                  style={styles.editBtn}
                  onClick={() => navigate(`/edit/${post.id}`)}
                >
                  ✏️ แก้ไข
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(post.id)}
                >
                  🗑️ ลบ
                </button>
                <button onClick={() => navigate(`/post/${post.id}`)} style={styles.viewBtn}>
                👁️ ดู
                </button>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem"
  },
  actions: {
    display: "flex",
    gap: "1rem"
  },
  logout: {
    padding: "0.5rem 1rem",
    backgroundColor: "#c0392b",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  createBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#2ecc71",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer"
  },
  postList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  postItem: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "1.5rem",
    marginBottom: "2rem"
  },
  meta: {
    display: "block",
    color: "#666",
    marginBottom: "0.5rem"
  },
  preview: {
    color: "#333"
  },
  buttons: {
    marginTop: "1rem",
    display: "flex",
    gap: "1rem"
  },
  editBtn: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer"
  },
  viewBtn: {
    backgroundColor: "#9b59b6",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer"
  }
  
};

export default Dashboard;
