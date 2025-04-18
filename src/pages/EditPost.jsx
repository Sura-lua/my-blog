import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { marked } from "marked";

const allCategories = [
  "LIFESTYLES",
  "SELF DEVELOPMENT",
  "PSYCHOLOGY",
  "REVIEW"
];

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setCategory(data.category);
          setMarkdown(data.content || "");
        } else {
          setError("ไม่พบบทความ");
        }
      } catch (err) {
        console.error(err);
        setError("เกิดข้อผิดพลาด");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !markdown) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      const htmlContent = marked.parse(markdown);

      await updateDoc(doc(db, "posts", id), {
        title,
        category,
        content: htmlContent,
        updatedAt: Timestamp.now()
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  return (
    <div style={styles.container}>
      <h2>✏️ แก้ไขบทความ</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="หัวข้อบทความ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="หมวดหมู่"
            value={category}
            onChange={(e) => setCategory(e.target.value.toUpperCase())}
            style={styles.input}
            list="category-options"
          />
          <datalist id="category-options">
            {allCategories.map((cat, i) => (
              <option key={i} value={cat} />
            ))}
          </datalist>
        </div>

        <textarea
          placeholder="เขียน Markdown ที่นี่..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows={10}
          style={styles.textarea}
        />

        <div>
          <h3>🔍 ตัวอย่าง Preview:</h3>
          <div
            style={styles.preview}
            dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
          />
        </div>

        <button type="submit" style={styles.button}>บันทึกการเปลี่ยนแปลง</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "inherit"
  },
  preview: {
    background: "#f8f8f8",
    padding: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
    lineHeight: "1.6"
  },
  button: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer"
  },
  error: {
    color: "red"
  }
};

export default EditPost;
