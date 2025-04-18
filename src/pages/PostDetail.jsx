import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const createdAt = data.createdAt?.toDate?.(); // ตรวจว่าแปลง Timestamp ได้
        setPost({
          ...data,
          createdAt: createdAt || null
        });
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p style={styles.loading}>กำลังโหลด...</p>;

  const formatDate = (date) =>
    date?.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  return (
    <div style={styles.container}>
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} style={styles.cover} />
      )}
      <h1 style={styles.title}>{post.title}</h1>

      <div style={styles.meta}>
        <span style={styles.category}>หมวด: {post.category}</span>
        {post.createdAt && (
          <span style={styles.date}>โพสต์เมื่อ: {formatDate(post.createdAt)}</span>
        )}
      </div>

      <div
        style={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "'Barlow', sans-serif",
    color: "#222"
  },
  cover: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem"
  },
  meta: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.9rem",
    color: "#888",
    marginBottom: "1rem"
  },
  category: {
    fontWeight: "bold"
  },
  date: {
    fontStyle: "italic"
  },
  content: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    whiteSpace: "pre-wrap"
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
    color: "#555"
  }
};

export default PostDetail;
