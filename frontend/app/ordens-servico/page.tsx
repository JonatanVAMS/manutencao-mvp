"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function OrdensServicoPage() {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [descricao, setDescricao] = useState("");
  const [equipamentoId, setEquipamentoId] = useState("");
  const [busca, setBusca] = useState("");

  
  const [modalAberto, setModalAberto] = useState(false);
  const [ordemSendoEncerrada, setOrdemSendoEncerrada] = useState<number | null>(null);
  
 
  const [resolucao, setResolucao] = useState("");
  const [tempoReparo, setTempoReparo] = useState("");
  const [material, setMaterial] = useState("");
  const [tecnico, setTecnico] = useState("");

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
        body: JSON.stringify({ descricao, equipamentoId: Number(equipamentoId), status: "PENDENTE" }),
      });
      setDescricao(""); 
      setEquipamentoId("");
      buscarOrdens(); 
    } catch (error) {
      console.error("Erro ao guardar O.S.", error);
    }
  };

  
  const abrirModalEncerramento = (id: number) => {
    setOrdemSendoEncerrada(id);
    setResolucao("");
    setTempoReparo("");
    setMaterial("");
    setTecnico("");
    setModalAberto(true);
  };

  
  const confirmarEncerramento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ordemSendoEncerrada) return;

    try {
      await fetch(`https://maintflow-backend.onrender.com/ordem-servico/${ordemSendoEncerrada}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: "CONCLUIDA", 
          resolucao,
          tempoReparo,
          material,
          tecnico
        }),
      });
      setModalAberto(false);
      buscarOrdens(); 
    } catch (error) {
      console.error("Erro ao encerrar", error);
    }
  };

  const ordensFiltradas = ordens.filter(ordem => 
    ordem.descricao.toLowerCase().includes(busca.toLowerCase()) || 
    (ordem.equipamento?.nome || "").toLowerCase().includes(busca.toLowerCase())
  );

  const pendentes = ordensFiltradas.filter(o => o.status === "PENDENTE" || !o.status);
  const concluidas = ordensFiltradas.filter(o => o.status === "CONCLUIDA");

  return (
    <div className="min-h-screen bg-slate-950 p-8 font-sans text-slate-100 relative">
      
      {/* MODAL DE ENCERRAMENTO */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-blue-500">✓</span> Laudo de Intervenção Técnica
              </h3>
              <button onClick={() => setModalAberto(false)} className="text-slate-400 hover:text-white transition-colors font-bold text-xl">✕</button>
            </div>
            
            <form onSubmit={confirmarEncerramento} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Técnico Responsável</label>
                  <input
                    type="text"
                    placeholder="Ex: João Silva"
                    value={tecnico}
                    onChange={(e) => setTecnico(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Tempo de Reparo</label>
                  <input
                    type="text"
                    placeholder="Ex: 2h 30m"
                    value={tempoReparo}
                    onChange={(e) => setTempoReparo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-bold text-slate-400 mb-2">Materiais Utilizados (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: 1x Rolamento SKF, 200g Graxa Azul"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-400 mb-2">Solução / Procedimento Adotado</label>
                <textarea
                  placeholder="Descreva o passo a passo da resolução..."
                  value={resolucao}
                  onChange={(e) => setResolucao(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-all h-28 resize-none"
                  required
                />
              </div>

              <div className="flex gap-4 justify-end">
                <button type="button" onClick={() => setModalAberto(false)} className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-all">
                  Cancelar
                </button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-500 shadow-lg shadow-blue-900/50 transition-all">
                  Finalizar Manutenção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Manutenções</h1>
            <p className="text-slate-400 mt-2 font-medium">Abertura e Histórico de Ordens de Serviço</p>
          </div>
          <Link href="/" className="bg-slate-900 border border-slate-700 hover:border-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg transition-all text-center">
            Voltar ao Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Formulário Nova OS */}
          <div className="xl:col-span-1">
            <form onSubmit={salvarOrdem} className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800 sticky top-8">
              <div className="w-12 h-12 bg-slate-800 text-amber-500 rounded-2xl flex items-center justify-center text-xl mb-6">🔧</div>
              <h2 className="text-2xl font-bold text-white mb-6">Nova O.S.</h2>
              
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Máquina com Defeito</label>
                  <select
                    value={equipamentoId}
                    onChange={(e) => setEquipamentoId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white p-3.5 rounded-xl focus:outline-none focus:border-blue-500 transition-all cursor-pointer font-medium"
                    required
                  >
                    <option value="" disabled>Selecione no inventário...</option>
                    {equipamentos.map((eq) => (
                      <option key={eq.id} value={eq.id}>[{eq.tag}] {eq.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">Sintoma / Falha</label>
                  <textarea
                    placeholder="Descreva o que ocorreu..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-3.5 rounded-xl focus:outline-none focus:border-blue-500 transition-all h-32 resize-none font-medium"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-900/50 mt-2">
                  Emitir Ordem
                </button>
              </div>
            </form>
          </div>

          <div className="xl:col-span-2 flex flex-col gap-8">
            
            {/* Fila de Trabalho */}
            <div className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-white">Fila de Trabalho</h2>
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full md:w-64 bg-slate-950 border border-slate-700 text-white placeholder-slate-600 p-2.5 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              
              <div className="flex flex-col gap-5">
                {pendentes.length === 0 ? (
                  <div className="text-center py-10 bg-slate-950/50 rounded-2xl border-2 border-dashed border-slate-800">
                    <p className="text-slate-500 font-medium">Nenhuma manutenção pendente.</p>
                  </div>
                ) : (
                  pendentes.map((ordem: any) => (
                    <div key={ordem.id} className="group bg-slate-950 rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-500"></div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="pl-3 w-full">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">O.S. #{ordem.id}</span>
                            <span className="bg-amber-900/40 text-amber-500 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">Pendente</span>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-slate-800 text-blue-400 font-bold px-3 py-1.5 rounded-lg mb-4">
                            <span>⚙️</span> {ordem.equipamento?.nome || "Removido"}
                          </div>
                          <p className="text-slate-300 font-medium leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-800">
                            {ordem.descricao}
                          </p>
                        </div>
                        <button 
                          onClick={() => abrirModalEncerramento(ordem.id)}
                          className="w-full sm:w-auto bg-slate-800 text-emerald-500 border border-emerald-900/50 hover:bg-emerald-600 hover:text-white px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center mt-2 sm:mt-0 whitespace-nowrap"
                        >
                          ✓ Encerrar O.S.
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Histórico  */}
            <div className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800">
              <h2 className="text-xl font-bold text-slate-400 mb-6">Histórico de Resoluções</h2>
              <div className="flex flex-col gap-5">
                {concluidas.length === 0 ? (
                  <p className="text-slate-600 text-sm">Nenhum histórico registrado.</p>
                ) : (
                  concluidas.map((ordem: any) => (
                    <div key={ordem.id} className="bg-slate-950 rounded-xl border border-slate-800 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4 border-b border-slate-800 pb-4">
                        <span className="text-xs font-black text-slate-500 uppercase">O.S. #{ordem.id}</span>
                        <span className="bg-emerald-900/30 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Concluída</span>
                        <span className="text-slate-300 text-sm font-bold ml-auto">{ordem.equipamento?.nome || "Removido"}</span>
                      </div>
                      
                      <div className="text-slate-400 text-sm mb-4">
                        <span className="text-slate-500 font-bold">Relato Inicial:</span> {ordem.descricao}
                      </div>
                      
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 border-l-2 border-l-blue-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 border-b border-slate-800 pb-3">
                           <div>
                             <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Técnico</span>
                             <span className="text-slate-300 text-sm font-bold flex items-center gap-1">👨‍🔧 {ordem.tecnico || "N/D"}</span>
                           </div>
                           <div>
                             <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Tempo Reparo</span>
                             <span className="text-slate-300 text-sm font-bold flex items-center gap-1">⏱️ {ordem.tempoReparo || "N/D"}</span>
                           </div>
                           <div>
                             <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Material</span>
                             <span className="text-slate-300 text-sm font-bold flex items-center gap-1">🛠️ {ordem.material || "Nenhum"}</span>
                           </div>
                        </div>
                        <div>
                          <span className="text-blue-400 font-bold text-[10px] uppercase block mb-1">Procedimento Realizado</span>
                          <span className="text-slate-300 text-sm">{ordem.resolucao}</span>
                        </div>
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