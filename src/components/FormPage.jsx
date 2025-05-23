import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPage.css";

const FormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countries = {
    India: ["Delhi", "Mumbai", "Chennai"],
    USA: ["New York", "Los Angeles", "Chicago"],
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/;
    const aadharRegex = /^\d{12}$/;

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be 6+ characters";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.country) newErrors.country = "Select a country";
    if (!formData.city) newErrors.city = "Select a city";
    if (!panRegex.test(formData.pan)) newErrors.pan = "Invalid PAN number";
    if (!aadharRegex.test(formData.aadhar)) newErrors.aadhar = "Invalid Aadhar number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {[
          ["firstName", "First Name"],
          ["lastName", "Last Name"],
          ["username", "Username"],
          ["email", "Email"],
        ].map(([name, label]) => (
          <div key={name}>
            <label>{label}</label>
            <input name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <span>{errors[name]}</span>}
          </div>
        ))}

        <div>
          <label>Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>

        <div>
          <label>Phone No.</label>
          <input
            name="phone"
            value={formData.phone}
            placeholder="+91xxxxxxxxxx"
            onChange={handleChange}
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>

        <div>
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select</option>
            {Object.keys(countries).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.country && <span>{errors.country}</span>}
        </div>

        <div>
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select</option>
            {(countries[formData.country] || []).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.city && <span>{errors.city}</span>}
        </div>

        {[
          ["pan", "PAN No."],
          ["aadhar", "Aadhar No."],
        ].map(([name, label]) => (
          <div key={name}>
            <label>{label}</label>
            <input name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <span>{errors[name]}</span>}
          </div>
        ))}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;

