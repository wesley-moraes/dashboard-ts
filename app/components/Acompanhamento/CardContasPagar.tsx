import { 
  BanknotesIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  CalendarDaysIcon 
} from '@heroicons/react/24/outline';

interface CardContasPagarProps {
  jaPago: number;
  aPagar: number;
  vencidos: number;
  venceEm7Dias: number;
}

export default function CardContasPagar({ 
  jaPago, 
  aPagar, 
  vencidos, 
  venceEm7Dias 
}: CardContasPagarProps) {
  const formatCurrency = (value: number) => 
    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
        <BanknotesIcon className="w-6 h-6 text-red-700 [stroke-width:2]" />
        <h2 className="text-xl font-bold text-gray-800">Contas a Pagar</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-700 [stroke-width:2]" />
          <p className="text-gray-700">
            Já Pago: <span className="font-semibold">{formatCurrency(jaPago)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-yellow-700 [stroke-width:2]" />
          <p className="text-gray-700">
            A pagar: <span className="font-semibold">{formatCurrency(aPagar)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-5 h-5 text-red-700 [stroke-width:2]" />
          <p className="text-gray-700">
            Vencidos: <span className="font-semibold">{formatCurrency(vencidos)}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="w-5 h-5 text-orange-700 [stroke-width:2]" />
          <p className="text-gray-700">
            Vence em 7 dias: <span className="font-semibold">{formatCurrency(venceEm7Dias)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}