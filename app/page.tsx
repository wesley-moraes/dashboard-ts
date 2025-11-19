'use client'

import { useState } from "react";
import Acompanhamento from "./components/Acompanhamento";
import moment from "moment";

import responseChartColumn from "./responseChartColumn.json";
import responseChartPizza from "./responseChartPizza.json";
import Header from "./components/FinancialMonitor/Header";
import PeriodSelector from "./components/FinancialMonitor/PeriodSelector";
import DateFilters from "./components/FinancialMonitor/DateFilter";

export default function Home() {

  interface ChartItem {
    data: string;
    diaSemana: string;
    contasReceber: number;
    contasPagar: number;
    saldo: number;
  }

  type PeriodType = "daily" | "monthly" | "annual" | "custom";

  interface PeriodLabelsProps {
    daily: string;
    monthly: string;
    annual: string;
    custom: string
  }

  const periodLabels: PeriodLabelsProps = { //Para exibir no titulo
    daily: "Diário",
    monthly: "Mensal",
    annual: "Anual",
    custom: "Personalizado"
  };

  //resposta do backend - substituir
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



  const [periodType, setPeriodType] = useState<PeriodType>("daily"); // "daily", "monthly", "annual"

  const seriesPizza = responseChartPizza.contasPagar.categorias.map(cat => cat.valor); //Valor
  const labelsPizza = responseChartPizza.contasPagar.categorias.map(cat => cat.nome); //Legenda

  const graphPizzaData = {
    series: seriesPizza,
    labels: labelsPizza
  }

  //Gráfico de barras bidirecional
  const seriesColumnContasReceber = responseChartColumn.data.items.map(item => item.contasReceber); //Coluna de contas a receber
  const seriesColumnContasPagar = responseChartColumn.data.items.map(item => item.contasPagar); //Coluna de contas a pagar
  let xaxisCategories: any = []; //Legenda
  switch (periodType) {
    case "daily":
      xaxisCategories = responseChartColumn.data.items.map(item => moment(item.data).locale('pt-br').format("DD/MM"));
      break;
    case "monthly":
      xaxisCategories = responseChartColumn.data.items.map(item => moment(item.data).locale('pt-br').format("DD/MM"));
      break;
    case "annual":
      xaxisCategories = responseChartColumn.data.items.map(item => moment(item.data).locale('pt-br').format("MMMM [de] YY"));
      break;
    case "custom":
      xaxisCategories = responseChartColumn.data.items.map(item => moment(item.data).locale('pt-br').format("DD/MM"));
      break;
  }

  //Calcula o valor maximo e minimo a ser exibido no yaxis
  function calcularMinMaxGrafico(items: ChartItem[]) {
    // Pega todos os valores de contas a receber
    const valoresReceber = items.map(item => item.contasReceber);

    // Pega todos os valores de contas a pagar (em valor absoluto pra comparar)
    const valoresPagar = items.map(item => Math.abs(item.contasPagar));

    // Encontra o maior valor de cada um
    const maxReceber = Math.max(...valoresReceber);
    const maxPagar = Math.max(...valoresPagar);

    // Adiciona uma margem de 10%
    const margemSeguranca = 1.1;

    const max = Math.ceil(maxReceber * margemSeguranca);
    const min = -Math.ceil(maxPagar * margemSeguranca);

    return { min, max };
  }

  // ADICIONA AQUI:
  const { min, max } = calcularMinMaxGrafico(responseChartColumn.data.items);

  const seriesObjColumn = [
    {
      name: 'Contas a Receber',
      data: seriesColumnContasReceber
    },
    {
      name: 'Contas a Pagar',
      data: seriesColumnContasPagar
    }
  ]



  const [dateFilter, setDateFilter] = useState(""); //Disponibilização da data para filtrar
  const [dateEndFilter, setDateEndFilter] = useState(""); //Disponibilização da data para filtrar quando personalizado
  const handleChangeDate = (date: string) => {
    setDateFilter(date);
  }

  const handleChangeEndDate = (date: string) => {
    setDateEndFilter(date);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Filtros */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Header periodType={periodType} periodLabels={periodLabels} />

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <PeriodSelector
                periodType={periodType}
                onChange={setPeriodType}
              />

              <DateFilters
                periodType={periodType}
                onChangeDate={handleChangeDate}
                onChangeEndDate={handleChangeEndDate}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        <Acompanhamento
          dashboardData={dashboardData}
          graphPizzaData={graphPizzaData}
          chartColumn={seriesObjColumn}
          chartColumnCategories={xaxisCategories}
          min={min}
          max={max}
        />
      </main>
    </div>
  );
}
