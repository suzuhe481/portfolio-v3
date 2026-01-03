"use client";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center bg-black py-4">
      <div className="text-white">© {currentYear} Hector Suazo</div>
    </div>
  );
};
