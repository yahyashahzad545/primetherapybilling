import { ImageResponse } from "next/og";

// Share image for links to any page (LinkedIn, Facebook, messages): the brand name and promise
// on the brand purple, generated at build time.
export const alt = "Prime Therapy Billing: therapy-only billing for PT, OT, SLP, ABA, and mental health practices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #591e60 0%, #45134b 60%, #2f0c33 100%)",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 420, height: 420, borderRadius: 9999, border: "56px solid rgba(217,89,89,0.35)", display: "flex" }} />
        <div style={{ position: "absolute", right: 140, bottom: -160, width: 320, height: 320, borderRadius: 9999, background: "rgba(255,255,255,0.06)", display: "flex" }} />
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4, color: "#f5a5a5", textTransform: "uppercase" }}>
          Prime Therapy Billing
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 900 }}>
          Therapy Billing Services for PT, OT, SLP, ABA, and Mental Health
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "rgba(255,255,255,0.85)" }}>
          Billing, credentialing, and RCM under one rate.
        </div>
      </div>
    ),
    { ...size },
  );
}
