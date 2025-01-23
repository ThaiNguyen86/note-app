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
            setMessage("Email không hợp lệ.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/forgot-password`, { email });
            setMessage(response.data.message);
            setOtpSent(true);
        } catch (error) {
            setMessage(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
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
                setMessage("OTP xác thực thành công. Vui lòng nhập mật khẩu mới.");
                localStorage.setItem("authToken", response.data.authToken);
            } else {
                setMessage("OTP không hợp lệ. Vui lòng thử lại.");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            setMessage("Lỗi xác thực, vui lòng thử lại.");
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
            setMessage(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Quên mật khẩu</h2>

            {!otpSent ? (
                <form onSubmit={handleSubmitEmail}>
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang xử lý..." : "Gửi yêu cầu"}
                    </button>
                </form>
            ) : !otpVerified ? (
                <form onSubmit={handleSubmitOtp}>
                    <input
                        type="text"
                        placeholder="Nhập mã OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang xử lý..." : "Xác thực OTP"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmitNewPassword}>
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                    </button>
                </form>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPasswordPage;
