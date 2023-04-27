
<template>
  <div class="table-container">
    <table border="1" v-table-click="state">
      <tr>
        <th>
          id
        </th>
        <th>
          name
        </th>
        <th>
          age
        </th>
        <th>
          city
        </th>
        <th>
          address
        </th>
      </tr>
      <tr v-for="(user, index) in state.userList" :key="user.id">
        <td>{{ user.id }}</td>
        <td data-file="name" :data-idx="index">
          <span>{{ user.name }}</span>
        </td>
        <td data-file="age" :data-idx="index">{{ user.age }}</td>
        <td data-file="city" :data-idx="index">{{ user.city }}</td>
        <td data-file="address" :data-idx="index">{{ user.address }}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { io } from "socket.io-client";
import { ref, reactive } from 'vue';
import vTableClick from './directive/vTableClick'


const socket = io("http://localhost:3001")
const state = reactive({
  userList: [],
  socket
})
socket.on('userList', (val) => {
  state.userList = val
  console.log('state.userList', state.userList)
})
socket.connect();
</script>

<style scoped lang="less">
.table-container {
  table {
    td {
      width: 200px;
      padding: 4px 10px;
      position: relative;
    }

  }
}
</style>
