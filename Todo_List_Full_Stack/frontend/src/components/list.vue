<template>
  <div class="flex items-center flex-col">
    <list-component
      :currentList="updateComponent"
      @change-status="changeStatus"
      @delete-todo="deleteTodo"
      @mouse-over="mouseover"
      @mouse-leave="mouseleave"
    ></list-component>
    <div v-if="all.length > 0" class="flex justify-evenly w-1/2 mt-10">
      <a @click="showAllToggle" class="cursor-pointer">All</a>
      <a @click="showCompletedToggle" class="cursor-pointer">Completed</a>
      <a @click="showActiveToggle" class="cursor-pointer">Active</a>
    </div>
    <button @click="debug" class="cursor-default">Debug button</button>
  </div>
</template>

<script>
import listComponent from "./list-component.vue";

export default {
  components: {
    listComponent,
  },
  props: {
    todo: String,
  },
  data() {
    return {
      all: [],
      active: [],
      completed: [],
      line: "none",
      selected: "all",
    };
  },
  watch: {
    todo: function() {
      if (this.todo) {
        const item = {
          todo: this.todo,
          completed: false,
          id: this.all.length,
          active: false,
        };
        this.all.push(item);
        this.active.push(item);
        this.$emit("update-todo");
      }
    },
  },
  computed: {
    updateComponent() {
      if (this.selected === "active") {
        return this.active;
      }
      if (this.selected === "completed") {
        return this.completed;
      }
      return this.all;
    },
  },
  methods: {
    showCompletedToggle() {
      if (this.selected !== "completed") {
        this.completed = this.all.filter((each) => each.completed);
        this.selected = "completed";
      }
    },
    showActiveToggle() {
      this.active = this.all.filter((each) => !each.completed);
      if (this.selected !== "active") {
        this.selected = "active";
      }
    },
    showAllToggle() {
      if (this.selected !== "all") {
        this.selected = "all";
      }
    },
    deleteTodo(idx) {
      let item;
      if (this.selected === "all") {
        item = this.all[idx];
        if (item.completed) {
          this.deleteCList(item.id);
        } else {
          this.deleteAList(item.id);
        }
      } else if (this.selected === "active") {
        item = this.active[idx];
        this.deleteAList(item.id);
      } else {
        item = this.completed[idx];
        this.deleteCList(item.id);
      }
      this.all = this.all.filter((each) => each.id !== item.id);
    },
    changeStatus(idx) {
      if (this.selected === "all") {
        let item = this.all[idx];
        item.completed = !item.completed;
      } else if (this.selected === "active") {
        let item = this.active[idx];
        this.active[idx].active = false;
        this.updateAllList(item.id, true);
        this.addCList(item);
        this.deleteAList(item.id);
      } else {
        let item = this.completed[idx];
        this.completed[idx].active = false;
        this.updateAllList(item.id, false);
        this.deleteCList(item.id);
        this.addAList(item);
      }
    },
    updateAllList(itemId, value) {
      const target = this.all.findIndex((each) => each.id === itemId);
      this.all[target].completed = value;
    },
    deleteCList(itemId) {
      this.completed = this.completed.filter((each) => each.id !== itemId);
    },
    addCList(item) {
      this.completed.push(item);
    },
    deleteAList(itemId) {
      this.active = this.active.filter((each) => each.id !== itemId);
    },
    addAList(item) {
      this.active.push(item);
    },
    mouseover(idx) {
      if (this.selected === "all") {
        this.all[idx].active = true;
      } else if (this.selected === "active") {
        this.active[idx].active = true;
      } else {
        this.completed[idx].active = true;
      }
    },
    mouseleave(idx) {
      if (this.selected === "all") {
        this.all[idx].active = false;
      } else if (this.selected === "active") {
        this.active[idx].active = false;
      } else {
        this.completed[idx].active = false;
      }
    },
    debug() {
      console.log("All:");
      console.log(this.all);
      console.log("Active:");
      console.log(this.active);
      console.log("Completed:");
      console.log(this.completed);
    },
  },
};
</script>
