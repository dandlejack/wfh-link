import Chart from 'chart.js'
import react, { useState, useEffect, useRef } from 'react'
export const LineChartComponent = ({data,title,colors}) => {
    const chartRef = useRef(null)
    let lineChart
    useEffect(() => {
        const label = data.map(d=>d.label)
        lineChart = new Chart(chartRef.current, {
            type: 'line',
            options: {
                hover: {
					mode: 'nearest',
					intersect: true
				},
                scales: {
                    x: {
						display: true,
						title: {
							display: true,
							text: 'Month'
						}
					},
					y: {
						display: true,
						title: {
							display: true,
							text: 'Value'
						}
                    },
                }
            },
            data: {
                labels: data.map(d=>d.label),
                datasets: [{
                    label: title,
                    data: data.map(d => d.value),
                    fill: 'none',
                    backgroundColor: colors,
                    pointRadius: 2,
                    borderColor: colors,
                    borderWidth: 1,
                    lineTension: 0
                }]
            }
        })
        return () => {
        }
    }, [])
    return (
        <canvas ref={chartRef} />
    )
}