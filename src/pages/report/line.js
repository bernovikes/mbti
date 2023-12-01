import * as echarts from 'echarts'
export default function line(chartdata, factor, el, standard) {
	const option = {
		title: {
			text: 'Scl — 90 结果剖析图',
			textStyle: { //文字样式
				color: '#50545E',
				fontSize: '14'
			},
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['分数', '参考值'],
			x: 'right'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: factor,
			axisLabel: {
				textStyle: { //文字样式
					color: '#757A86',
					fontSize: '10'
				},
				//X轴刻度配置
				interval: 0,
				rotate: 90 //倾斜度可以根据需求设置
			},
		},
		yAxis: {
			type: 'value'
		},
		series: [{
				name: '分数',
				type: 'line',
				stack: 'Total',
				data: chartdata,
				itemStyle: {
					normal: {
						color: '#4B88FF',
						lineStyle: {
							color: '#4B88FF'
						},
						label: { show: true, }
					}
				},
			},
			{
				name: '参考值',
				type: 'line',
				itemStyle: {
					normal: {
						color: '#57ECDB',
						lineStyle: {
							color: '#57ECDB'
						},
						label: { show: true, }
					}
				},
				data: standard
			},
		]
	};
	el.init(echarts, chart => {
		chart.setOption(option)
	})
}