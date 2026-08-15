"use client";

import React, { useState } from "react";
import { DollarSign, Scale, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

export function FoodCostCalculator() {
  const { openModal } = useLeadStore();
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(120000);
  const [currentFoodCostPct, setCurrentFoodCostPct] = useState<number>(32);

  const estimatedSavingsPct = 3.4; // 3.4% recovery to net EBITDA
  const annualSavings = Math.round((monthlyRevenue * (estimatedSavingsPct / 100)) * 12);
  const monthlySavings = Math.round(monthlyRevenue * (estimatedSavingsPct / 100));
  const optimizedFoodCostPct = (currentFoodCostPct - estimatedSavingsPct).toFixed(1);

  return (
    <section id="calculador" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-[#0284c7]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIMULADOR DE IMPACTO EN FOOD COST</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Calcula el EBITDA Recuperado en tu Cocina.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Las compras desincronizadas y las mermas no auditadas drenan silenciosamente entre el 2.5% y el 4.5% de la facturación. Descubre tu ahorro neto con estandarización y automatización.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Box (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 space-y-6 border border-slate-200/90 shadow-sm">
            
            {/* Slider 1: Monthly Revenue */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#0284c7]" /> Facturación Mensual Operativa:
                </span>
                <span className="text-xl font-black text-slate-900 font-mono bg-slate-50 px-3.5 py-1 rounded-xl border border-slate-200 shadow-inner">
                  ${monthlyRevenue.toLocaleString()} USD
                </span>
              </div>

              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
              />

              <div className="flex justify-between text-xs font-mono text-slate-500">
                <span>$20k (1-2 Sucursales)</span>
                <span>$250k (Cadena Mediana)</span>
                <span>$500k+ (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Current Food Cost % */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-[#c2410c]" /> Food Cost Actual Estimado:
                </span>
                <span className="text-xl font-black text-[#c2410c] font-mono bg-slate-50 px-3.5 py-1 rounded-xl border border-slate-200 shadow-inner">
                  {currentFoodCostPct}%
                </span>
              </div>

              <input
                type="range"
                min={24}
                max={42}
                step={0.5}
                value={currentFoodCostPct}
                onChange={(e) => setCurrentFoodCostPct(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
              />

              <div className="flex justify-between text-xs font-mono text-slate-500">
                <span>24% (Alta Eficiencia)</span>
                <span>32% (Promedio de Mercado)</span>
                <span>40%+ (Merma Crítica)</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs font-medium text-slate-700">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-slate-500 text-[11px]">Eliminación de Compras Urgentes:</div>
                <div className="text-emerald-700 font-bold mt-0.5">-100% sobreprecios a proveedores</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="text-slate-500 text-[11px]">Control de Rendimiento Crudo/Cocido:</div>
                <div className="text-[#0284c7] font-bold mt-0.5">Auditoría continua en balanza digital</div>
              </div>
            </div>

          </div>

          {/* Results Box (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900 text-white p-8 sm:p-9 space-y-6 shadow-xl relative overflow-hidden">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                RETORNO DE INVERSIÓN (ROI)
              </span>
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 font-semibold">
                EBITDA DIRECTO
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-slate-400">Ahorro Anual Proyectado:</div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
                ${annualSavings.toLocaleString()} <span className="text-xl font-normal text-cyan-300">USD</span>
              </div>
              <div className="text-xs text-emerald-400 font-mono mt-1">
                +${monthlySavings.toLocaleString()} USD / mes recuperados en margen neto
              </div>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Food Cost Optimizado:</span>
                <span className="text-cyan-300 font-bold">{optimizedFoodCostPct}% ({currentFoodCostPct}% actual)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Plazo de Amortización:</span>
                <span className="text-white font-bold">&lt; 45 días de operación</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full text-sm font-bold shadow-[0_4px_14px_0_rgba(2,132,199,0.39)]"
            >
              Auditar el Food Cost de mi Empresa
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}
