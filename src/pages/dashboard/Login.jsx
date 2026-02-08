import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  {
    username: "Assistant@LibVCFW",
    password: "Narottam#9564Das",
    name: "Narottam Das",
    role: "Library Clerk",
  },
  {
    username: "Admin1@LibVCFW",
    password: "Moumita#9834Ash",
    name: "Moumita Ash",
    role: "Librarian",
  },
  {
    username: "Admin2@LibVCFW",
    password: "Sukanta#1997Patra",
    name: "Dr. Sukanta Kumar Patra",
    role: "Librarian",
  },
];

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!isAuthorized) {
      setError("Please authorize access before logging in");
      return;
    }

    const userMatched = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!userMatched) {
      setError("Invalid Username or Password");
      return;
    }

    if (captchaInput !== captcha.toString()) {
      setError("Captcha does not match");
      return;
    }

    // ✅ STORE FULL USER OBJECT
    localStorage.setItem(
      "libraryUser",
      JSON.stringify({
        username: userMatched.username,
        name: userMatched.name,
        role: userMatched.role,
      })
    );

    navigate("/dashboard");
  };

  const refreshCaptcha = () => {
    setCaptcha(Math.floor(1000 + Math.random() * 9000));
    setCaptchaInput("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px 35px",
          background: "linear-gradient(145deg, #ffffff 0%, #fffaf0 100%)",
          boxShadow: "0 20px 60px rgba(139, 115, 85, 0.15)",
          borderRadius: "20px",
          border: "1px solid #f5e6d3",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "120px",
          height: "120px",
          background: "linear-gradient(135deg, #d4a76a22, #8b735511)",
          borderRadius: "0 20px 0 120px"
        }}></div>
        
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #d4a76a15, #8b735505)",
          borderRadius: "0 80px 0 0"
        }}></div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "35px", position: "relative", zIndex: "1" }}>
          <div style={{
            width: "70px",
            height: "70px",
            background: "linear-gradient(135deg, #d4a76a, #8b7355)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "white",
            fontSize: "32px",
            fontWeight: "bold",
            boxShadow: "0 8px 20px rgba(212, 167, 106, 0.3)"
          }}>
            📚
          </div>
          
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#5d4c3a",
            marginBottom: "8px",
            background: "linear-gradient(45deg, #8b7355, #d4a76a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            VCFW Library System
          </h1>
          
          <p style={{
            fontSize: "14px",
            color: "#8b7355",
            margin: "0",
            opacity: "0.8"
          }}>
            Secure access for authorized personnel only
          </p>
        </div>

        {/* Login Form */}
        <div style={{ position: "relative", zIndex: "1" }}>
          {/* Username Field */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#5d4c3a",
              marginBottom: "8px"
            }}>
              Login ID
            </label>
            <div style={{
              position: "relative",
              background: "#fffaf7",
              border: "2px solid #f5e6d3",
              borderRadius: "12px",
              padding: "12px 15px",
              transition: "all 0.3s ease"
            }}>
              <input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "15px",
                  color: "#5d4c3a"
                }}
              />
              <span style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#d4a76a",
                fontSize: "18px"
              }}>👤</span>
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#5d4c3a",
              marginBottom: "8px"
            }}>
              Password
            </label>
            <div style={{
              position: "relative",
              background: "#fffaf7",
              border: "2px solid #f5e6d3",
              borderRadius: "12px",
              padding: "12px 15px",
              transition: "all 0.3s ease"
            }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                style={{
                  width: "calc(100% - 30px)",
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  fontSize: "15px",
                  color: "#5d4c3a"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#d4a76a",
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: "0"
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Captcha Section */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px"
            }}>
              <label style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#5d4c3a"
              }}>
                Security Verification
              </label>
              <button
                type="button"
                onClick={refreshCaptcha}
                style={{
                  background: "linear-gradient(135deg, #d4a76a, #8b7355)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(212, 167, 106, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <span>🔄</span> Refresh
              </button>
            </div>
            
            <div style={{
              display: "flex",
              gap: "15px",
              alignItems: "center"
            }}>
              <div style={{
                flex: "1",
                background: "linear-gradient(45deg, #f5e6d3, #e8d9c5)",
                padding: "15px",
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "10px",
                fontSize: "24px",
                color: "#5d4c3a",
                borderRadius: "12px",
                border: "2px solid #d4a76a",
                boxShadow: "inset 0 2px 8px rgba(139, 115, 85, 0.1)"
              }}>
                {captcha}
              </div>
              
              <input
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value.replace(/\D/g, ''));
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                maxLength="4"
                style={{
                  width: "100px",
                  padding: "15px",
                  border: "2px solid #f5e6d3",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                  background: "#fffaf7",
                  color: "#5d4c3a",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
              />
            </div>
          </div>

          {/* Authorization Checkbox */}
          <div style={{ 
            marginBottom: "25px",
            padding: "15px",
            background: "#fffaf7",
            border: "2px solid #f5e6d3",
            borderRadius: "12px"
          }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#5d4c3a"
            }}>
              <input
                type="checkbox"
                checked={isAuthorized}
                onChange={(e) => {
                  setIsAuthorized(e.target.checked);
                  setError("");
                }}
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#d4a76a",
                  cursor: "pointer"
                }}
              />
              <span>
                I authorize access to the VCFW Library Management System and confirm that I am an authorized personnel.
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: "12px 15px",
              background: "#fee",
              border: "2px solid #fcc",
              borderRadius: "10px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ color: "#d00", fontSize: "18px" }}>⚠️</span>
              <p style={{ 
                color: "#d00", 
                margin: "0",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #d4a76a, #8b7355)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(212, 167, 106, 0.3)",
              letterSpacing: "1px"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(212, 167, 106, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(212, 167, 106, 0.3)";
            }}
            disabled={!isAuthorized}
          >
            {!isAuthorized ? "Please Authorize First" : "Login to Dashboard"}
          </button>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: "30px", 
          textAlign: "center", 
          paddingTop: "20px",
          borderTop: "1px solid #f5e6d3",
          position: "relative",
          zIndex: "1"
        }}>
          <p style={{ 
            fontSize: "12px", 
            color: "#8b7355",
            margin: "0",
            opacity: "0.7"
          }}>
            For authorized personnel only • © 2024 VCFW Library
          </p>
        </div>
      </div>
    </div>
  );
}