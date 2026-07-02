import Link from "next/link";
import Navbar from "./Navbar";

function Logo() {
  return (
    <Link href="/" className="nav-logo" aria-label="Nivela - página inicial">
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <circle cx="18" cy="18" r="17" stroke="#CBB354" strokeWidth="1" />
        <path d="M10 24 L18 10 L26 24" stroke="white" strokeWidth="2" fill="none" />
        <path d="M14 24 L18 16 L22 24" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.15)" />
        <path d="M7 26 Q18 20 29 26" stroke="white" strokeWidth="1.2" fill="none" />
        <path d="M7 29 Q18 24 29 29" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        <circle cx="26" cy="10" r="3" stroke="#CBB354" strokeWidth="1.2" fill="none" />
      </svg>

      <span>
        <span className="nav-logo-text">NIVELA</span>
        <span className="nav-logo-sub">Território & Patrimônio</span>
      </span>
    </Link>
  );
}

export default function Header() {
  return (
    <header className="nav">
      <Logo />
      <Navbar />
      <Link href="/avaliacao-tecnica" className="nav-cta">
        Avaliação Técnica
      </Link>
    </header>
  );
}
