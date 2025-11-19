import ReactApexChart from 'react-apexcharts';
import { ChartPieIcon } from '@heroicons/react/24/outline';
import { ApexOptions } from 'apexcharts';

interface ChartGastosPorGrupoProps {
  series: number[];
  labels: string[];
}

export default function ChartGastosPorGrupo({ 
  series, 
  labels 
}: ChartGastosPorGrupoProps) {
  // 1. CONFIGURAÇÃO DO GRÁFICO DE PIZZA
    const pieChartGastos = {
        // Os valores que alimentam o gráfico
        series: series,

        // Todas as opções de configuração
        options: {
            chart: {
                type: 'pie' as const,
                width: '100%'
            },

            // Rótulos de cada fatia
            labels: labels,

            // Cores para cada categoria (15 cores distintas)
            colors: [
                '#b91c1c', 
                '#c2410c', 
                '#b45309', 
                '#a16207', 
                '#4d7c0f', 
                '#15803d', 
                '#047857', 
                '#0f766e', 
                '#0e7490', 
                '#0369a1', 
                '#1d4ed8', 
                '#4338ca', 
                '#6d28d9', 
                '#7e22ce', 
                '#a21caf'  
            ],

            // Configuração da legenda
            legend: {
                position: 'right' as const,
                horizontalAlign: 'center' as const,
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },

            },

            // Labels nas fatias (mostra porcentagem)
            dataLabels: {
                enabled: true,
                formatter: function (val: number) {
                    return val.toFixed(1) + '%'
                }
            },

            // Tooltip ao passar o mouse
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    }
                }
            },

            // Responsividade para mobile
            responsive: [
                {
                    // Tablets
                    breakpoint: 1024,
                    options: {
                        chart: {
                            width: '100%',
                            height: 380
                        },
                        legend: {
                            position: 'bottom' as const,
                            fontSize: '14px'
                        },
                        dataLabels: {
                            style: {
                                fontSize: '12px'
                            }
                        }
                    }
                },
                {
                    // Mobile grande
                    breakpoint: 768,
                    options: {
                        chart: {
                            width: '100%',
                            height: 350
                        },
                        legend: {
                            position: 'bottom' as const,
                            fontSize: '12px',
                            horizontalAlign: 'left' as const
                        },
                        dataLabels: {
                            enabled: true,
                            style: {
                                fontSize: '10px'
                            }
                        }
                    }
                },
                {
                    // Mobile pequeno
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%',
                            height: 300
                        },
                        legend: {
                            position: 'bottom' as const,
                            fontSize: '10px',
                            height: 120,
                            offsetY: 10
                        },
                        dataLabels: {
                            enabled: false // desliga labels em telas muito pequenas
                        }
                    }
                },
                {
                    // Mobile extra pequeno
                    breakpoint: 320,
                    options: {
                        chart: {
                            width: '100%',
                            height: 250
                        },
                        legend: {
                            fontSize: '9px',
                            itemMargin: {
                                horizontal: 2,
                                vertical: 2
                            }
                        }
                    }
                }
            ]

        }
    }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 my-4 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <ChartPieIcon className="w-5 h-5 text-blue-700 [stroke-width:2]" />
          Contas a pagar por grupo
        </h2>
        <p className="text-sm text-gray-600">
          Visualização da distribuição de gastos por categoria
        </p>
      </div>

      <div className="flex justify-center">
        <ReactApexChart
          options={pieChartGastos.options}
          series={pieChartGastos.series}
          type="pie"
          height={600}
          width="300%"
        />
      </div>
    </div>
  );
}