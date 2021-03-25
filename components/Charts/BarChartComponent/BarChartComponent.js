import Chart from 'chart.js'
import react, { useState, useEffect, useRef } from 'react'
import Cookie from 'js-cookie'
import { CounterApi } from '../../../api/CounterApi'
export const BarChartComponent = ({ title, colors }) => {
    const chartRef = useRef(null)
    let lineChart

    useEffect(() => {
        const getCookieID = Cookie.get('hrme')
        const getVisitor = async () => {
            if (getCookieID !== undefined) {
                const data = await CounterApi.findAll({
                    filterObject: {},
                }).then(res => {
                    return res
                })
                lineChart = new Chart(chartRef.current, {
                    type: 'bar',
                    options: {
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
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    },
                    data: {
                        labels: data.map(d => d.date),
                        datasets: [{
                            label: title,
                            data: data.map(d => d.counter),
                            fill: 'none',
                            backgroundColor: colors,
                            pointRadius: 2,
                            borderColor: colors,
                            borderWidth: 1,
                            lineTension: 0,
                            barPercentage:0.2
                        }]
                    }
                })
            }
        }
        getVisitor()
        
        return () => {
        }
    }, [])
    return (
        <canvas ref={chartRef} />
    )
}