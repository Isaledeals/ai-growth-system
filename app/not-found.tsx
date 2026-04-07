import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Aufwind AI",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 text-center">
      {/* Background gradient orbs */}
      <div
        className="pointer-events-none absolute left-1/3 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[120px]"
        style={{
          backgroundImage: "radial-gradient(circle, #3B82F6, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/3 right-1/3 h-[300px] w-[300px] translate-x-1/2 translate-y-1/2 rounded-full opacity-10 blur-[120px]"
        style={{
          backgroundImage: "radial-gradient(circle, #10B981, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* 404 number */}
        <h1
          className="text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[10rem] bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #3B82F6, #10B981)",
          }}
        >
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
          Seite nicht gefunden
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-md text-base text-gray-400">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>

        {/* Back to home button */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-emerald-500/25 sm:text-lg"
          style={{
            backgroundImage: "linear-gradient(135deg, #10B981, #059669)",
          }}
        >
          Zur&uuml;ck zur Startseite
        </Link>
      </div>
    </div>
  );
}
