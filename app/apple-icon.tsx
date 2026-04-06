import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3B82F6, #10B981)',
          borderRadius: 34,
        }}
      >
        <span
          style={{
            fontSize: 90,
            fontWeight: 700,
            color: 'white',
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          AG
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
