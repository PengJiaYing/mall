<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import { debounce } from "@/common/utils";
import { BACK_POSITION } from "@/common/const";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      getThemeTop: null,
      currentIndex: 0,
    };
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then((res) => {
      // console.log(res);
      this.topImages = res.result.itemInfo.topImages;
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      this.shop = new Shop(res.result.shopInfo);
      this.detailInfo = res.result.detailInfo;
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      this.commentInfo = res.result.rate.cRate ? res.result.rate.list[0] : {};

      // 1.el没渲染
      // 2.图片未加载完成
      // this.$nextTick(()=>{})
    });

    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    this.getThemeTop = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTops.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTops.push(Number.MAX_VALUE);
      // console.log(this.themeTops);
    }, 300);
  },
  destroyed() {
    // 没有keep-alive 不调用deactive
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.newRefresh();
      this.getThemeTop();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index] + 44, 200);
    },
    contentScroll(position) {
      const posY = -position.y;
      for (let i = 0; i < this.themeTops.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          i < this.themeTops.length - 1 &&
          posY > this.themeTops[i] &&
          posY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(i);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > BACK_POSITION;
    },
    
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;

  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>
