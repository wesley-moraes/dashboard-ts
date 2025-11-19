import ReactApexChart from 'react-apexcharts';
import { PresentationChartBarIcon } from '@heroicons/react/24/outline';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

interface ChartReceberVsPagarProps {
  series: ApexAxisChartSeries;
  categories: string[];
  min: number;
  max: number
}

export default function ChartReceberVsPagar({ 
  series, 
  categories,
  min,
  max 
}: ChartReceberVsPagarProps) {
    const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
  // 1. CONFIGURAÇÃO DO GRÁFICO DE PIZZA
    const chartDataMensal = {
        //pode apagar! Já recebendo a estrutura da page.tsx
        /*series: [
            {
                name: 'Contas a Receber',
                data: [
                    45000, 32000, 28000, 51000, 38000, 42000, 35000,
                    29000, 47000, 33000, 41000, 36000, 44000, 31000,
                    48000, 37000, 39000, 43000, 30000, 46000, 34000,
                    40000, 35000, 49000, 32000, 45000, 38000, 42000,
                    36000, 33000
                ]
            },
            {
                name: 'Contas a Pagar',
                data: [
                    -38000, -25000, -32000, -41000, -29000, -35000, -28000,
                    -33000, -39000, -27000, -36000, -31000, -38000, -26000,
                    -42000, -30000, -34000, -37000, -28000, -40000, -29000,
                    -35000, -31000, -43000, -27000, -39000, -32000, -36000,
                    -30000, -28000
                ]
            }
        ],*/
        series: series,

        options: {
            chart: {
                type: 'bar' as const,
                height: 400,
                stacked: true,
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: true
                }
            },

            responsive: [
                {
                    breakpoint: 1200,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '90%'
                            }
                        },
                        xaxis: {
                            labels: {
                                rotate: -45,
                                rotateAlways: true,
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        }
                    }
                },
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 300  // Ainda menor para mobile
                        },
                        plotOptions: {
                            bar: {
                                columnWidth: '95%'
                            }
                        },
                        xaxis: {
                            labels: {
                                rotate: -90,
                                rotateAlways: true,
                                style: {
                                    fontSize: '8px'
                                },
                                hideOverlappingLabels: true
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        legend: {
                            show: false  // Desabilita a legenda no mobile!
                        }
                    }
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: 350
                        },
                        plotOptions: {
                            bar: {
                                columnWidth: '95%'
                            }
                        },
                        xaxis: {
                            labels: {
                                rotate: -90,
                                rotateAlways: true,
                                style: {
                                    fontSize: '8px'
                                },
                                hideOverlappingLabels: true
                            }
                        },
                        dataLabels: {
                            enabled: false
                        }
                    }
                }
            ],

            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    borderRadius: 3
                }
            },

            colors: ['#15803d', '#b91c1c'],

            xaxis: {
                categories: /*[
                    '01/11', '02/11', '03/11', '04/11', '05/11', '06/11', '07/11',
                    '08/11', '09/11', '10/11', '11/11', '12/11', '13/11', '14/11',
                    '15/11', '16/11', '17/11', '18/11', '19/11', '20/11', '21/11',
                    '22/11', '23/11', '24/11', '25/11', '26/11', '27/11', '28/11',
                    '29/11', '30/11'
                ]*/
                    categories
                ,
                labels: {
                    rotate: -45,
                    style: {
                        fontSize: '11px'
                    },
                    hideOverlappingLabels: false
                },
                tickPlacement: 'on'
            },

            yaxis: {
                labels: {
                    formatter: function (val: number) {
                        if (val < 0) {
                            return '-R$ ' + Math.abs(val / 1000).toFixed(0) + 'k'
                        }
                        return 'R$ ' + (val / 1000).toFixed(0) + 'k'
                    }
                },
                /*
                min: -50000,
                max: 60000*/
                min: min,
                max: max
            },

            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (val: number) {
                        return 'R$ ' + Math.abs(val).toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })
                    }
                }
            },

            dataLabels: {
                enabled: false
            },

            grid: {
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                padding: {
                    left: 10,
                    right: 10,
                    bottom: 0
                }
            },

            legend: {
                position: 'top' as const,
                horizontalAlign: 'center' as const,
                offsetY: -10
            }
        }
    };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 my-4 border border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <PresentationChartBarIcon className="w-5 h-5 text-blue-700 [stroke-width:2]" />
          A receber vs A pagar
        </h2>
        <p className="text-sm text-gray-600">
          Análise comparativa entre valores a receber e a pagar no período selecionado
        </p>
      </div>

      <div className="w-full">
        <ReactApexChart
          options={chartDataMensal.options}
          series={chartDataMensal.series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
}