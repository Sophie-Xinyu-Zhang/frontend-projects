<template>
  <div>
    <header-component msg="TO DO's" @add-new="getNew" />
    <list-of-todos :todo="newTodo" @update-todo="updateTodo" />
  </div>
</template>

<script>
import headerComponent from "./components/header.vue";
import listOfTodos from "./components/list.vue";

import { ref } from "vue";

export default {
  components: {
    headerComponent,
    listOfTodos,
  },
  setup() {
    const newTodo = ref("");

    function getNew(value) {
      newTodo.value = value.value;
    }

    function updateTodo() {
      newTodo.value = "";
    }

    return { getNew, newTodo, updateTodo };
  },
};
</script>

<style>
#app {
  font-family: "Josefin Sans", sans-serif;
}
h1 {
  font-size: 4rem;
}
</style>
