import { 
  CurrencyDollarIcon, 
  ArrowDownTrayIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';

interface CardContasReceberProps {
  jaRecebido: number;
  aReceber: number;
}

export default function CardContasReceber({ 
  jaRecebido, 
  aReceber 
}: CardContasReceberProps) {
  const formatCurrency = (value: number) => 
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
        <CurrencyDollarIcon className="w-6 h-6 text-green-700 [stroke-width:2]" />
        <h2 className="text-xl font-bold text-gray-800">Contas a Receber</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ArrowDownTrayIcon className="w-5 h-5 text-green-700 [stroke-width:2]" />
          <p className="text-gray-700">
            Já recebido: <span className="font-semibold">{formatCurrency(jaRecebido)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5 text-blue-700 [stroke-width:2]" />
          <p className="text-gray-700">
            A receber: <span className="font-semibold">{formatCurrency(aReceber)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}