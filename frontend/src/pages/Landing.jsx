import { useMemo } from "react";
import { Link } from "react-router-dom";
import pmgIcon from "../styles/pmg_icon.png"; // your blue logo

// auto-import all opening PNGs
const modules = import.meta.glob("../images/*.png", { eager: true });
const OPENINGS = Object.entries(modules).map(([path, mod]) => {
  const file = path.split("/").pop().replace(".png", "");
  const pretty = file.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  const overrides = {
    "kings gambit": "King's Gambit",
    "queens gambit": "Queen's Gambit",
    "guioco pianissimo": "Giuoco Pianissimo",
  };
  const name = overrides[pretty.toLowerCase()] ?? pretty;
  return { url: mod.default, name };
});

export default function Landing() {
  // pick one opening once per load
  const choice = useMemo(
    () => OPENINGS[Math.floor(Math.random() * OPENINGS.length)] ?? null,
    []
  );

  return (
    <>
      <header className="landing-header">
        <h1>PMG Chess</h1>
      </header>

      <main className="landing">
        {/* LEFT: board + caption */}
        <section className="landing-left">
          {choice && (
            <figure className="opening">
              <img src={choice.url} alt={choice.name} />
              <figcaption>{choice.name}</figcaption>
            </figure>
          )}
        </section>

        {/* RIGHT: buttons, then logo */}
        <aside className="landing-right">
          <div className="button-row">
            <Link to="/Login"  className="btn login_button">Login</Link>
            <Link to="/SignUp" className="btn signup_button">Sign Up</Link>
          </div>

          <img src={pmgIcon} alt="PMG logo" className="pmg-icon" />
        </aside>
      </main>
    </>
  );
}
