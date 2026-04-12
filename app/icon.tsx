import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
  const imageBuffer = await readFile(
    `${process.cwd()}/public/images/profile.jpeg`,
  );
  const imageSrc = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220",
        }}
      >
        <img
          src={imageSrc}
          alt="Kaung Sat Hein"
          width="512"
          height="512"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
}
