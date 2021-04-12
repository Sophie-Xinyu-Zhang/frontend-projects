<template>
  <div class="flex items-center flex-col w-1/2">
    <ul
      v-show="currentList.length > 0"
      class="text-3xl shadow-lg grid grid-cols-1 divide-y-2 divide-purple w-full p-1 rounded-lg mt-4"
    >
      <li
        v-for="(todo, index) in currentList"
        :key="todo.id"
        class="flex items-center h-16"
      >
        <input
          type="checkbox"
          class="checkbox float-left w-6 h-6"
          id="index"
          :checked="todo.completed"
          @input="changeStatus(index)"
        />
        <label
          for="index"
          class="ml-6"
          :style="todo.completed ? completed : incompleted"
          >{{ todo.todo }}</label
        >
      </li>
    </ul>
    <p v-show="currentList.length === 0">This List is Currently Empty</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      completed: "text-decoration: line-through",
      incompleted: "none",
    };
  },
  props: {
    currentList: Array,
  },
  methods: {
    changeStatus(idx) {
      this.$emit("change-status", idx);
      // emit an event to the parent component, since that's where all the lists are
      // processed and handled
    },
  },
};
</script>
