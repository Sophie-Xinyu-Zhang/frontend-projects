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
      >
        <!-- <input
            type="checkbox"
            class="checkbox w-6 h-6"
            id="index"
            :checked="todo.completed"
          /> -->
        <button
          @click="changeStatus(index)"
          class="w-6 h-6 rounded-full border-2 border-black ml-6 cursor-pointer focus:outline-none"
        ></button>
        <p
          class="ml-6 break-all"
          :style="todo.completed ? completed : incompleted"
        >
          {{ todo.todo }}
        </p>
        <button @click="deleteTodo" class="mr-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
            <path
              fill="none"
              stroke="#FFF"
              stroke-width="2"
              d="M1 4.304L3.696 7l6-6"
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
      completed: "text-decoration: line-through",
      incompleted: "none",
      showDeleteOption: false,
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
    toggleDeletion() {
      // going to be implemented late, essentially css stuff
      console.log("Deletion option changed");
      this.showDeleteOption = true;
    },
    deleteTodo() {
      console.log("Delete todo");
      // set the display of this todo to none, and then emit the delete event
      // to the root component, delete the todo from the all list, and only
      // the all list
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
