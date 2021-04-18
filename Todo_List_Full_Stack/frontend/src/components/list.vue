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
// import PostService from "../PostService.js";
import axios from "axios";

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
  async created() {
    try {
      // this.all = await PostService.getTodos();
      axios.get("http://localhost:3000/").then((response) => {
        this.all = response.data.todo;
        console.log(response.data.todo);
      });
    } catch (err) {
      console.log(err);
    }
  },
  watch: {
    todo: function() {
      if (this.todo) {
        const newTodo = { content: this.todo };
        const item = {
          content: this.todo,
          completed: false,
          _id: "",
        };
        axios
          .post("http://localhost:3000/add-todo", newTodo)
          .then((response) => {
            // console.log(response);
            item._id = response.data._id;
          });
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
        const todoId = { _id: item._id };
        axios
          .post("http://localhost:3000/delete-todo", todoId)
          .then((response) => console.log(response));
        if (item.completed) {
          this.deleteCList(item._id);
        } else {
          this.deleteAList(item._id);
        }
      } else if (this.selected === "active") {
        item = this.active[idx];
        const todoId = { _id: item._id };
        axios
          .post("http://localhost:3000/delete-todo", todoId)
          .then((response) => console.log(response));
        this.deleteAList(item._id);
      } else {
        item = this.completed[idx];
        const todoId = { _id: item._id };
        axios
          .post("http://localhost:3000/delete-todo", todoId)
          .then((response) => console.log(response));
        this.deleteCList(item._id);
      }
      this.all = this.all.filter((each) => each._id !== item._id);
    },
    changeStatus(idx) {
      if (this.selected === "all") {
        let item = this.all[idx];
        const todoId = { _id: item._id };
        axios
          .post("http://localhost:3000/change-status", todoId)
          .then((response) => console.log(response));
        item.completed = !item.completed;
      } else if (this.selected === "active") {
        let item = this.active[idx];
        const todoId = { _id: item._id };
        axios
          .post("http://localhost:3000/change-status", todoId)
          .then((response) => console.log(response));
        this.active[idx].active = false;
        this.updateAllList(item.id, true);
        this.addCList(item);
        this.deleteAList(item.id);
      } else {
        let item = this.completed[idx];
        const todoId = { _id: item._id };
        axios
          .post("http://localhost:3000/change-status", todoId)
          .then((response) => console.log(response));
        this.completed[idx].active = false;
        this.updateAllList(item.id, false);
        this.deleteCList(item.id);
        this.addAList(item);
      }
    },
    updateAllList(itemId, value) {
      const target = this.all.findIndex((each) => each._id === itemId);
      this.all[target].completed = value;
    },
    deleteCList(itemId) {
      this.completed = this.completed.filter((each) => each._id !== itemId);
    },
    addCList(item) {
      this.completed.push(item);
    },
    deleteAList(itemId) {
      this.active = this.active.filter((each) => each._id !== itemId);
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
