<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        @click.native="checkClick"
        :is-checked="isSelectedAll"
        class="check-all"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:￥{{ totalPrice }}</div>
    <div class="calculate">结算</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["totalPrice", "isSelectedAll"]),
  },
  methods: {
    checkClick() {
      this.$store.dispatch("setSelectAll");
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  background-color: #eee;
  height: 40px;

  align-items: center;
}

.check-content {
  /* width: 40px; */
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-all {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.total-price {
  text-align: right;
  margin-right: 5px;
  flex: 1;
}
.calculate {
  width: 60px;
  height: 30px;
  line-height: 30px;
  background-color: var(--color-tint);
  border-radius: 8px;
  margin-right: 10px;
  text-align: center;
}
</style>
