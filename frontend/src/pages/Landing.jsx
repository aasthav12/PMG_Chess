import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main>
        <h1>PMG Chess!</h1>
        <Link to="/SignUp">
            <button>SignUp</button>
        </Link>
        <Link to="/Login">
            <button>Login</button>
        </Link>
    </main>
  );
}