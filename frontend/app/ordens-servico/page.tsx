"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrdensServicoPage() {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  
  const [descricao, setDescricao] = useState("");
  const [equipamentoId, setEquipamentoId] = useState("");

  const buscarOrdens = async () => {
    try {
      const res = await fetch("https://maintflow-backend.onrender.com/ordem-servico");
      if (!res.ok) throw new Error("Backend desligado");
      const data = await res.json();
      setOrdens(data);
    } catch (error) {
      console.error("Erro ao buscar ordens", error);
    }
  };

  const buscarEquipamentos = async () => {
    try {
      const res = await fetch("https://maintflow-backend.onrender.com/equipamentos");
      const data = await res.json();
      setEquipamentos(data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos", error);
    }
  };

  useEffect(() => {
    buscarOrdens();
    buscarEquipamentos();
  }, []);

  const salvarOrdem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://maintflow-backend.onrender.com/ordem-servico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          descricao, 
          equipamentoId: Number(equipamentoId) 
        }),
      });
      setDescricao(""); 
      setEquipamentoId("");
      buscarOrdens(); 
    } catch (error) {
      console.error("Erro ao guardar O.S.", error);
    }
  };

  const encerrarOrdem = async (id: number) => {
    const confirmar = window.confirm("Finalizar esta manutenção? A O.S. será concluída.");
    if (!confirmar) return;

    try {
      await fetch(`https://maintflow-backend.onrender.com/ordem-servico/${id}`, {
        method: "DELETE",
      });
      buscarOrdens(); 
    } catch (error) {
      console.error("Erro ao encerrar", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Manutenções</h1>
            <p className="text-slate-500 mt-2 font-medium">Abertura e triagem de Ordens de Serviço</p>
          </div>
          <Link href="/" className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-all hover:bg-slate-50 text-center">
            Voltar ao Menu
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Formulário */}
          <div className="xl:col-span-1">
            <form onSubmit={salvarOrdem} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center text-xl mb-6">
                🔧
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Nova O.S.</h2>
              
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Máquina com Defeito</label>
                  <select
                    value={equipamentoId}
                    onChange={(e) => setEquipamentoId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer font-medium"
                    required
                  >
                    <option value="" disabled>Selecione no inventário...</option>
                    {equipamentos.map((eq) => (
                      <option key={eq.id} value={eq.id}>
                        {eq.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Sintoma / Falha</label>
                  <textarea
                    placeholder="Descreva o que ocorreu com a máquina..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all h-32 resize-none font-medium"
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-900/20 mt-2">
                  Emitir Ordem
                </button>
              </div>
            </form>
          </div>

          {/* Fila */}
          <div className="xl:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Fila de Trabalho</h2>
                <span className="bg-amber-50 text-amber-700 font-bold px-4 py-1.5 rounded-full text-sm">
                  {ordens.length} Pendentes
                </span>
              </div>
              
              <div className="flex flex-col gap-5">
                {ordens.length === 0 ? (
                  <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <span className="text-5xl block mb-4">🏆</span>
                    <p className="text-slate-800 font-bold text-xl">Tudo em dia!</p>
                    <p className="text-slate-500 font-medium mt-1">Nenhuma manutenção pendente na fábrica.</p>
                  </div>
                ) : (
                  ordens.map((ordem: any) => (
                    <div key={ordem.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-6 relative overflow-hidden">
                      {/* Borda de status esquerda */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-400"></div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="pl-3">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">O.S. #{ordem.id}</span>
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                              Em Progresso
                            </span>
                          </div>
                          
                          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-lg mb-4">
                            <span>⚙️</span> {ordem.equipamento?.nome || "Máquina Removida"}
                          </div>

                          <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                            {ordem.descricao}
                          </p>
                        </div>
                        
                        <button 
                          onClick={() => encerrarOrdem(ordem.id)}
                          className="w-full sm:w-auto bg-white text-emerald-600 border-2 border-emerald-100 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-2 sm:mt-0 shadow-sm"
                        >
                          ✓ Encerrar O.S.
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