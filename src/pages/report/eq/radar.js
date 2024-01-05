import * as echarts from 'echarts'
const getFenSize = (maxValue) => {
	const fenSize = []
	let a = Math.ceil(maxValue / 5);
	for (let i = 1; i < 6; i++) {
		fenSize[i - 1] = a * i;
	}
	return fenSize
}
export function radar(chartdata, maxNumber, el, indicator) {
	el.init(echarts, chart => {
		chart.setOption({
			// 工具箱
			toolbox: {
				show: false, // 是否显示
				feature: {
					dataView: {
						readOnly: true
					}, // 数据视图
					saveAsImage: {} // 保存图片
				}
			},
			title: {
				text: '',
				x: 'center'
			},
			tooltip: {
				// 鼠标经过时，提示信息
				trigger: 'item',
			},
			// 图例
			legend: {
				orient: 'vertical',
				right: 'right', // 位置，默认右边
				selected: {
					'iphone3': false,
					'iphone5': false,
					//不想显示的都设置成false
				}

			},
			// 雷达图
			radar: {
				// 中心位置
				center: ['50%', '50%'],
				startAngle: 90,
				radius: '50%', // 半径大小
				splitNumber: 5,				
				axisLabel: {
					show: false,
					align: 'right'
				},
				// 雷达图遍数,逆时针安排内容展示
				indicator,		
			},
			// 极坐标
			polar: {
				radius: '90%', // 半径大小，应同雷达图的大小
			},
			angleAxis: {
				axisLine: {
					lineStyle: {
						color: 'rgba(255, 255, 255, 0)'
					}
				},
			},
			radiusAxis: {
				type: 'category',	
				axisTick: {
					show: true,
					inside: true,
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: 'rgba(255,238,238, 0.2)'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(238,238,238, 0.2)'
					}
				},
				// 标尺数值
				data: getFenSize(maxNumber)
			},

			series: [{
				name: '',
				type: 'radar',
				radarIndex: 0,
				symbol: 'star', //拐点样式
				data: chartdata, // 雷达图数据
				symbol: 'circle',
				symbolSize: 6,
				areaStyle: {}
			}],
			// 图例设置颜色，循环使用
			color: ['#7DBDFF'],
		})
	})
}