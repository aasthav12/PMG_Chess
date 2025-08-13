import React, { useState } from "react";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(
            firstName,
            lastName,
            email,
            password
        );
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password })
            });
            const data = await res.json();
            console.log("User created:", data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleReset = () => {
        // Reset all state variables here
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    };

    return (
    <main>
        <h1>Sign Up!</h1>
        <div className="Fields">
            <h2>Input Fields</h2>
            <fieldset>
                <form action="#" method="get">
                    <label htmlFor="firstname">
                        First Name
                    </label>
                    <input 
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        placeholder="Enter First Name"
                        required
                    />
                    <label htmlFor="lastname">
                        Last Name
                    </label>
                    <input 
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        placeholder="Enter Last Name"
                        required
                    />
                    <label htmlFor="email">
                        Enter Email
                    </label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Enter Email"
                        required
                    />
                    <label htmlFor="password">
                        Enter Password
                    </label>
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter Password"
                        required
                    />
                    <button
                        type="reset"
                        value="reset"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        value="Submit"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                </form>
            </fieldset>
        </div>
    </main>
    );
}