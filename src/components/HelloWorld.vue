
<template>
  <div class="hello">
     <table>
        <!-- table header -->
        <tr v-for="item in todos" v-bind:key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.commemt }}</td>
          <td class="state">
            // status button 
            <button v-on:click="doChangeState(item)">{{ item.state }}</button>
          </td>
          // delete button
          <td class="button">
            <button v-on:click.ctrl="doRemove(item)">Delete</button>
          </td>
        </tr>
        <tbody>
          <!-- [1] display the item of todoList here -->
        </tbody>
      </table>
      <h2>Add new task</h2>
      <form class="add-form" v-on:submit.prevent="doAdd">
        <!-- comment field -->
        New task <input type="text" ref="newTask" />
        <!-- add button -->
        <button type="submit">Add</button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
