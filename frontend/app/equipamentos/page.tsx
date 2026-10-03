"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquipamentosPage() {
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [tag, setTag] = useState("");

  const buscarEquipamentos = async () => {
    try {
      const res = await fetch("https://maintflow-backend.onrender.com/equipamentos");
      if (!res.ok) throw new Error("Backend desligado");
      const data = await res.json();
      setEquipamentos(data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos.", error);
    }
  };

  useEffect(() => {
    buscarEquipamentos();
  }, []);

  const salvarEquipamento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://maintflow-backend.onrender.com/equipamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, tag }),
      });
      setNome("");
      setTag("");
      buscarEquipamentos();
    } catch (error) {
      console.error("Erro ao guardar", error);
    }
  };

  const excluirEquipamento = async (id: number) => {
    const confirmar = window.confirm("Excluir esta máquina vai apagar todo o histórico de O.S. dela. Tem a certeza?");
    if (!confirmar) return;

    try {
      await fetch(`https://maintflow-backend.onrender.com/equipamentos/${id}`, {
        method: "DELETE",
      });
      buscarEquipamentos();
    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Ativos & Máquinas</h1>
            <p className="text-slate-400 mt-2 font-medium">Controlo central do seu parque industrial</p>
          </div>
          <Link href="/" className="bg-slate-900 border border-slate-700 hover:border-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all text-center">
            Voltar ao Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={salvarEquipamento} className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800 sticky top-8">
              <div className="w-12 h-12 bg-slate-800 text-blue-500 rounded-2xl flex items-center justify-center text-xl mb-6">✨</div>
              <h2 className="text-2xl font-bold text-white mb-6">Novo Cadastro</h2>
              
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <label className="block text-sm font-bold text-slate-400 mb-2">TAG</label>
                    <input
                      type="text"
                      placeholder="TRN-01"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all uppercase"
                      required
                    />
                  </div>
                  
                  <div className="w-2/3">
                    <label className="block text-sm font-bold text-slate-400 mb-2">Nome</label>
                    <input
                      type="text"
                      placeholder="Torno CNC Mod. 4"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-900/50 mt-2">
                  Registar Máquina
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Inventário</h2>
                <span className="bg-slate-800 text-blue-400 font-bold px-4 py-1.5 rounded-full text-sm border border-slate-700">
                  {equipamentos.length} Registos
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                {equipamentos.length === 0 ? (
                  <div className="text-center py-16 bg-slate-950/50 rounded-2xl border-2 border-dashed border-slate-800">
                    <p className="text-slate-500 font-medium">Nenhum equipamento registado ainda.</p>
                  </div>
                ) : (
                  equipamentos.map((eq: any) => (
                    <div key={eq.id} className="group flex justify-between items-center p-5 rounded-2xl border border-slate-800 hover:border-blue-500 hover:bg-slate-800/50 transition-all">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-lg group-hover:scale-110 transition-transform">
                          {eq.nome.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-100 text-lg">{eq.nome}</span>
                           <span className="text-slate-500 text-sm font-medium">TAG: {eq.tag || "N/A"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-slate-950 text-slate-400 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-800">
                          ID: {eq.id}
                        </span>
                        <button onClick={() => excluirEquipamento(eq.id)} className="text-red-500 hover:text-red-400 text-sm font-bold transition-colors">
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}