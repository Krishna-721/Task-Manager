import "./globals.css";

export const metadata = {
  title: "Task Board",
  description: "Frontend Assignment- task manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          text-gray-900
          relative
          overflow-x-hidden
        "
        style={{
          background: `linear-gradient(to bottom, #7ecbff 0%, #a6dcff 40%, #dff3ff 100%)`,
        }}
      >
        {/* CLOUDS */}
        <div className="absolute top-20 left-10 w-72 h-40 bg-white/70 blur-3xl rounded-full"></div>
        <div className="absolute top-60 right-10 w-80 h-48 bg-white/60 blur-[70px] rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-96 h-52 bg-white/50 blur-[90px] rounded-full"></div>

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
