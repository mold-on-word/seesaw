// Wait for DOM and ApexCharts to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Verify ApexCharts is loaded
    if (typeof ApexCharts === 'undefined') {
        console.error('ApexCharts is not loaded');
        return;
    }
  
    // Common chart options
    const commonOptions = {
        chart: {
            fontFamily: 'Noto Sans KR, sans-serif',
            toolbar: {
                show: true
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    height: 300
                },
                legend: {
                    position: 'bottom',
                    offsetY: 5
                }
            }
        }]
    };
  
    // 1. Topic Distribution Donut Chart
    if (document.querySelector("#topicChart")) {
        const topicData = [
            { topic: 'Topic 1', value: 0.11, color: '#FF6B6B' },
            { topic: 'Topic 2', value: 0.12, color: '#4ECDC4' },
            { topic: 'Topic 3', value: 0.17, color: '#45B7D1' },
            { topic: 'Topic 4', value: 0.10, color: '#96CEB4' },
            { topic: 'Topic 5', value: 0.12, color: '#FFEEAD' },
            { topic: 'Topic 6', value: 0.04, color: '#D4A5A5' },
            { topic: 'Topic 7', value: 0.09, color: '#9FA8DA' },
            { topic: 'Topic 8', value: 0.10, color: '#FFB6C1' },
            { topic: 'Topic 9', value: 0.14, color: '#A8E6CF' }
        ];
  
        try {
            new ApexCharts(document.querySelector("#topicChart"), {
                ...commonOptions,
                chart: { 
                    ...commonOptions.chart,
                    type: 'donut',
                    height: 400 
                },
                series: topicData.map(item => parseFloat((item.value * 100).toFixed(1))),
                labels: topicData.map(item => item.topic),
                colors: topicData.map(item => item.color),
                plotOptions: {
                    pie: {
                        donut: {
                            size: '65%',
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Total Topics',
                                    formatter: () => '9'
                                }
                            }
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }).render();
        } catch (error) {
            console.error('Error rendering topic chart:', error);
        }
    }
  
    // 2. Posts Over Time Bar Chart
    if (document.querySelector("#postsChart")) {
        const postsData = {
            years: [2017, 2018, 2019, 2020, 2021, 2022, 2023],
            posts: [480, 550, 200, 190, 360, 210, 100]
        };
  
        try {
            new ApexCharts(document.querySelector("#postsChart"), {
                ...commonOptions,
                chart: {
                    ...commonOptions.chart,
                    type: 'bar',
                    height: 400
                },
                series: [{
                    name: 'Number of Posts',
                    data: postsData.posts
                }],
                xaxis: {
                    categories: postsData.years,
                    title: { text: 'Year' }
                },
                yaxis: {
                    title: { text: 'Number of Posts' },
                    min: 0
                },
                title: {
                    text: 'Number of Posts Over Time',
                    align: 'center'
                },
                colors: ['#4ECDC4']
            }).render();
        } catch (error) {
            console.error('Error rendering posts chart:', error);
        }
    }
  
    // 3. Topic Proportions Over Time Line Chart
    if (document.querySelector("#proportionsChart")) {
        const years = [2018, 2020, 2022];
        try {
            new ApexCharts(document.querySelector("#proportionsChart"), {
                ...commonOptions,
                chart: {
                    ...commonOptions.chart,
                    type: 'line',
                    height: 400
                },
                series: [
                    { name: 'Topic 1', data: [0.12, 0.11, 0.10] },
                    { name: 'Topic 2', data: [0.16, 0.11, 0.08] },
                    { name: 'Topic 3', data: [0.17, 0.17, 0.18] },
                    { name: 'Topic 4', data: [0.10, 0.10, 0.09] },
                    { name: 'Topic 5', data: [0.09, 0.13, 0.15] },
                    { name: 'Topic 6', data: [0.05, 0.04, 0.04] },
                    { name: 'Topic 7', data: [0.08, 0.08, 0.07] },
                    { name: 'Topic 8', data: [0.10, 0.10, 0.11] },
                    { name: 'Topic 9', data: [0.13, 0.16, 0.17] }
                ],
                xaxis: {
                    categories: years,
                    title: { text: 'Year' }
                },
                yaxis: {
                    title: { text: 'Proportion' },
                    min: 0,
                    max: 0.20,
                    tickAmount: 4,
                    labels: {
                        formatter: (val) => val.toFixed(2)
                    }
                },
                title: {
                    text: 'Topic Proportions Over Time',
                    align: 'center'
                },
                stroke: {
                    width: 2,
                    // curve: 'smooth'
                }
            }).render();
        } catch (error) {
            console.error('Error rendering proportions chart:', error);
        }
    }
  
    // 4. Topic Frequencies Over Time
    if (document.querySelector("#frequenciesChart")) {
        const freqYears = [2018, 2020, 2022];
        try {
            new ApexCharts(document.querySelector("#frequenciesChart"), {
                ...commonOptions,
                chart: {
                    ...commonOptions.chart,
                    type: 'line',
                    height: 400
                },
                series: [
                    { name: 'Topic 1', data: [350, 75, 80] },
                    { name: 'Topic 2', data: [480, 60, 50] },
                    { name: 'Topic 3', data: [490, 90, 70] },
                    { name: 'Topic 4', data: [250, 80, 60] },
                    { name: 'Topic 5', data: [140, 30, 40] },
                    { name: 'Topic 6', data: [100, 40, 30] },
                    { name: 'Topic 7', data: [280, 70, 50] },
                    { name: 'Topic 8', data: [320, 100, 90] },
                    { name: 'Topic 9', data: [350, 110, 80] }
                ],
                xaxis: {
                    categories: freqYears,
                    title: { text: 'Year' }
                },
                yaxis: {
                    title: { text: 'Frequency' },
                    min: 0
                },
                title: {
                    text: 'Topic Frequencies Over Time',
                    align: 'center'
                },
                stroke: {
                    width: 2,
                    // curve: 'smooth'
                }
            }).render();
        } catch (error) {
            console.error('Error rendering frequencies chart:', error);
        }
    }
  
    // 5. Topics 2 and 5 Comparison
    if (document.querySelector("#comparisonChart")) {
        const compYears = [2017, 2018, 2019, 2020, 2021, 2022, 2023];
        try {
            new ApexCharts(document.querySelector("#comparisonChart"), {
                ...commonOptions,
                chart: {
                    ...commonOptions.chart,
                    type: 'line',
                    height: 400
                },
                series: [
                    {
                        name: 'Topic 2',
                        data: [0.19, 0.16, 0.13, 0.11, 0.09, 0.08, 0.08]
                    },
                    {
                        name: 'Topic 5',
                        data: [0.075, 0.09, 0.10, 0.12, 0.14, 0.15, 0.16]
                    }
                ],
                xaxis: {
                    categories: compYears,
                    title: { text: 'Year' }
                },
                yaxis: {
                    title: { text: 'Average Topic Proportion' },
                    min: 0.05,
                    max: 0.20,
                    tickAmount: 4,
                    labels: {
                        formatter: (val) => val.toFixed(3)
                    }
                },
                title: {
                    text: 'Yearly Proportions of Topic 2 and Topic 5',
                    align: 'center'
                },
                stroke: {
                    width: 2,
                    curve: 'smooth'
                },
                colors: ['#4ECDC4', '#FFEEAD']
            }).render();
        } catch (error) {
            console.error('Error rendering comparison chart:', error);
        }
    }
  });