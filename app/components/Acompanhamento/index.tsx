import CardContasPagar from './CardContasPagar';
import CardContasReceber from './CardContasReceber';
import ChartReceberVsPagar from './ChartReceberVsPagar';
import ChartGastosPorGrupo from './ChartGastosPorGrupo';

interface AcompanhamentoProps {
  dashboardData: {
    contasPagar: {
      jaPago: number;
      aPagar: number;
      vencidos: number;
      venceEm7Dias: number;
    };
    contasReceber: {
      jaRecebido: number;
      aReceber: number;
    };
  };
  graphPizzaData: {
    series: number[];
    labels: string[];
  };
  chartColumn: ApexAxisChartSeries;
  chartColumnCategories: string[];
  min: number,
  max: number
}

export default function Acompanhamento({
  dashboardData,
  graphPizzaData,
  chartColumn,
  chartColumnCategories,
  min,
  max
}: AcompanhamentoProps) {
  return (
    <div className="w-full">
      <p className="text-2xl font-semibold mb-6">Acompanhamento</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardContasPagar {...dashboardData.contasPagar} />
        <CardContasReceber {...dashboardData.contasReceber} />
      </div>

      <ChartReceberVsPagar 
        series={chartColumn} 
        categories={chartColumnCategories}
        min={min}
        max={max} 
      />

      <ChartGastosPorGrupo 
        series={graphPizzaData.series} 
        labels={graphPizzaData.labels} 
      />
    </div>
  );
}