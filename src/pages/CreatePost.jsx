import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { marked } from "marked";

const allCategories = [
  "LIFESTYLES",
  "SELF DEVELOPMENT",
  "PSYCHOLOGY",
  "REVIEW"
];

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  const uploadToImgur = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID b516f5a62e573cd", // 👈 ใช้ Client-ID ของคุณ
      },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      return data.data.link;
    } else {
      throw new Error("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !markdown) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    setUploading(true);

    try {
      const htmlContent = marked.parse(markdown);
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadToImgur(image);
      }

      await addDoc(collection(db, "posts"), {
        title,
        category,
        content: htmlContent,
        imageUrl,
        createdAt: Timestamp.now()
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>✍️ เขียนบทความด้วย Markdown</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="หัวข้อบทความ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="หมวดหมู่ (LIFESTYLES, SELF DEVELOPMENT ฯลฯ)"
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />
        {image && <p>📸 เลือกไฟล์: {image.name}</p>}

        <textarea
          placeholder="เขียน Markdown ที่นี่..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          rows={10}
          style={styles.textarea}
        />

        <div>
          <h3>🔍 Preview:</h3>
          <div
            style={styles.preview}
            dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
          />
        </div>

        <button type="submit" disabled={uploading} style={styles.button}>
          {uploading ? "⏳ กำลังอัปโหลด..." : "✅ เผยแพร่"}
        </button>
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

export default CreatePost;
