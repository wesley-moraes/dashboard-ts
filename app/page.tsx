'use client'

import { useState } from "react";
import Acompanhamento from "./acompanhamento";
import Link from "next/link";
import Historico from "./historico";

export default function Home() {

  //resposta do backend
  const dashboardData = {
    contasPagar: {
      jaPago: 120500.00,
      aPagar: 85000.00,
      vencidos: 15000.00,
      venceEm7Dias: 30000.00,
      total: 205000.00 // jaPago + aPagar
    },
    contasReceber: {
      jaRecebido: 250000.00,
      aReceber: 180000.00,
      total: 430000.00
    }
  }

  type PeriodType = "daily" | "monthly" | "annual" | "custom";

  interface PeriodLabelsProps {
    daily: string;
    monthly: string;
    annual: string;
    custom: string
  }

  const [activeTab, setActiveTab] = useState("tracking");

  const [periodType, setPeriodType] = useState<PeriodType>("daily"); // "daily", "monthly", "annual"

  const periodLabels: PeriodLabelsProps = { //Para exibir no titulo
    daily: "Diário",
    monthly: "Mensal",
    annual: "Anual",
    custom: "Personalizado"
  };

  const [dateFilter, setDateFilter] = useState(""); //Disponibilização da data para filtrar
  const handleChangeDate = (date: string) => {
    setDateFilter(date);
    console.log("pegou");
    console.log("date:", date);
  }

  return (
    <div className="container bg-stone-300 mx-auto">
      <header>
        <h1>Monitor Financeiro {`: ${periodLabels[periodType]}`}</h1>
      </header>
      <div className="bg-grey-400">
        <nav>
          <ul>
            <li>
              <Link href="#" onClick={() => setActiveTab("tracking")}>Acompanhamento</Link>
            </li>
            <li>
              <Link href="#" onClick={() => setActiveTab("history")}>Histórico</Link>
            </li>
          </ul>
        </nav>

        <div>
          <div>
            <select
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value as PeriodType)}
            >
              <option value="daily">Diário</option>
              <option value="monthly">Mensal</option>
              <option value="annual">Anual</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
          <div>
            {periodType === "daily" && (
              <input
                type="date"
                onChange={(e) => handleChangeDate(e.target.value)}
              />
            )}

            {periodType === "monthly" && (
              <input
                type="month"
                onChange={(e) => handleChangeDate(e.target.value)}
              />
            )}

            {periodType === "annual" && (
              <input
                type="number"
                min="2020"
                max="2030"
                step="1"
                placeholder="Ano"
                onChange={(e) => handleChangeDate(e.target.value)}
              />
            )}
          </div>


        </div>

        <main>
          {activeTab === "tracking" && (
            <Acompanhamento 
              dashboardData={dashboardData}
            />
          )}
          {activeTab === "history" && (
            <Historico />
          )}


        </main>

      </div>
    </div>
  );
}
