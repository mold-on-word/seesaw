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
  
    // 1. Topic Distribution Bar Chart
if (document.querySelector("#topicChart")) {
    const topicData = [
        { topic: 'Topic 1', value: 0.11, color: '#FF6B6B', title: '나무위키와 인터넷 커뮤니티에 대한 경험' },
        { topic: 'Topic 2', value: 0.12, color: '#4ECDC4', title: '이퀄리즘에 대한 의심과 비판' },
        { topic: 'Topic 3', value: 0.17, color: '#45B7D1', title: '안티 페미니즘 기반 혐오 발언' },
        { topic: 'Topic 4', value: 0.10, color: '#96CEB4', title: '여성에 대한 혐오와 증오' },
        { topic: 'Topic 5', value: 0.12, color: '#FFEEAD', title: '정치적 우파성향 토픽' },
        { topic: 'Topic 7', value: 0.09, color: '#9FA8DA', title: '특정 커뮤니티의 페미니즘에 대한 반감' },
        { topic: 'Topic 8', value: 0.10, color: '#FFB6C1', title: '이퀄리즘에 대한 지지적 설명' }
    ];

    try {
        new ApexCharts(document.querySelector("#topicChart"), {
            ...commonOptions,
            chart: { 
                ...commonOptions.chart,
                type: 'bar',
                height: 400 
            },
            series: [{
                name: 'Topics',
                data: topicData.map(item => parseFloat((item.value * 100).toFixed(1)))
            }],
            xaxis: {
                categories: topicData.map(item => item.topic),
                title: {
                    text: 'Topics'
                }
            },
            colors: topicData.map(item => item.color),
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                    distributed: true
                }
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => `${val}%`
            },
            title: {
                text: "토픽 별 빈도 비율 그래프",
                align: 'center'
            },
            tooltip: {
                y: {
                    formatter: function (val, { seriesIndex, dataPointIndex, w }) {
                        return `${val}%`;
                    }
                },
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                    const value = series[seriesIndex][dataPointIndex];
                    const title = topicData[dataPointIndex].title;
                    return '<div class="custom-tooltip">' +
                        '<span><strong>' + title + '</strong></span><br>' +
                        '<span>빈도: ' + value + '%</span>' +
                        '</div>';
                }
            }
        }).render();
    } catch (error) {
        console.error('Error rendering topic chart:', error);
    }
}


  
    // Posts Over Time Bar Chart (게시글 수)
    if (document.querySelector("#postsChart")) {
        const postsData = {
            years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
            posts: [496, 551, 207, 203, 371, 220, 99, 192]
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
                    text: "디시인사이드 ‘이퀄리즘' 관련 게시물 수",
                    align: 'center'
                },
                colors: ['#4ECDC4']
            }).render();
        } catch (error) {
            console.error('Error rendering posts chart:', error);
        }
    }

  
    // 3. Topic Proportions Over Time Line Chart
    // if (document.querySelector("#proportionsChart")) {
    //     const years = [2018, 2020, 2022];
    //     const chartContainer = document.querySelector("#proportionsChart");
        
    //     // 차트 컨테이너의 너비를 가져옵니다.
    //     const containerWidth = chartContainer.offsetWidth;
    //     try {
    //         new ApexCharts(document.querySelector("#proportionsChart"), {
    //             ...commonOptions,
    //             chart: {
    //                 ...commonOptions.chart,
    //                 type: 'line',
    //                 height: containerWidth*0.7,
    //                 width: '100%',
    //                 align: 'center',
    //             },
    //             series: [
    //                 { name: 'Topic 1', data: [0.12, 0.11, 0.10] },
    //                 { name: 'Topic 2', data: [0.16, 0.11, 0.08] },
    //                 { name: 'Topic 3', data: [0.17, 0.17, 0.18] },
    //                 { name: 'Topic 4', data: [0.10, 0.10, 0.09] },
    //                 { name: 'Topic 5', data: [0.09, 0.13, 0.15] },
    //                 // { name: 'Topic 6', data: [0.05, 0.04, 0.04] },
    //                 { name: 'Topic 7', data: [0.08, 0.08, 0.07] },
    //                 { name: 'Topic 8', data: [0.10, 0.10, 0.11] },
    //                 // { name: 'Topic 9', data: [0.13, 0.16, 0.17] }
    //             ],
    //             xaxis: {
    //                 categories: years,
    //                 title: { text: 'Year' }
    //             },
    //             yaxis: {
    //                 title: { text: 'Proportion' },
    //                 min: 0.05,
    //                 max: 0.20,
    //                 tickAmount: 4,
    //                 labels: {
    //                     formatter: (val) => val.toFixed(2)
    //                 }
    //             },
    //             title: {
    //                 text: '토픽 별 빈도 비율 그래프',
    //                 align: 'center'
    //             },
    //             stroke: {
    //                 width: 2,
    //                 // curve: 'smooth'
    //             }
    //         }).render();
    //     } catch (error) {
    //         console.error('Error rendering proportions chart:', error);
    //     }
    // }
    // 2. Topic Distribution Time Series Line Chart without Topic 6 and 9
    if (document.querySelector("#timeSeriesChart")) {
        const data = {
            "2023": [0.0978280, 0.0809811, 0.1842125, 0.0952877, 0.1607284, 0.0367511, 0.0640408, 0.1072722, 0.1728982],
            "2022": [0.1052057, 0.0848209, 0.1685820, 0.0935184, 0.1508741, 0.0371920, 0.0667821, 0.1003365, 0.1926883],
            "2021": [0.1050364, 0.1024822, 0.1834368, 0.0970530, 0.1358333, 0.0402172, 0.0770447, 0.1063226, 0.1525738],
            "2020": [0.1119314, 0.1138047, 0.1729857, 0.0987313, 0.1148575, 0.0454831, 0.0837743, 0.1061565, 0.1522756],
            "2019": [0.1093213, 0.1333406, 0.1880802, 0.0999395, 0.0974863, 0.0495382, 0.0899211, 0.1051759, 0.1271970],
            "2018": [0.1177377, 0.1656791, 0.1590585, 0.1139700, 0.0879478, 0.0465860, 0.1055174, 0.0976123, 0.1058912],
            "2017": [0.1213261, 0.1899511, 0.1643288, 0.0993313, 0.0752651, 0.0491346, 0.1196854, 0.0891157, 0.0918619]
        };
    
        // 토픽 제목 정의
        const topicTitles = {
            1: '나무위키와 인터넷 커뮤니티에 대한 경험',
            2: '이퀄리즘에 대한 의심과 비판',
            3: '안티 페미니즘 기반 혐오 발언',
            4: '여성에 대한 혐오와 증오',
            5: '대안우파 성향 토픽',
            6: '더미 토픽 1',
            7: '특정 커뮤니티의 페미니즘에 대한 반감',
            8: '이퀄리즘에 대한 지지적 설명',
            9: '더미 토픽 2'
        };
    
        // 구분이 잘 되는 컬러맵 정의
        const colors = [
            '#FF6B6B', // 선명한 빨강
            '#4ECDC4', // 청록색
            '#45B7D1', // 하늘색
            '#96CEB4', // 민트
            '#FFBE0B', // 노랑
            '#FF006E', // 핫핑크
            '#8338EC', // 보라
            '#3A86FF'  // 파랑
        ];
    
        // 연도별 데이터를 시리즈로 변환, 토픽 6과 9는 제외
        const years = Object.keys(data);
        const series = Array.from({ length: 9 }, (_, topicIndex) => {
            if (topicIndex === 5 || topicIndex === 8) return null; // 토픽 6(인덱스 5)와 9(인덱스 8) 제외
            return {
                name: `Topic ${topicIndex + 1}`,
                data: years.map(year => ({
                    x: year,
                    y: parseFloat((data[year][topicIndex] * 100).toFixed(2))
                }))
            };
        }).filter(Boolean); // null 값을 필터링하여 제외
    
        try {
            new ApexCharts(document.querySelector("#timeSeriesChart"), {
                chart: {
                    type: 'line',
                    height: 400,
                    zoom: {
                        enabled: false,
                    },
                    animations: {
                        enabled: false  // 애니메이션 비활성화
                    }
                },
                series: series,
                colors: colors,
                xaxis: {
                    categories: years,
                    title: {
                        text: 'Year'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Percentage (%)'
                    },
                    labels: {
                        formatter: (val) => `${val.toFixed(1)}%`
                    }
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: (val, { seriesIndex, dataPointIndex, w }) => {
                            const topicNumber = parseInt(w.config.series[seriesIndex].name.replace('Topic ', ''));
                            return `${topicTitles[topicNumber]}: ${val.toFixed(2)}%`;
                        }
                    }
                },
                title: {
                    text: "각 토픽의 연도별 비중 시계열 분석 (더미 토픽 6과 9 제외)",
                    align: 'center'
                },
                legend: {
                    position: 'bottom',
                    fontSize: '12px',
                    itemMargin: {
                        horizontal: 10,
                        vertical: 5
                    }
                },
                stroke: {
                    width: 2,
                    // curve: 'smooth'
                },
                // markers: {
                //     size: 4,
                //     hover: {
                //         size: 6
                //     }
                // }
            }).render();
        } catch (error) {
            console.error('Error rendering time series chart:', error);
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
                    height: 800,
                    animations: {
                        enabled: false  // 애니메이션 비활성화
                    }
                },
                series: [
                    { name: 'Topic 1', data: [350, 75, 80] },
                    { name: 'Topic 2', data: [480, 60, 50] },
                    { name: 'Topic 3', data: [490, 90, 70] },
                    { name: 'Topic 4', data: [250, 80, 60] },
                    { name: 'Topic 5', data: [140, 30, 40] },
                    // { name: 'Topic 6', data: [100, 40, 30] },
                    { name: 'Topic 7', data: [280, 70, 50] },
                    { name: 'Topic 8', data: [320, 100, 90] },
                    // { name: 'Topic 9', data: [350, 110, 80] }
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
        
        // 토픽 제목 정의
        const topicTitles = {
            2: '이퀄리즘에 대한 의심과 비판',
            5: '대안우파 성향 토픽'
        };
    
        try {
            new ApexCharts(document.querySelector("#comparisonChart"), {
                ...commonOptions,
                chart: {
                    ...commonOptions.chart,
                    type: 'line',
                    height: 400,
                    zoom: {
                        enabled: false,
                    },
                    animations: {
                        enabled: false  // 애니메이션 비활성화
                    }
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
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: (val, { seriesIndex, dataPointIndex, w }) => {
                            const topicNumber = parseInt(w.config.series[seriesIndex].name.replace('Topic ', ''));
                            return `${topicTitles[topicNumber]}: ${val.toFixed(3)}`;
                        }
                    }
                },
                title: {
                    text: '토픽 2와 토픽 5의 시간에 따른 변화 비교',
                    align: 'center'
                },
                stroke: {
                    width: 4
                },
                colors: ['#4ECDC4', '#FF66BB']
            }).render();
        } catch (error) {
            console.error('Error rendering comparison chart:', error);
        }
    }
    
      
    
  });

  