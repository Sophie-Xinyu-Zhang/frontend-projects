import axios from "axios";

const url = "http://localhost:3000/";

class PostService {
  // Get todo
  static async getTodos() {
    let todos = await axios.get(url);
    const data = todos.data.todo;
    console.log(data);
    return [1, 2, 3];
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const res = await axios.get(url);
    //     const data = res.data;
    //     resolve(
    //       data.map((todo) => ({
    //         ...todo,
    //       }))
    //     );
    //   } catch (err) {
    //     reject(err);
    //   }
    // });
  }
  // Create todo
  static insertTodo(content) {
    return axios.post(`${url}/add-todo`, {
      content: content,
    });
  }
  // Delete todo
  static deleteTodo(todoId) {
    return axios.delete(`${url}/delete-todo`, {
      _id: todoId,
    });
  }
  // Update todo
}

export default PostService;
