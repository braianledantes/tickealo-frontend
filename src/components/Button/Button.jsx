export default function Button({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}   
      className="text-white tracking-wider font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-blue-900/25 transition-all duration-300 transform hover:scale-105 w-full flex justify-center items-center hover:cursor-pointer"
      style={{ background: 'linear-gradient(135deg, #03045E 0%, #010030 100%)' }}
    >
      {children}
    </button>
  );
}