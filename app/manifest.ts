import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aufwind AI",
    short_name: "Aufwind",
    description:
      "Aufwind AI — das KI-System das lokale Unternehmen nutzen um keine Anfrage mehr zu verlieren. 24/7 aktiv.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#030712",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
