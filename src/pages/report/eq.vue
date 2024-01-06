<template>
	<div>
		<!-- 前言  -->
		<div class="x-eq-top-desc font-13 mb-20 fw4 color-50545e pt-20 pb-20 pl-20 pr-20 lh-26">
			<div class="mb1" v-for="(item,index) in reportDesc.section" :key="index">
				{{item.content}}
			</div>
		</div>
		<!-- end -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>作答情况</view>
			</template>
			<template v-slot:body>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">游客</view>
				<view class="x-eq-answer-body pl-18 pr-28 pt-14 pb-14">
					<view v-for="(item,index) in speed" :key="index" class="f6  flex items-center justify-between" :class="{'mb-18':(index+1)<speed.length}">
						<view class="color-4c5264 lh-26 fw5">{{item.label}}</view>
						<view class="lh-17 color-3a9bff">{{item.value}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>01 总体概要</view>
			</template>
			<template v-slot:body>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">结果分析</view>
				<view class="font-13 color-50545e fw4 lh-26">{{degree.config.result}}</view>
				<view class="f6 fw5 color-28292c mb3 mt-32 x-eq-text-line width-fit">情商结论介绍</view>
				<view class="font-13 color-50545e fw4 lh-26">{{degree.config.conclude}}</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>02 得分详情</view>
			</template>
			<template v-slot:body>
				<l-echart ref="chart"></l-echart>
				<view class="grid x-eq-grid tc">
					<view v-for="(item,index) in factorTable" :key="index">
						<view class="f7 fw5 color-4c5264 lh-40">{{item.name}}</view>
						<view class="f7 fw5 color-4c5264 lh-44">{{item.sum}}</view>
					</view>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay" v-for="(item,index) in factorList.config">
			<template v-slot:h1>
				<view>3.{{index+1}} {{item.factor}}</view>
			</template>
			<template v-slot:body>
				<view class="x-progress-bar bg-e8f2fe mt-24 mb-18">
					<view :style="{'--width':((item.sum/30)*100)+'%'}" class="x-progress h-100"></view>
				</view>
				<view class="font-13 color-4c5264 mb-18 lh-18 b">得分：<text class="color-3a9bff">{{item.sum}}</text></view>
				<view class="font-13 color-4c5264 mb-30 lh-18 b">结果：<text class="color-3a9bff">{{item.result}}</text></view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">维度分析</view>
				<view class="lh-26 font-13 color-50545e mb-32">{{item.dimension}}</view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">各项分析</view>
				<view class="lh-26 font-13 color-50545e mb-32">{{item.option}}</view>
				<view class="f6 fw5 color-28292c mb3 x-eq-text-line width-fit">提升建议</view>
				<view class="lh-26 font-13 color-50545e">{{item.suggestion}}</view>
			</template>
		</ui-block>
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>04 针对性情商提升建议</view>
			</template>
			<template v-slot:body>
				<view class="font-13 mt-22 pre-wrap">
					<block v-for="(item,index) in eqImprove.section" :key="index">
						<view v-if="item.h1" class="fw5 color-28292c mb3 x-eq-text-line width-fit">{{item.h1}}</view>
						<view v-if="item.h2" class="fw5 lh-17 color-3a9bff mb3">{{item.h2}}</view>
						<view v-if="item.h3" class="fw5 lh-25 color-28292c  mb3">{{item.h3}}</view>
						<view v-if="item.content" class="fw4 lh-25 color-50545e  mb3">{{item.content}}</view>
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>05 如何提高情商？</view>
			</template>
			<template v-slot:body>
				<view class="font-13 mt-22 pre-wrap">
					<block v-for="(item,index) in eqHowImprove.section" :key="index">
						<view v-if="item.h1" class="fw5 color-28292c mb3 x-eq-text-line width-fit">{{item.h1}}</view>
						<view v-if="item.h2" class="fw5 lh-17 color-3a9bff mb3">{{item.h2}}</view>
						<view v-if="item.h3" class="fw5 lh-25 color-28292c  mb3">{{item.h3}}</view>
						<view v-if="item.content" class="fw4 lh-25 color-50545e  mb3">{{item.content}}</view>
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>5.1 提高自己共情能力</view>
			</template>
			<template v-slot:body>
				<view class="font-13 mt-22 pre-wrap">
					<block v-for="(item,index) in eqImproveSelf.section" :key="index">
						<view v-if="item.h1" class="fw5 lh-17 color-3a9bff mb3">{{item.h1}}</view>
						<view v-if="item.content" class="fw4 lh-25 color-50545e  mb3">{{item.content}}</view>
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>5.2 控制自己情绪的能力</view>
			</template>
			<template v-slot:body>
				<view class="font-13 mt-22 pre-wrap">
					<view class="color-50545e lh-25 fw4">
						<view>有的时候我们会感觉到，自己明明可以忍住不哭或者不生气的，但是可能就是很小的一件事情，一切努力就会瞬间崩塌。其实只要明白情绪的由来，我们就会清晰的知道人类是依靠各种激素产生情绪的物种，一旦激素已经分泌出来了，自然不论怎样的控制都没有意义了，当然了，这也和原生家庭所教会你的处事方法有关。</view>
						<view class="mt-10">首先要了解的是，每个人都是渴望得到认可的，没有人喜欢被人贬损，而且否定别人的出发点就是先站在TA的对立面上，如果都抱着不服输的态度，会让争执变得丝毫没有意义。越是情商高的人，越会表现的乐于认可别人，经常会说“嗯，是的，你的想法很有道理，但是从不同的角度来看，有没有可能是XXXXX”</view>
					</view>
					<view class="x-body-eq-h1 mt-58 white center width-fit mb-23">
						5.3 价值达到最优状态
					</view>
					<view class="lh-25 fw4 color-50545e mb-23">
						我们做事情的出发点永远都是将价值最大化，把事情办成，也就是达成一种“双赢”的状态，如果处于一件事情的两方出现一种输赢的较量，那就违背了共同达成一个目标的原则，得不偿失。但是情商只是一个代名词，李白的成就流传千年，可他也曾在皇帝面前让高力士脱靴，十分猖狂，情商是我们生活中重要的润滑剂，可以让自己的生活变得没有那么烦闷枯燥，也有助于我们的心理健康，但并不是说不具备情商的人就失去了所有成功的机会。
					</view>
					<view class="fw5 color-28292c mb-23 x-eq-text-line width-fit">推荐影视剧</view>
					<view class="fw5 lh-17 color-3a9bff mb3">1.职场情商：</view>
					<view class="lh-25 mb-23">
						<view>
							<text class="color-ff4b36">《未生》</text>讲述人生只有围棋一个爱好的主人公张克莱在职业竞赛失败后，面对冷酷的现实而展开的故事，以社会新鲜人的视角描绘职场人们的面貌。
						</view>
						<view class="mt-20">
							<text class="color-ff4b36">《当幸福来敲门》</text>讲述当生活中很多事情都不尽如人意的时候，如何保持乐观态度，绝处逢生的职场奇迹。
						</view>
						<view class="mt-20">
							<text class="color-ff4b36">《平凡的荣耀》</text>演绎小人物的职场奋斗史，非常贴近职场现实，引起了很多人的共鸣职场遭遇瓶颈，90%都源于沟通　　
						</view>
					</view>
					<!--  -->
					<view class="fw5 lh-17 color-3a9bff mb3">2.爱情友情：</view>
					<view class="lh-25 mb-23">
						<view>
							<text class="color-ff4b36">《伊丽莎白镇》</text>一个经历事业重创的年轻人对人生有了全新的感悟和认识的故事。爱情是很充满魔力，但温情更能打动人心。 在人生的低谷，女主角的开朗、男主角的坚强在阳光的旅途中让我们感动。
						</view>
						<view class="mt-20">
							<text class="color-ff4b36">《美丽心灵》</text>讲述了患有精神分裂症的数学家获得诺贝尔经济学奖的故事。描述纳什巨大成就与他所遭受的精神痛苦的同时，也着重描写了妻子对他坚贞不渝的爱，非常令人动容，也间接证明了理工男拥有完美爱情的可能性。
						</view>
					</view>
					<view class="fw5 lh-17 color-3a9bff mb3">3.人际交往：</view>
					<view class="lh-25">
						<view>
							<text class="color-ff4b36">《教父》</text>经典中的经典，有界限有原则的人际关系才是一段健康的关系，如何能够妥善处理不同人的不同问题，如何能够受人尊敬，都将在这个电影中获得答案
						</view>
						<view class="mt-20">
							<text class="color-ff4b36">《隐藏人物》</text>如何靠努力和察言观色争取机遇？在二十世纪的60年代，几个黑人女性与让人震惊的种族偏见作斗争，最终在美国的航天计划中占有了一席之地。
						</view>
						<view class="mt-20">
							<text class="color-ff4b36">《在云端》</text>让你明白有些人升职加薪不是没有道理的。一位公司裁员专家，他的工作是飞来飞去为各地公司去解决麻烦。 但瑞恩这种“在路上”的生活方式却受到了新人的威胁，一个名叫娜塔莉的大学毕业新生发明了一种互联网远程会议系统，也让瑞恩的工作显得毫无必要，我们将在电影中找到完美的应对方式。
						</view>
					</view>
					<!--  -->
				</view>
			</template>
		</ui-block>
		<!--  -->
		<!--  -->
		<ui-block :lock="!detail.is_pay">
			<template v-slot:h1>
				<view>06 附录</view>
			</template>
			<template v-slot:body>
				<view class="font-13 mt-22 pre-wrap color-50545e lh-25  fw4">
					<block v-for="(item,index) in refer.section" :key="index">						
						<view v-if="item.content" class="mb3">{{item.content}}</view>
					</block>
				</view>
			</template>
		</ui-block>
		<!--  -->
	</div>
</template>

<script setup>
	import uiBlock from './components/eq/ui-block.vue'
	import { inject, computed, watch, ref, onMounted, nextTick, toRaw } from 'vue'
	import { radar } from './eq/radar.js'
	const reportDesc = inject('reportDesc')
	const detail = inject('detail')
	const speed = inject('speed')
	const factorList = inject('factorList')
	const refer = inject('refer')
	const chart = ref('')
	const degree = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'degree'))
	const eqImprove = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'eq_improve'))
	const eqHowImprove = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'eq_how_improve'))
	const eqImproveSelf = computed(() => detail.value?.report?.detail.find(item => item.componentName === 'improve_self'))
	const factorTable = computed(() => {
		return factorList.value.config.map(item => {
			return { name: item.factor, sum: item.sum }
		})
	})
	onMounted(() => {
		nextTick(() => {
			const charData = factorTable.value.map(item => item.sum).sort((a, b) => a - b)
			const maxNumber = Math.max(...charData)
			const indicator = factorTable.value.map(item => {
				return { name: item.name, max: maxNumber }
			})
			radar([{ value: charData }], maxNumber, chart?.value, indicator)
		})
	})
</script>

<style scoped lang="scss">
	.x-eq-top-desc {
		background: linear-gradient(to top, rgba(253, 255, 255, 1), rgba(253, 255, 255, .53));
		border-radius: 12px;
		box-shadow: 3px 0 13px 0 rgba(0, 86, 179, 0.06);
		border: solid 1px #fff;
	}

	.x-eq-answer-body {
		background: #F5F8FB;
		border-radius: 6px;
	}

	.x-eq-text-line {
		background: linear-gradient(to left, #B6DAFF, #9BCCFF, #8AC3FF) left bottom / 100% 5px no-repeat;
	}

	.x-eq-grid {
		grid-template-columns: repeat(5, 1fr);
		border-radius: 6px;
		background: linear-gradient(to bottom, #E2F0FF 40px, #F7FAFD 44px) 0 0 / 100% 100% no-repeat;
	}

	.x-progress-bar {
		border-radius: 9px;
		height: 17px;
	}

	.x-progress,
	.x-progress-bar {
		border-radius: 9px;
	}

	.x-progress {
		background: linear-gradient(90deg, #2E94FF 0%, #5BABFF 100%);
		width: var(--width);
	}
	:deep(.x-body-eq-h1) {
		background: url(https://res.vkunshan.com/depressed/report/eq/title-bg.png) 0 0 / 100% no-repeat;
		padding: 5px 29px;
	}
</style>