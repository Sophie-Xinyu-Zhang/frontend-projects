<template>
  <div>
    <input
      v-model="newTodo"
      placeholder="Create a new todo..."
      @keyup.enter="addTodo"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(_, { emit }) {
    const newTodo = ref("");
    function addTodo() {
      emit("add-new", newTodo);
      newTodo.value = "";
    }

    return { newTodo, addTodo };
  },
};
</script>

<style scoped>
form {
  display: inline-block;
  width: 40rem;
  height: 3rem;
}
input {
  width: 40rem;
  height: 3rem;
  margin-top: 180px;
  border-radius: 100px;
  border: none;
  font-size: 22px;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
}
input:focus,
textarea:focus {
  outline: none;
}
</style>
