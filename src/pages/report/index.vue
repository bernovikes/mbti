<template>
	<view class="min-vh-100 pt-65 x-bg">
		<view class="pl-14 white">
			<view class="font-22 lh-30">抑郁测试报告SCL—90</view>
			<view class="f6 lh-20">恭喜完成测试！</view>
			<view class="x-header-line mt3 mb-20"></view>
			<view class="f7 lh-20">2023-09-15 13:26</view>
		</view>
		<view class="mt-20 pl-14 pr-14">
			<view class="x-header-block mb-30 pb-22 pt3 w-100">
				<view class="x-body-h1 pr-20 width-fit flex pl-10 pt-6 pb-6 items-center">
					<view class="icon-header-block"></view>
					<view class="white lh-22 ml2">测试程度</view>
				</view>
				<!--  -->
				<view class="pl-20">
					<view class="pt3 lh-22 color-404246">测试结果：健康</view>
					<view class="font-23 mt2 lh-32">平均分 1.23</view>
					<view class="f7  color-464240 lh-17">恭喜你已经超越 <text class="color-6fa0ff">91%</text> 的用户了～</view>
				</view>
			</view>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">01</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">报告说明</view>
							<view class="font-10">reportillustrate</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="color-50545e f6 lh-28">
						<view>
							抑郁自评量表 （SDS）是由美国社克大学教授庄（william w.K.Zung）于1955年开发的截止目前最严谨、知名度最高的权威抑郁评估量表，是国际上各精神科门诊和心理咨询机构首选的抑郁诊断工具。
						</view>
						<view class="mt-28">
							根据抑郁自评量表 (SDS)的中国常模，抑郁评定的临界值为53分，分值越高，抑郁倾向越明注重维护社会秩序，确保达成标准。
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">02</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">作答情况</view>
							<view class="font-10">Answering situation</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="x-answer-body pl-20 pr-20 pt-10 pb-10">
						<view v-for="(item,index) in 3" :key="index" class="font-13 flex items-center justify-between">
							<view class="color-4c5264 lh-26 fw5">答题率</view>
							<view class="lh-17 color-6e9fff">100%</view>
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">03</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">报告提示</view>
							<view class="font-10">Report prompt</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f7 fw4 lh-29 color-50545e">
						<view>1、本报告中如果某项值过高，需去医院进行专业的筛查</view>
						<view class="mt-28">2、本报告是基于受测者对全部问题的回答所生成的评估结果，因此受测者的作答状态、自我认知和坦白程度等因素，均会影响其报告结果的真实性、准确性和有效性。</view>
						<view class="mt-28">3、本报告的有效期为6至12个月，如果受测者的生活或工作发生重大变化，应考虑再次参与测评。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">04</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">总体概括</view>
							<view class="font-10">Overall Summary</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f6 fw4 lh-28 color-50545e">
						<view>
							你的状态为 <text class="color-6fa0ff">轻度</text> 本诊断结果按全国正常，SCL-90常模N-1388)为依据评定(1-5级评分)，仅作为参考而非绝对标佳。
						</view>
						<view class="mt-28">应根据临床(要害)症状来划分。如有疑问，或症状已经影响到你的正常生活、学习及工作，建议尽早向心理专家咨询，进行专业的心理辅导治疗。切勿不加重视，贻误治疗机会，导致严重后果。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">05</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">结果分析</view>
							<view class="font-10">Result analysis</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f6 fw4 lh-28 color-50545e">
						<view>在 <text class="color-6fa0ff">心理健康方面</text> 得分较高，<text class="color-6fa0ff">抑郁、恐怖、焦虑</text> 表现较为明显，且部分项目接近或超过阳性标准，这些行为和情感表现或多或少已经影响了你的生活和工作，可以根据以下内容的分析来进行针对性的调节。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">06</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">因子分析</view>
							<view class="font-10">factor analysis</view>
						</view>
					</view>
				</template>
				<template v-slot:h2>
					<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
						<view class="icon-dot dib bg-white br-100 mr2"></view>因子详情分析
					</view>
				</template>
				<template v-slot:body>
					<view>
						<view class="x-factor-title bg-dce8ff f6 fw6 lh-20 pt1 pb1 pl-10 pr-10 width-fit color-5b92ff">焦虑 2.3分 [很轻]</view>
						<view class="color-50545e f6 fw4 lh-28 mt-12">根据测评结果，您在这一维度得分状态为轻度。表明你会有轻度的烦躁、坐立不安、神经过敏、紧张以及由此产生的躯体征象。总的来说，你焦虑程度低，生活乐观开明，兴趣广泛。建议你参加各种集体活动，在集体中培养和发展自己的同情心和相互信任感，对自己有信心，多鼓励和表扬自己的进步，在完成任务和工作的时候，应充分信任自己能够完成，可以学习一些放松的方法，如呼吸放松法、逐步肌肉放松法等。</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">07</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">综合结果</view>
							<view class="font-10">Obtaining Results</view>
						</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="f6 fw4 lh-28 color-50545e">根据上述分析，你的总分为<text class="color-5c93ff">241</text>，平均分为<text class="color-5c93ff">2.68</text>;阴性因子数<text class="color-5c93ff">26</text>个，阳性项目数为<text class="color-5c93ff">64</text>个，阳性项目平均分为<text class="color-5c93ff">3.36</text>，按照从高到低排列顺序为: 抑郁 敌对 躯体化。</view>
				</template>
			</ui-block>
			<!--  -->
			<ui-block>
				<template v-slot:h1>
					<view class="flex items-center pt2 pb2 pr-30 pl3 white">
						<text class="font-30 lh-35 b">08</text>
						<text class="pl-10">|</text>
						<view class="pl-12">
							<view class="lh-18">特别说明</view>
							<view class="font-10">Specification</view>
						</view>
					</view>
				</template>
				<template v-slot:nopadding>
					<view>
						<view class="x-body-h1 width-fit white lh-20  pt2 pb2  pl-14  pr-14  f6 fw4">
							<view class="icon-dot dib bg-white br-100 mr2"></view>因子详情分析
						</view>
						<view class="pt-22 pl-20 pr-20">
							<view class="color-50545e f6 fw4 lh-28">由于自评量表是测量个体在一段时间内感觉到的症状的严重与否，所以在量表分数的解释上应该慎重，并不是得分高就一定说明个体出现了很严重的心理问题，某些分量表上的得分较高有可能只是由于个体当时遇到了一些难题如失恋、面临考试、生病等，因此还应该对产生得分高的原因作进一步的分析。</view>
						</view>
					</view>
				</template>
			</ui-block>
			<!--  -->
		</view>
	</view>
</template>
<script>
	import uiBlock from './components/ui-block.vue'
	export default {
		components: {
			uiBlock
		}
	}
</script>
<style lang="scss" scoped>
	.x-bg {
		background: url("https://res.vkunshan.com/depressed/report/bg-top.png") 0 0 / 100% 272px no-repeat #ECF2FF;
	}

	.x-header-line {
		width: 51px;
		height: 3px;
		background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
	}

	.icon-header-block {
		background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI0ZGRiIgY3g9IjEwIiBjeT0iMTAiIHI9IjEwIi8+PHBhdGggZD0iTTkuMTUgNWwuMzEzIDcuODg4aDEuMDc0TDEwLjg1IDVoLTEuN3ptLjg0MyA4Ljc5N2EuODc3Ljg3NyAwIDAgMC0uNjk0LjMwOGMtLjIwNC4yLS4yOTkuNDYyLS4yOTkuNzg2IDAgLjMwOC4wOTUuNTcuMy43ODUuMTkuMjE2LjQyMS4zMjQuNjkzLjMyNC4yNzIgMCAuNTE3LS4xMDguNzIxLS4zMDguMTktLjIxNi4yODYtLjQ3OC4yODYtLjgwMSAwLS4zMjQtLjA5NS0uNTg2LS4yODYtLjc4Ni0uMTktLjIxNi0uNDM1LS4zMDgtLjcyLS4zMDh6IiBmaWxsPSIjNzRBNUZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+") 0 0 / 100% 100% no-repeat;
		width: 20px;
		height: 20px;
	}

	:deep(.x-body-h1) {
		background: linear-gradient(to left, rgba(110, 160, 255, 0.48), rgba(109, 159, 255, 0.77), rgba(110, 159, 255, 1));
		border-radius: 0 100px 100px 0;
	}

	.x-header-block {
		border-radius: 14px;
		background: url(https://res.vkunshan.com/depressed/report/ip.png) bottom 22px right 22px / 47px 90px no-repeat white;
	}

	.x-answer-body {
		background: rgba(159, 191, 255, .3);
		border-radius: 6px;
	}

	.icon-dot {
		width: 7px;
		height: 7px;
	}

	.x-factor-title {
		border: solid 1px #6499FF;
	}
</style>