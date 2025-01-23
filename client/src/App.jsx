import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

const App = () => {
    return (
        <AuthProvider>
            <ToastContainer autoClose={1500}/>
            <Router>
                <AppRouter />
            </Router>
        </AuthProvider>
    );
};

export default App;
