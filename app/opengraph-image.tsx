import { ImageResponse } from "next/og";
import { LOGO_MARK_SQUARE_B64 } from "@/lib/logo";

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
          background: "#030304",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(139,92,246,0.16), transparent 60%)",
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
              background: "#0F0B1A",
              border: "1px solid #241F33",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:image/png;base64,${LOGO_MARK_SQUARE_B64}`}
              width={36}
              height={36}
              alt=""
            />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              fontWeight: 600,
              color: "#F2F4F7",
              letterSpacing: "-0.02em",
            }}
          >
            Mogens <span style={{ color: "#8B5CF6" }}>Software</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#F2F4F7",
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
            color: "#9CA6B4",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          B2B Software Development
        </div>
      </div>
    ),
    { ...size }
  );
}
