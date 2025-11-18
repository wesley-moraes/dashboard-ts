import {AcompanhamentoProps} from "./Acompanhamento"

const Acompanhamento = (
    { dashboardData } : AcompanhamentoProps
) => {

    return (
        <div className="w-fulll">
            <p className="text-2xl font-semibold mb-6">Acompanhamento</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contas a Pagar - Borda Vermelha */}
                <div className="border-1 border-red-400 rounded-lg p-6 bg-stone-50 shadow-md">
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                        <span className="text-red-500 text-2xl">💸</span>
                        <h2 className="text-xl font-bold text-gray-800">Contas a Pagar</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Já Pago: <span className="font-semibold"> R$ {dashboardData.contasPagar.jaPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500">⏳</span>
                            <p className="text-gray-700">A pagar: <span className="font-semibold">R$ {dashboardData.contasPagar.aPagar.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-red-500">⚠️</span>
                            <p className="text-gray-700">Vencidos: <span className="font-semibold text-red-600">R$ {dashboardData.contasPagar.vencidos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-orange-500">📅</span>
                            <p className="text-gray-700">Vence em 7 dias: <span className="font-semibold text-orange-600">R$ {dashboardData.contasPagar.venceEm7Dias.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                        </div>
                    </div>
                </div>

                {/* Contas a Receber - Borda Verde */}
                <div className="border-1 border-green-400 rounded-lg p-6 bg-white shadow-md">
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-3">
                        <span className="text-green-500 text-2xl">💰</span>
                        <h2 className="text-xl font-bold text-gray-800">Contas a Receber</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            <p className="text-gray-700">Já recebido: <span className="font-semibold text-green-600">R$ {dashboardData.contasReceber.jaRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-blue-500">📊</span>
                            <p className="text-gray-700">A receber: <span className="font-semibold">R$ {dashboardData.contasReceber.aReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-graphs">
                <div className="title">
                    <h2>Contas a pagar por grupo</h2>
                    <p>gráfico</p>
                </div>

                <div className="title">
                    <h2>A receber vs A pagar</h2>
                    <p>gráfico</p>
                </div>

            </div>

        </div>
    )

}

export default Acompanhamento