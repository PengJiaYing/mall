<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {},
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    showMsg(message, duration = 2000) {
      // console.log(message)
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  color: #fff;
  background-color: rgb(0, 0, 0, 0.6);

  z-index: 9999;
}
</style>
