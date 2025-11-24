'use client'

import { useEffect, useState } from "react";
import Acompanhamento from "./components/Acompanhamento";
import moment from "moment";

import responseChartColumn from "./responseChartColumn.json";
import responseChartPizza from "./responseChartPizza.json";
import Header from "./components/FinancialMonitor/Header";
import PeriodSelector from "./components/FinancialMonitor/PeriodSelector";
import DateFilters from "./components/FinancialMonitor/DateFilter";
import ButtonFilter from "./components/FinancialMonitor/ButtonFilter";
import Spinner from "./Spinner";

export default function Home() {

  interface ChartItem {
    data: string;
    diaSemana: string;
    contasReceber: number;
    contasPagar: number;
    saldo: number;
  }

  type PeriodType = "monthly" | "annual";

  interface PeriodLabelsProps {
    monthly: string;
    annual: string;
  }

  const periodLabels: PeriodLabelsProps = { //Para exibir no titulo
    monthly: "Mensal",
    annual: "Anual",
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

  const [periodType, setPeriodType] = useState<PeriodType>("monthly"); // Período efetivamente aplicado
  const [tempPeriodType, setTempPeriodType] = useState<PeriodType>("monthly"); //Período selecionado temporariamente
  const [dateFilter, setDateFilter] = useState(""); // Data aplicada após confirmação
  const [tempDate, setTempDate] = useState(""); // Valor temporário do input (antes do filtro)
  const [valueInput, setValueInput] = useState({ monthValue: "", yearValue: moment().year() });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento inicial
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Ajuste o tempo conforme necessário
  }, []); // ← Executa apenas uma vez ao montar o componente

  useEffect(() => {
    if (tempPeriodType === "annual") {
      setTempDate(String(valueInput.yearValue)); // ← Sincroniza!
    } else if (tempPeriodType === "monthly") {
      setTempDate(valueInput.monthValue); // ← Sincroniza!
    }
  }, [tempPeriodType]); // ← Executa quando muda o tipo de período

  const handleApplyFilter = async () => {
    setIsLoading(true);
    // Se for anual e não tiver tempDate, use o valueInput.yearValue
    if (tempPeriodType === "annual" && !tempDate) {
      setDateFilter(String(valueInput.yearValue));
    } else {
      setDateFilter(tempDate);
    }
    setPeriodType(tempPeriodType);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  /*
  useEffect(() => {
    console.log("dateFilter atualizado:", dateFilter);
  }, [dateFilter]); // ← Executa toda vez que dateFilter muda
  */

  const handleReset = () => {
    setValueInput({
      monthValue: "",
      yearValue: moment().year()
    });
    setTempDate(""); // ← Limpa também o tempDate
    setDateFilter(""); // ← E o dateFilter
    setPeriodType("monthly"); // ← Volta pro padrão
    setTempPeriodType("monthly"); // ← E o temp também
  }

  // Função para atualizar o valueInput
  const handleChangeInput = (field: 'monthValue' | 'yearValue', value: string) => {
    setValueInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Estados para os dados processados
  const [graphPizzaData, setGraphPizzaData] = useState<{ series: number[]; labels: string[] }>({
    series: [],
    labels: []
  });
  const [seriesObjColumn, setSeriesObjColumn] = useState<{ name: string; data: number[] }[]>([]);
  const [xaxisCategories, setXaxisCategories] = useState<string[]>([]);
  const [minMax, setMinMax] = useState<{ min: number; max: number }>({ min: 0, max: 0 });

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


  useEffect(() => {

    // Processamento do gráfico de pizza
    const seriesPizza = responseChartPizza.contasPagar.categorias.map(cat => cat.valor);
    const labelsPizza = responseChartPizza.contasPagar.categorias.map(cat => cat.nome);

    setGraphPizzaData({
      series: seriesPizza,
      labels: labelsPizza
    });

    // Processamento do gráfico de barras
    const seriesColumnContasReceber = responseChartColumn.data.items.map(item => item.contasReceber);
    const seriesColumnContasPagar = responseChartColumn.data.items.map(item => item.contasPagar);

    let categories: any = [];
    switch (tempPeriodType) {
      case "monthly":
        categories = responseChartColumn.data.items.map(item => moment(item.data).locale('pt-br').format("DD/MM"));
        break;
      case "annual":
        categories = responseChartColumn.data.items.map(item => moment(item.data).locale('pt-br').format("MMMM [de] YY"));
        break;
    }

    const { min, max } = calcularMinMaxGrafico(responseChartColumn.data.items);

    setSeriesObjColumn([
      {
        name: 'Contas a Receber',
        data: seriesColumnContasReceber
      },
      {
        name: 'Contas a Pagar',
        data: seriesColumnContasPagar
      }
    ]);

    setXaxisCategories(categories);
    setMinMax({ min, max });

  }, [dateFilter]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com Filtros */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Header periodType={periodType} periodLabels={periodLabels} />

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <PeriodSelector
                periodType={tempPeriodType}
                onChange={setTempPeriodType}
              />

              <DateFilters
                periodType={tempPeriodType}
                onChangeDate={setTempDate}
                valueInput={valueInput}
                onChangeInput={handleChangeInput}

              />

              <ButtonFilter
                onClick={handleApplyFilter}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <Spinner />
        ) : (
          <Acompanhamento
            dashboardData={dashboardData}
            graphPizzaData={graphPizzaData}
            chartColumn={seriesObjColumn}
            chartColumnCategories={xaxisCategories}
            min={minMax.min}
            max={minMax.max}
          />
        )}

      </main>
    </div>
  );
}
