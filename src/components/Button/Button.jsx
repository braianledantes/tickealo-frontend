export default function Button({ type = "submit", text }) {
  return (
    <button 
     type={type}
     className="text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-blue-900/25 transition-all duration-300 transform hover:scale-105 w-full flex justify-center items-center"
     style={{ background: 'linear-gradient(135deg, #03045E 0%, #010030 100%)' }}
    >
    {text}
    </button>
  );
}
