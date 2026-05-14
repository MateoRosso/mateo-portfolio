"use client";

import React from "react";

const socialIconStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textDecoration: "none",
  transition: "all 0.3s ease",
  position: "relative",
  zIndex: 1,
  cursor: "pointer",
};

const iconContainerBase: React.CSSProperties = {
  display: "inline-flex",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  transition: "all 0.3s ease",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  border: "1px solid rgba(163, 230, 53, 0.2)",
};

const iconLabelBase: React.CSSProperties = {
  marginTop: "12px",
  color: "white",
  fontWeight: 500,
  opacity: 0.7,
  transition: "all 0.3s ease",
  fontSize: "0.85rem",
};

function SocialIcon({
  href,
  label,
  children,
  hoverBg,
  hoverShadow,
  onClick,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
  hoverBg: string;
  hoverShadow: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  const containerStyle: React.CSSProperties = {
    ...iconContainerBase,
    ...(hovered ? { background: hoverBg, boxShadow: hoverShadow, transform: "translateY(-10px) scale(1.1)" } : {}),
  };

  const labelStyle: React.CSSProperties = {
    ...iconLabelBase,
    ...(hovered ? { opacity: 1, transform: "translateY(5px)" } : {}),
  };

  const inner = (
    <span
      style={socialIconStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <span style={containerStyle}>{children}</span>
      <span style={labelStyle}>{label}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

const SocialConnect = () => {
  const copyDiscord = () => {
    navigator.clipboard.writeText("materosso");
    alert("Usuario de Discord copiado: materosso");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050505 0%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1rem",
        fontFamily: "sans-serif",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", maxWidth: "48rem", margin: "0 auto", textAlign: "center", marginBottom: "4rem" }}>
        <h2
          style={{
            fontSize: "clamp(3rem, 8vw, 5rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #a3e635 0%, #4ade80 60%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Contactame
        </h2>
        <p style={{ fontSize: "1.125rem", color: "#9ca3af", maxWidth: "32rem", margin: "0 auto" }}>
          Hablemos sobre tu próximo proyecto
        </p>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: "40rem" }}>
        <div
          style={{
            borderRadius: "1.5rem",
            background: "linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.95) 100%)",
            border: "1px solid rgba(163, 230, 53, 0.2)",
            boxShadow: "0 0 60px rgba(163, 230, 53, 0.15), 0 0 120px rgba(74, 222, 128, 0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            overflow: "hidden",
            padding: "3rem 2rem",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
            {/* Instagram */}
            <SocialIcon
              href="https://www.instagram.com/mateoo.rosso/"
              label="Instagram"
              hoverBg="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"
              hoverShadow="0 0 20px rgba(225, 48, 108, 0.6), 0 8px 32px rgba(0,0,0,0.3)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "2rem", height: "2rem", color: "white" }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialIcon>

            {/* Twitter/X */}
            <SocialIcon
              href="https://x.com/MateoGraphics"
              label="Twitter / X"
              hoverBg="#000000"
              hoverShadow="0 0 20px rgba(255,255,255,0.3), 0 8px 32px rgba(0,0,0,0.3)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "2rem", height: "2rem", color: "white" }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>

            {/* Discord */}
            <SocialIcon
              label="Discord"
              hoverBg="#7289da"
              hoverShadow="0 0 20px rgba(114, 137, 218, 0.6), 0 8px 32px rgba(0,0,0,0.3)"
              onClick={copyDiscord}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "2rem", height: "2rem", color: "white" }}>
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
              </svg>
            </SocialIcon>

            {/* WhatsApp */}
            <SocialIcon
              href="https://wa.me/5491167942862"
              label="WhatsApp"
              hoverBg="#25d366"
              hoverShadow="0 0 20px rgba(37, 211, 102, 0.6), 0 8px 32px rgba(0,0,0,0.3)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "2rem", height: "2rem", color: "white" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </SocialIcon>

            {/* Email */}
            <SocialIcon
              label="Email"
              hoverBg="linear-gradient(135deg, #a3e635 0%, #4ade80 100%)"
              hoverShadow="0 0 20px rgba(163, 230, 53, 0.6), 0 8px 32px rgba(0,0,0,0.3)"
              onClick={() => {
                navigator.clipboard.writeText("rossomateoe9@gmail.com");
                alert("Email copiado: rossomateoe9@gmail.com");
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: "2rem", height: "2rem", color: "white" }}>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </SocialIcon>
          </div>

          {/* Discord hint */}
          <p style={{ textAlign: "center", marginTop: "2rem", color: "#6b7280", fontSize: "0.75rem" }}>
            Discord:{" "}
            <span
              style={{ color: "#a3e635", fontWeight: 600, cursor: "pointer" }}
              onClick={copyDiscord}
              title="Click para copiar"
            >
              materosso
            </span>{" "}
            · Click para copiar
          </p>
        </div>
      </div>
    </div>
  );
};

export { SocialConnect };
