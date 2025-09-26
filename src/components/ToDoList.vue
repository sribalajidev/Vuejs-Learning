<script setup>
import { ref, computed } from 'vue';

let id = 0; // unique id for each task

// form inputs
const newTask = ref('');
const newDueDate = ref('');

// search query
const searchQuery = ref('');

// default todo list
const todos = ref([
  { id: id++, task: 'Sample Task 1', dueDate: '2024-12-31', completed: false },
  { id: id++, task: 'Sample Task 2', dueDate: '2024-11-30', completed: true  }
]);

// function to add a new task
function addTask() {
  if(!newTask.value || !newDueDate.value) return; // simple validation to check empty fields
    todos.value.push({
      id: id++,
      task: newTask.value,
      dueDate: newDueDate.value,
      completed: false
    });
    // reset input fields
    newTask.value = '';
    newDueDate.value = '';
}

// function to mark task as completed
function markCompleted(taskId) {
  const task = todos.value.find(t => t.id === taskId);
  if(task) task.completed = true;
}

// function to delete a task
function deleteTask(taskId) {
  todos.value = todos.value.filter(t => t.id !== taskId)
}

// Filter tasks based on search input
const filteredTodos = computed(() => {
  if(!searchQuery.value.trim()) return todos.value;
  return todos.value.filter(t => t.task.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
  <div class="todo-list-wrapper">
    <h2>Add Task</h2>
    <div class="task-input">
      <input type="text" id="task" v-model="newTask" name="task" class="form-input" placeholder="Add a new task..." />
      <input type="date" id="dueDate"  v-model="newDueDate" name="dueDate" class="form-input" placeholder="Select due date" />
      <button @click="addTask" class="btn btn-primary">Add Task</button>
    </div>
    <div class="task-list-container">
      <h2>Task List</h2>
      <div class="task-filter">
        <input type="text" id="filter" name="filter" class="form-input" v-model="searchQuery" placeholder="Search tasks..." />
      </div>
      <div class="task-list">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th class="sort-date">Due Date</th> 
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in filteredTodos" :key="todo.id">
              <td>{{ todo.task }}</td>
              <td>{{ todo.dueDate }}</td>
              <td>
                <button v-if="!todo.completed" class="btn btn-primary" @click="markCompleted(todo.id)">Mark as Completed</button>
                <button v-else class="btn btn-green" disabled>Completed</button>
              </td>
              <td>
                <button class="btn btn-red" @click="deleteTask(todo.id)">Delete</button>
              </td>
            </tr>
            <!-- No results row -->
            <tr v-if="filteredTodos.length === 0">
              <td colspan="4" class="text-center">No results found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.todo-list-wrapper {
  position: relative;
  padding: 40px;
  .task-input {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--black);
    width: 100%;
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(0);
      [data-theme="dark"] & {
        filter: invert(1);
      }
    }
  }
  .task-list-container {
    .task-filter {
      display: flex;
      margin-bottom: 20px;
      .form-input {
        flex: 1;
      }
    }
    .task-list {
      table {
        width: 100%;
        border-collapse: collapse;
        color: var(--text-color);
        th, td {
          border: 1px solid var(--gray-dark);
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: var(--gray-light);
          // &.sort-date {
          //   position: relative;
          //   cursor: pointer;
          //   &:before {
          //     content: '▲';
          //     position: absolute;
          //     right: 8px;
          //     font-size: 12px;
          //     color: var(--gray-dark);
          //   }
          // }
        }
      }
    }
  }
}
</style>