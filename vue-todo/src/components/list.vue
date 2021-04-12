<template>
  <div class="flex items-center flex-col">
    <list-component
      :currentList="updateComponent"
      @change-status="changeStatus"
    ></list-component>
    <div v-if="all.length > 0" class="flex justify-evenly w-1/2 mt-10">
      <a @click="showAllToggle" class="cursor-pointer">All</a>
      <a @click="showCompletedToggle" class="cursor-pointer">Completed</a>
      <a @click="showActiveToggle" class="cursor-pointer">Active</a>
    </div>
    <!-- <button @click="debug" class="cursor-default">Show all in console</button> -->
  </div>
</template>

<script>
// this is the component responsible for showing all lists
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
    changeStatus(idx) {
      if (this.selected === "all") {
        let item = this.all[idx];
        item.completed = !item.completed;
      } else if (this.selected === "active") {
        let item = this.active[idx];
        this.updateAllList(item.id, true);
        this.addCList(item);
        this.deleteAList(item.id);
      } else {
        let item = this.completed[idx];
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
    // debug() {
    //   console.log("All:");
    //   console.log(this.all);
    //   console.log("Active:");
    //   console.log(this.active);
    //   console.log("Completed:");
    //   console.log(this.completed);
    // },
  },
};
</script>
