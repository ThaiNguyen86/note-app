import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ShareNotePage from "../pages/ShareNotePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
    return (
        <div>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/share" element={<ShareNotePage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

export default AppRouter;
