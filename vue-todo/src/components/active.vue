<template>
  <div class="flex items-center flex-col">
    <ul
      v-show="updateActive || false"
      class="text-3xl shadow-lg grid grid-cols-1 divide-y-2 divide-purple w-1/2 p-1 rounded-lg mt-4"
    >
      <li
        v-for="(todo, index) in updateActive"
        :key="index"
        class="flex items-center h-16"
      >
        <input
          type="checkbox"
          class="checkbox float-left w-6 h-6"
          :id="index"
          :value="todo"
          @click="checkFromActive(index)"
        />
        <label for="index" class="ml-6">{{ todo.todo }}</label>
      </li>
    </ul>
    <p v-show="updateActive.length === 0">You've completed everything.</p>
    <button @click="debug">
      Debug button, delete the first element of the list
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: [],
    };
  },
  props: {
    all: Array,
  },
  computed: {
    updateActive: function() {
      console.log("In the update active function");
      let active = this.all.filter((each) => !each.completed);
      return active;
    },
  },
  methods: {
    checkFromActive(idx) {
      console.log("Changing from active list");
      this.$emit("complete-from-active", idx);
    },
    debug() {},
  },
};
</script>
