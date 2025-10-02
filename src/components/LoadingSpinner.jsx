export default function LoadingSpinner({ size = 64, borderWidth = 8 , className=""}) {
  return (
    <main className="flex-1 p-6 h-screen overflow-y-auto scrollbar-none">
      <div className="flex items-center justify-center w-full h-full">
        <div
          className={`rounded-full animate-spin ${className}`}
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
    </main>
  );
}
