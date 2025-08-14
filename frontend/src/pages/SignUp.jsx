import React, { useState } from "react";

export default function SignUp() {
  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  // Use a relative path with Vite proxy; or swap to your full API URL
  const url = "/api/auth/signup";

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent native GET submit
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const ct = res.headers.get("content-type") || "";
      const payload = ct.includes("application/json")
        ? await res.json().catch(() => ({}))
        : await res.text();

      if (!res.ok) {
        throw new Error(
          (typeof payload === "string" && payload) ||
          payload?.message ||
          `HTTP ${res.status} ${res.statusText}`
        );
      }

      // ✅ Success — refresh the page
      // (If you want to drop any search/hash too, you could use:
      //   window.location.replace(window.location.pathname);)
      window.location.reload();
    } catch (err) {
      setError(err.message || "Something went wrong.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <main>
      <h1>Sign Up!</h1>

      <div className="Fields">
        <h2>Input Fields</h2>
        <fieldset>
          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              required
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
              required
            />

            <label htmlFor="email">Enter Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />

            <label htmlFor="password">Enter Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
            />

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button type="button" onClick={handleReset} disabled={submitting}>
                Reset
              </button>
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>

            {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
          </form>
        </fieldset>
      </div>
    </main>
  );
}
