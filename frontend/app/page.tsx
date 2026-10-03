"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [metricas, setMetricas] = useState({ ativos: 0, backlog: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const [resEq, resOs] = await Promise.all([
          fetch("https://maintflow-backend.onrender.com/equipamentos"),
          fetch("https://maintflow-backend.onrender.com/ordem-servico")
        ]);
        const dataEq = await resEq.json();
        const dataOs = await resOs.json();
        setMetricas({ ativos: dataEq.length, backlog: dataOs.length });
      } catch (error) {
        console.error("Erro ao carregar dashboard", error);
      } finally {
        setCarregando(false);
      }
    };
    buscarDados();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-8 font-sans text-slate-100">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Cabeçalho */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            Maint<span className="text-blue-500">Flow</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Painel de Controlo e Engenharia de Manutenção
          </p>
        </div>

        {/* KPIs (Dashboard) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 border-t-4 border-t-blue-500">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Total de Ativos</h3>
            <div className="text-4xl font-black text-white">
              {carregando ? "..." : metricas.ativos}
            </div>
            <p className="text-blue-400 text-sm font-medium mt-2">Equipamentos registados</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 border-t-4 border-t-amber-500">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Backlog de O.S.</h3>
            <div className="text-4xl font-black text-white">
              {carregando ? "..." : metricas.backlog}
            </div>
            <p className="text-amber-400 text-sm font-medium mt-2">Manutenções pendentes</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 border-t-4 border-t-emerald-500">
            <h3 className="text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">Status do Parque</h3>
            <div className="text-3xl font-black text-white mt-1">
              {carregando ? "..." : (metricas.backlog > 5 ? "Alerta ⚠️" : "Operacional ✅")}
            </div>
            <p className="text-slate-500 text-sm font-medium mt-2">Baseado no volume de fila</p>
          </div>
        </div>

        {/* Menus de Navegação */}
        <h2 className="text-xl font-bold text-white mb-6">Módulos do Sistema</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/equipamentos" className="block group">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800 group-hover:border-blue-500 group-hover:shadow-blue-900/20 group-hover:-translate-y-1 transition-all duration-300">
              <div className="bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-500 text-2xl mb-4">⚙️</div>
              <h2 className="text-xl font-bold text-white mb-2">Gestão de Equipamentos</h2>
              <p className="text-slate-400 text-sm">Cadastre e atualize o inventário de máquinas do chão de fábrica.</p>
            </div>
          </Link>

          <Link href="/ordens-servico" className="block group">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-800 group-hover:border-blue-500 group-hover:shadow-blue-900/20 group-hover:-translate-y-1 transition-all duration-300">
              <div className="bg-slate-800 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-500 text-2xl mb-4">📋</div>
              <h2 className="text-xl font-bold text-white mb-2">Ordens de Serviço</h2>
              <p className="text-slate-400 text-sm">Abra chamados, relate resoluções e encerre manutenções.</p>
            </div>
          </Link>
        </div>
        
      </div>
    </div>
  );
}