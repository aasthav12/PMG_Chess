import { useState } from "react";
import { Link } from 'react-router-dom';

const modules = import.meta.glob("../images/*.png", { eager: true });
const OPENINGS = Object.entries(modules).map(([path, mod]) => {
    const file = path.split("/").pop().replace(".png", "");        
    const pretty = file
        .replace(/_/g, " ")                                          
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());                    

    // overrides for punctuation/spelling
    const overrides = {
        "kings gambit": "King's Gambit",
        "queens gambit": "Queen's Gambit",
        "guioco pianissimo": "Giuoco Pianissimo"                   
    };

    const name = overrides[pretty.toLowerCase()] ?? pretty;
    return { url: mod.default, name };
});

export default function Landing() {
    const [choice] = useState(
        () => OPENINGS[Math.floor(Math.random() * OPENINGS.length)] || null
    );
    return (
        <main>
            <h1>PMG Chess!</h1>
            <Link to="/SignUp">
                <button>SignUp</button>
            </Link>
            <Link to="/Login">
                <button>Login</button>
            </Link>
            {choice && (
                <>
                <img
                    src={choice.url}
                    alt={choice.name}
                    style={{ maxWidth: 480, width: "100%", display: "block", margin: "16px auto" }}
                />
                <div style={{ fontSize: "1rem", color: "#444" }}>{choice.name}</div>
                </>
            )}
        </main>
    );
}