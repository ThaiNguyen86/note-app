import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate(); // Hook để điều hướng

    const handleGoBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404 - Trang không tồn tại</h1>
            <p style={styles.message}>
                Oops! Có vẻ như trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <button style={styles.button} onClick={handleGoBack}>
                Quay lại
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px 20px",
        fontFamily: "'Arial', sans-serif",
    },
    title: {
        fontSize: "36px",
        color: "#ff4d4f",
        marginBottom: "20px",
    },
    message: {
        fontSize: "18px",
        color: "#555",
        marginBottom: "30px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
};

export default NotFoundPage;
