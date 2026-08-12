import { ImageResponse } from "next/og";
import { LOGO_MARK_SQUARE_B64 } from "@/lib/logo";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #070B12 0%, #0D1527 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${LOGO_MARK_SQUARE_B64}`}
          width={128}
          height={128}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
