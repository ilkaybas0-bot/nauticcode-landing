import { ImageResponse } from "next/og";
import { LOGO_MARK_SQUARE_B64 } from "@/lib/logo";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#030304",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${LOGO_MARK_SQUARE_B64}`}
          width={26}
          height={26}
          alt=""
        />
      </div>
    ),
    { ...size }
  );
}
