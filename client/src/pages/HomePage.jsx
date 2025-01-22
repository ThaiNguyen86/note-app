import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const styles = {
        homePage: {
            background: "url('https://source.unsplash.com/1600x900/?notes,technology') no-repeat center center/cover",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // Đẩy nội dung lên trên
            position: "relative",
            color: "#fff",
            fontFamily: "'Arial', sans-serif",
        },
        overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
        },
        homeContent: {
            textAlign: "center",
            zIndex: 2,
            paddingTop: "20vh", // Đẩy nội dung xuống bắt đầu ở 2/3 trang
        },
        homeTitle: {
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        homeDescription: {
            fontSize: "1.5rem",
            marginBottom: "30px",
            lineHeight: 1.5,
            color: "#ddd",
        },
        buttonContainer: {
            marginTop: "20px",
        },
        btn: {
            margin: "0 10px",
            padding: "10px 20px",
            fontSize: "1.2rem",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease, color 0.3s ease",
        },
        btnPrimary: {
            backgroundColor: "#007bff",
            color: "#fff",
        },
    };

    return (
        <div style={styles.homePage}>
            <div style={styles.overlay}></div>
            <div style={styles.homeContent}>
                <h1 style={styles.homeTitle}>Chào mừng đến với ứng dụng chia sẻ ghi chú bảo mật</h1>
                <p style={styles.homeDescription}>
                    Lưu trữ, chia sẻ và quản lý ghi chú của bạn một cách dễ dàng và an toàn.
                </p>
                <div style={styles.buttonContainer}>
                    <Link to="/dashboard" style={{ ...styles.btn, ...styles.btnPrimary }}>
                        Bắt đầu ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
