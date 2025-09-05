import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { UserCog } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../signup.css";

function AdminSignup() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    headName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/api/admin/signup", formData);
      alert("✅ Admin account created successfully! Please login.");
      navigate("/admin/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-bg">
      <div className="overlay"></div>

      <div className="signup-container">
        {/* Left Side - Quote */}
        <motion.div
          className="quote-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="display-5 fw-bold">
            🏥 "Great leadership builds healthier communities."
          </h1>
          <p className="lead mt-3">– Admin Portal</p>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          className="form-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="card signup-card shadow-lg p-4">
            <div className="text-center mb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-circle d-flex align-items-center justify-content-center bg-success mb-3"
                style={{ width: "70px", height: "70px" }}
              >
                <UserCog className="text-white fs-2" />
              </motion.div>
              <h2 className="fw-bold">Admin Signup</h2>
              <p className="text-muted">Register your hospital’s admin account</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="🏥 Hospital Name"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="👨‍⚕️ Head Name"
                  name="headName"
                  value={formData.headName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="📧 Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="🔒 Password"
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
                className="btn btn-success w-100 fw-bold"
              >
                {isLoading ? "Creating..." : "🚀 Sign Up as Admin"}
              </motion.button>
            </form>

            <p className="text-center text-muted mt-3">
              Already registered?{" "}
              <Link to="/admin/login" className="fw-bold text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminSignup;
