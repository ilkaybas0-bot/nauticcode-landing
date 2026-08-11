import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#070B12",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(0,242,254,0.16), transparent 60%)",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#0D1527",
              border: "1px solid #1E293B",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
                fill="#00F2FE"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Nautic<span style={{ color: "#00F2FE" }}>Code</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#FFFFFF",
            textAlign: "center",
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          Charting Intelligent Code Flows for Enterprise Systems.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 26,
            color: "#94A3B8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          B2B Software Engineering
        </div>
      </div>
    ),
    { ...size }
  );
}
