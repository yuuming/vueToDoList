// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    todos: []
  },
  methods: {
    // add new task
    doAdd: function (event, value) {
      var newTask = this.$refs.newTask
      if (!newTask.value.length) {
        return
      }
      // push newId, newTask and the status to todoList
      this.todos.push({
        id: todoStorage.uid++,
        comment: newTask.value,
        state: 0
      })
      // empty newTask value
      newTask.value = ''
    }
  },
  watch: {
    // need to make an object to use watch option
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
