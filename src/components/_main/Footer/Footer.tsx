"use client";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(148,163,184,0.1)] bg-[rgba(10,10,15,0.8)]">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-geist-mono text-sm text-slate-500">
            © {currentYear} Hector Suazo
          </p>
        </div>
      </div>
    </footer>
  );
};
