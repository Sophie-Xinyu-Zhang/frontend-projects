<template>
  <div>
    <div class="hello flex justify-center">
      <h1>{{ msg }}</h1>
      <new-todo @add-new="getNew" />
    </div>
  </div>
</template>

<script>
import newTodo from "./new-todo.vue";

export default {
  setup(_, { emit }) {
    function getNew(value) {
      emit("add-new", value.value);
    }

    return { getNew };
  },
  components: {
    newTodo,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: relative;
  background-image: url("../assets/desktop-light.jpg");
  width: 1440px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  position: absolute;
  color: white;
  font-weight: 700;
  font-size: 4rem;
}
</style>
