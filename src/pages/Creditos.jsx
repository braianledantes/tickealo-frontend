import Sidebar from "../components/Sidebar";

export default function Creditos() {
  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #010030 0%, #00033d 50%, #160078 100%)' }}>
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Créditos</h2>
          <p className="text-gray-200">Historial y balance de créditos.</p>
        </div>
      </main>
    </div>
  );
}