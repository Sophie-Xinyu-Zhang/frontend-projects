<template>
  <div class="flex items-center flex-col w-1/2">
    <ul
      v-show="currentList.length > 0"
      class="text-3xl shadow-lg grid grid-cols-1 divide-y-2 divide-purple w-full p-1 rounded-lg mt-4"
    >
      <li
        v-for="(todo, index) in currentList"
        :key="todo.id"
        class="items-center py-2 justify-between gridLayout"
        v-on:mouseover="mouseover(index)"
        v-on:mouseleave="mouseleave(index)"
      >
        <button
          @click="changeStatus(index)"
          class="w-6 h-6 rounded-full border-2 border-black ml-6 cursor-pointer focus:outline-none"
          :style="todo.completed ? buttonFill : buttonEmpty"
        ></button>
        <p
          class="ml-6 break-all"
          :style="todo.completed ? completed : incompleted"
        >
          {{ todo.todo }}
        </p>
        <button
          @click="deleteTodo(index)"
          class="mr-12 cursor-pointer"
          :style="todo.active ? hovering : notHovering"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              fill="#494C6B"
              fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </button>
      </li>
    </ul>
    <p v-show="currentList.length === 0" class="text-xl mt-4 lineClass">
      This List is Currently Empty
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      completed: "text-decoration: line-through 2px",
      incompleted: "none",
      hovering: "display: block",
      notHovering: "display: none",
      buttonFill: "background: black",
      buttonEmpty: "none",
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
    deleteTodo(idx) {
      this.$emit("delete-todo", idx);
      // set the display of this todo to none, and then emit the delete event
      // to the root component, delete the todo from the all list, and only
      // the all list
    },
    mouseover: function(idx) {
      this.$emit("mouse-over", idx);
    },
    mouseleave: function(idx) {
      this.$emit("mouse-leave", idx);
    },
  },
};
</script>

<style scoped>
.lineClass {
  text-decoration: underline 1px;
}
.gridLayout {
  display: grid;
  grid-template-columns: 1.5rem 1fr 2rem 0.5rem;
  grid-column-gap: 1rem;
}
</style>
