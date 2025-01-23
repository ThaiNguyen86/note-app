import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("Non valid email");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/forgot-password`, { email });
            setMessage(response.data.message);
            setOtpSent(true);
        } catch (error) {
            setMessage(error.response?.data?.message || "Has an error! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitOtp = async (e) => {
        e.preventDefault(); 

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify-otp`, { email, otp });
            console.log(email + otp)
            if (response.data.success) {
                setOtpVerified(true);
                setMessage("Verified OTP. Please enter new password.");
                localStorage.setItem("authToken", response.data.authToken);
            } else {
                setMessage("OTP is invalid! Please try again.");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Has an error! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Password and confirm password do not match.");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            setMessage("Token not found! Please try again.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/user/change-password`,
                { newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message);
            if (response.data.success) {
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Has an error! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center font-dm-sans font-medium bg-gradient-to-r from-sky-300 to-amber-200">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
                <h2 className="text-center font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-b from-sky-600 to-amber-600 mb-3">
                    Forgot Password
                </h2>

                {!otpSent ? (
                    <form onSubmit={handleSubmitEmail}>
                        <div>
                            <input
                                type="email"
                                className="form-control w-full px-4 py-2 mb-4 border rounded focus:ring focus:outline-none"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`btn w-full py-2 ${loading ? "bg-gradient-to-r from-sky-800 to-amber-800 text-white font-semibold" : "bg-gradient-to-r from-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-700 text-white font-semibold"}`}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Send request"}
                            </button>
                        </div>
                    </form>
                ) : !otpVerified ? (
                    <form onSubmit={handleSubmitOtp} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                className="form-control w-full px-4 py-2 border rounded focus:ring focus:outline-none"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`btn w-full py-2 ${loading ? "bg-gradient-to-r from-sky-800 to-amber-800 text-white font-semibold" : "bg-gradient-to-r from-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-700 text-white font-semibold"}`}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "OTP verification"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitNewPassword} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                className="form-control w-full px-4 py-2 border rounded focus:ring focus:outline-none"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                className="form-control w-full px-4 py-2 border rounded focus:ring focus:outline-none"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`btn w-full py-2 ${loading ? "bg-gradient-to-r from-sky-800 to-amber-800 text-white font-semibold" : "bg-gradient-to-r from-sky-500 to-amber-500 hover:from-sky-700 hover:to-amber-700 text-white font-semibold"}`}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Change Password"}
                            </button>
                        </div>
                    </form>
                )}

                {message && (
                    <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
