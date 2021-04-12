<template>
  <div class="flex items-center flex-col">
    <ul
      v-show="updateCompleted || false"
      class="text-3xl shadow-lg grid grid-cols-1 divide-y-2 divide-purple w-1/2 p-1 rounded-lg mt-4"
    >
      <li
        v-for="(todo, index) in updateCompleted"
        :key="index"
        class="flex items-center h-16"
      >
        <input
          type="checkbox"
          class="checkbox float-left w-6 h-6"
          :id="index"
          :value="todo"
          checked="true"
        />
        <label for="index" class="ml-6 line-through">{{ todo.todo }}</label>
      </li>
    </ul>
    <p v-show="updateCompleted.length === 0">
      You don't have anything completed.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    all: Array,
  },
  computed: {
    updateCompleted() {
      let completed = this.all.filter((each) => each.completed);
      return completed;
    },
  },
};
</script>
