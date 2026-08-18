import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Joshua Rio — Full‑Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'sans-serif',
          color: 'black',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 64 }}>Joshua Rio</h1>
        <h2 style={{ margin: 0, fontSize: 32 }}>Full‑Stack Developer</h2>
        <p style={{ marginTop: 16, fontSize: 24 }}>joshuario.vercel.app</p>
      </div>
    ),
    { ...size }
  );
}