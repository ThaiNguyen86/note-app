import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRouter />
            </Router>
        </AuthProvider>
    );
};

export default App;
