/* import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:2005/api/auth/login",
        form
      );
      console.log("NEW TOKEN:", res.data.token);

//localStorage.setItem("token", res.data.token);

      // ✅ Store token
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);

      alert("Login successful");
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
    <div>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      </div>
      <br/>
    <div>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      </div>

      <button type="submit">Login</button>
    </form>
  );
} */


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:2005/api/auth/login",
        form,
        {
          withCredentials: true   // 🔥 VERY IMPORTANT
        }
      );

      alert("Login successful");
      console.log(res.data);

      navigate("/home"); // redirect after login

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}