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
          B2B Software Development
        </div>
      </div>
    ),
    { ...size }
  );
}
