import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    const styles = {
        homePage: {
            background: "linear-gradient(to bottom,rgba(9, 151, 222, 0.62),rgba(255, 178, 45, 0.61)), url('https://source.unsplash.com/1600x900/?notes,technology') no-repeat center center/cover",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start", // Push content to the top
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
            background: "rgba(0, 0, 0, 0.24)",
        },
        homeContent: {
            textAlign: "center",
            zIndex: 2,
            paddingTop: "20vh", // Push content down to start at 2/3 of the page
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
            fontWeight: "bold",
            lineHeight: 1.5,
            color: "white",
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
            backgroundColor: "rgb(36, 108, 179)",
            color: "white",
        },
        btnPrimaryHover: {
            backgroundColor: "rgb(27, 81, 135)",
            color: "white",
        },


    };
    const [btnStyle, setBtnStyle] = React.useState(styles.btnPrimary);
    return (
        <div style={styles.homePage}>
            <div style={styles.overlay}></div>
            <div style={styles.homeContent}>
                <h1 style={styles.homeTitle}>Welcome to the secure note sharing app</h1>
                <p style={styles.homeDescription}>
                    Store, share, and manage your notes easily and securely.
                </p>
                <div style={styles.buttonContainer}>
                    <button
                        style={{ ...styles.btn, ...btnStyle }}
                        onMouseEnter={() => setBtnStyle(styles.btnPrimaryHover)}
                        onMouseLeave={() => setBtnStyle(styles.btnPrimary)}
                    >
                        <Link to="/dashboard">
                            Get Started
                        </Link>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HomePage;
