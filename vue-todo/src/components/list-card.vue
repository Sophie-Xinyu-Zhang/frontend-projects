<template>
  <div>
    <completed :completed="updateCompleted" v-show="showCompleted" />
    <active :active="updateActive" v-show="showActive" />
    <div class="flex items-center flex-col">
      <ul
        v-show="showAll"
        v-if="all.length > 0"
        class="text-3xl shadow-lg grid grid-cols-1 divide-y-2 divide-purple w-1/2 p-1 rounded-lg mt-4"
      >
        <li
          v-for="(todo, index) in all"
          :key="index"
          class="flex items-center h-16"
        >
          <input
            type="checkbox"
            class="checkbox float-left w-6 h-6"
            id="index"
            @input="changeStatus"
            ref="input"
          />
          <label for="index" class="ml-6"
            >{{ todo.todo }} - {{ todo.id }}</label
          >
        </li>
      </ul>
      <div v-if="all.length > 0" class="flex justify-evenly w-1/2 mt-10">
        <a @click="showAllToggle">All</a>
        <a @click="showCompletedToggle">Completed</a>
        <a @click="showActiveToggle">Active</a>
      </div>
      <button @click="debug">Click for debugging</button>
    </div>
  </div>
</template>

<script>
// this is the component responsible for showing all lists
import completed from "./completed.vue";
import active from "./active.vue";

export default {
  components: {
    completed,
    active,
  },
  props: {
    todo: String,
  },
  data() {
    return {
      all: [],
      //   completed: [],
      //   active: [],
      showAll: true,
      showCompleted: false,
      showActive: false,
    };
  },
  watch: {
    todo: function addTodo() {
      this.all.push({
        todo: this.todo,
        completed: false,
        id: this.all.length,
      });
    },
  },
  computed: {
    updateCompleted() {
      console.log("In the computed function");
      let completed = this.all.filter((each) => each.completed);
      return completed;
    },
    updateActive() {
      let active = this.all.filter((each) => !each.completed);
      return active;
    },
  },
  methods: {
    showCompletedToggle() {
      if (!this.showCompleted) {
        this.showAll = false;
        this.showActive = false;
        this.showCompleted = true;
      }
    },
    showActiveToggle() {
      if (!this.showActive) {
        this.showAll = false;
        this.showActive = true;
        this.showCompleted = false;
      }
    },
    showAllToggle() {
      if (!this.showAll) {
        this.showAll = true;
        this.showCompleted = false;
        this.showActive = false;
      }
    },
    changeStatus() {
      //   console.dir(this.$refs.list);
      let index = this.$refs.input.value;
      console.log("Current index: ", index);
      //   this.$refs.input.value.completed = !this.$refs.input.value.completed;
      //   console.log(this.$refs.input.value);
    },
    debug() {
      console.log("All:");
      console.log(this.all);
      console.log("Completed:");
      console.log(this.completed);
      console.log("Active:");
      console.log(this.active);
    },
  },
};
</script>
