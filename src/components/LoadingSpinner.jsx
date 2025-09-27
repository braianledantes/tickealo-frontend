export default function LoadingSpinner({ size = 64, borderWidth = 8 }) {
  return (
    <div className="flex justify-center items-center h-64">
      <div
        className="rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          border: `${borderWidth}px solid transparent`,
          borderTop: `${borderWidth}px solid #03055F`,
          borderRight: `${borderWidth}px solid #00B4D8`,
          borderBottom: `${borderWidth}px solid #90E0EF`,
          borderLeft: `${borderWidth}px solid #CAF0F8`,
        }}
      ></div>
    </div>
  );
}
