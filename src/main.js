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
    todos: [],
    options: [
      { value: -1, label: 'everything' },
      { value: 0, label: 'in progress' },
      { value: 1, label: 'done' }
    ],
    currentOption: -1
  },
  created () {
    //  fetch local todo data
    this.todos = todoStorage.fetch()
  },
  computed: {
    labels () {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // {0: 'in progress', 1: 'done', -1: 'everything'}
    },
    computedTodos: function () {
      // everything data current option -1
      return this.todos.filter(function (el) {
        return this.currentOption < 0 ? true : this.currentOption === el.state
      }, this)
    }
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
    },
    doChangeState: function (item) {
      item.state = item.state ? 0 : 1
    },
    // delete task from todos
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
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
