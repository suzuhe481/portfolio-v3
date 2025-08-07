export const FixedBackground = ({ svgPath }: { svgPath: string }) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `url("${svgPath}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        // paddingLeft: "1px", // Padding and negative margin removes rendering artifact along border of svg.
        // paddingTop: "1px",
        // marginLeft: "-5px",
        // marginTop: "-5px",
        // transform: "translateZ(0)",
      }}
    />
  );
};
