import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-8 font-sans">
      <div className="max-w-3xl text-center">
        {/* Logo com Gradiente */}
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
            MaintFlow
          </span>
        </h1>
        <p className="text-xl text-slate-500 mb-12 font-medium">
          O controle de manutenção inteligente para a sua indústria.
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <Link href="/equipamentos" className="block w-full sm:w-1/2 group">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl group-hover:scale-110 transition-transform duration-500">⚙️</div>
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 text-3xl mb-6">⚙️</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Equipamentos</h2>
              <p className="text-slate-500 leading-relaxed">Cadastre e gerencie o inventário de máquinas e ativos da fábrica.</p>
            </div>
          </Link>

          <Link href="/ordens-servico" className="block w-full sm:w-1/2 group">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl group-hover:scale-110 transition-transform duration-500">📋</div>
              <div className="bg-violet-50 w-16 h-16 rounded-2xl flex items-center justify-center text-violet-600 text-3xl mb-6">📋</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Ordens de Serviço</h2>
              <p className="text-slate-500 leading-relaxed">Abra chamados, relate falhas e acompanhe manutenções pendentes.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}