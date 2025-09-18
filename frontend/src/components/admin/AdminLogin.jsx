
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Shield } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Login.css";

function AdminLogin({ setIsAdminAuthenticated }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/admin/login", formData);

      // ✅ Save token with the same key used in AdminProfile.jsx
      localStorage.setItem("token", res.data.token);

      // ✅ (Optional) Save admin info for quick access elsewhere
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      setIsAdminAuthenticated(true);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section */}
          <motion.div
            className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="display-4 fw-bold text-gradient">
              Admin Portal – Secure Access
            </h1>
            <p className="lead text-light mt-3">
              Manage hospital records, patient reports, and staff with full control
              and security.
            </p>
          </motion.div>

          {/* Right Section - Admin Login Form */}
          <motion.div
            className="col-lg-6 d-flex justify-content-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="card glass-card p-4 shadow-lg border-0 w-100"
              style={{ maxWidth: "400px" }}
            >
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-circle d-flex align-items-center justify-content-center bg-gradient mb-3"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Shield className="text-white fs-2" />
                </motion.div>
                <h2 className="fw-bold text-white">Admin Login</h2>
                <p className="text-light">Sign in with your credentials</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg bg-dark text-white border-0"
                    placeholder="Admin Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-dark text-white border-0"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg w-100 btn-gradient text-white fw-bold shadow-sm"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </motion.button>
              </form>

              {/* Extra Links */}
              <div className="d-flex justify-content-between mt-4">
                <Link
                  to="/admin/signup"
                  className="font-monospace text-decoration-none text-white"
                >
                  ➕ Signup as Admin
                </Link>
                <Link
                  to="/"
                  className="font-monospace text-decoration-none text-white"
                >
                  ⬅ Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
