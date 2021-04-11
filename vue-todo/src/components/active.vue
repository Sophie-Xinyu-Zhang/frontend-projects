<template>
  <div class="flex items-center flex-col">
    <ul
      v-show="active.length > 0"
      class="text-3xl shadow-lg grid grid-cols-1 divide-y-2 divide-purple w-1/2 p-1 rounded-lg mt-4"
    >
      <li
        v-for="(todo, index) in active"
        :key="index"
        class="flex items-center h-16"
      >
        <input
          type="checkbox"
          class="checkbox float-left w-6 h-6"
          :id="index"
          :value="todo"
        />
        <label for="index" class="ml-6">{{ todo.todo }}</label>
      </li>
    </ul>
    <p v-show="active.length === 0">You've completed everything.</p>
  </div>
</template>

<script>
export default {
  props: {
    active: Array,
  },
};
</script>
