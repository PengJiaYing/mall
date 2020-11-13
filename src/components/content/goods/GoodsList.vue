<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style>
.goods {
  /* 水平 */
  display: flex;
  /* 塞不下换行 */
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
