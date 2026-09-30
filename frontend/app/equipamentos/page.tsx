"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EquipamentosPage() {
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [nome, setNome] = useState("");

  const buscarEquipamentos = async () => {
    try {
      const res = await fetch("http://localhost:3001/equipamentos");
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
      await fetch("http://localhost:3001/equipamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
      setNome("");
      buscarEquipamentos();
    } catch (error) {
      console.error("Erro ao guardar", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Ativos & Máquinas</h1>
            <p className="text-slate-500 mt-2 font-medium">Controle central do seu parque industrial</p>
          </div>
          <Link href="/" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all hover:bg-slate-50 text-center">
            Voltar ao Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="lg:col-span-1">
            <form onSubmit={salvarEquipamento} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-8">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-6">
                ✨
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Novo Cadastro</h2>
              
              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Qual o nome da máquina?</label>
                  <input
                    type="text"
                    placeholder="Ex: Torno CNC Mod. 4"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200">
                  Cadastrar Máquina
                </button>
              </div>
            </form>
          </div>

          {/* Listagem */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Inventário</h2>
                <span className="bg-indigo-50 text-indigo-700 font-bold px-4 py-1.5 rounded-full text-sm">
                  {equipamentos.length} Registros
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                {equipamentos.length === 0 ? (
                  <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-500 font-medium">Nenhum equipamento cadastrado ainda.</p>
                  </div>
                ) : (
                  equipamentos.map((eq: any) => (
                    <div key={eq.id} className="group flex justify-between items-center p-5 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-md hover:bg-white bg-slate-50/50 transition-all cursor-default">
                      <div className="flex items-center gap-5">
                        <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 font-bold text-lg group-hover:scale-110 transition-transform">
                          {eq.nome.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-700 text-lg">{eq.nome}</span>
                      </div>
                      <span className="bg-white text-slate-400 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                        ID: {eq.id}
                      </span>
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