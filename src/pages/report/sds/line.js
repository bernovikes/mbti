import * as echarts from 'echarts'
export default function line(chartdata, factor, el) {
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: factor,
			axisLabel: {
				textStyle: { //文字样式
					color: '#848589',
					fontSize: '8'
				},
				//X轴刻度配置
				interval: 0,				
			},
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '分数',
			type: 'bar',
			barWidth: 17,
			data: chartdata,
			itemStyle: {
				borderRadius: [100, 100, 0, 0],
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: '#9DC9FF' },
					{ offset: 1, color: '#6498FF' },
				])
			}
		}]
	};
	el.init(echarts, chart => {
		chart.setOption(option)
	})
}