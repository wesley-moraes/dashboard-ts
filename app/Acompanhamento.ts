// Primeiro, defina as interfaces
interface ContasPagar {
  jaPago: number;
  aPagar: number;
  vencidos: number;
  venceEm7Dias: number;
  total: number;
}

interface ContasReceber {
  jaRecebido: number;
  aReceber: number;
  total: number;
}

interface DashboardData {
  contasPagar: ContasPagar;
  contasReceber: ContasReceber;
}

// Defina o tipo das props do componente
export interface AcompanhamentoProps {
  dashboardData: DashboardData;
}