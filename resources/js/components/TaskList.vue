<style>
    @import "vue-select/dist/vue-select.css";
</style>
<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Task List</h1>
        <v-select  placeholder="Select Task Status" class="offset-md-8" multiple :options="options" v-model="selectedStatus" @input="filterTasks"></v-select><br>
        <ul class="list-group mb-4">
            <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1">{{ task.title }}</h5>
                    <p class="mb-1">{{ task.description }}</p>
                    <small class="text-muted">Assigned to: {{ task.user ? task.user.email : '' }}</small>
                </div>
                <div>
                    <button v-if="!task.completed" class="btn btn-success btn-sm mr-2" @click="completeTask(task.id)">Complete</button>
                    <button class="btn btn-danger btn-sm" @click="deleteTask(task.id)">Delete</button>
                </div>
            </li>
        </ul>
        <form @submit.prevent="addTask" class="card card-body">
            <div class="form-group">
                <input v-model="newTask.title" class="form-control" placeholder="Task Title" required>
            </div>
            <div class="form-group">
                <input v-model="newTask.description" class="form-control" placeholder="Task Description" required>
            </div>
            <div class="form-group">
                <input v-model="newTask.user" class="form-control" placeholder="Assigned User" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Add Task</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            newTask: {
                user: '',
                title: '',
                description: ''
            },
            options: [
                {value: 0, label: 'Pending'},
                {value: 1, label: 'Completed'}
            ],
            selectedStatus: []
        };
    },
    computed: {
        ...mapState(['tasks']) // Simplificado para mapState
    },
    methods: {
        ...mapActions(['fetchTasks', 'addTask', 'completeTask', 'deleteTask', 'filterTasks']),
        filterTasks() {
            const selectedStatusValues = this.selectedStatus.map(status => status.value);
            // Se utiliza la acción 'filterTasks'
            this.$store.dispatch('filterTasks', selectedStatusValues).catch(error => {
                console.error('Error filtering tasks:', error);
            });
        },
        addTask() {
            if (!this.newTask.title || !this.newTask.description || !this.newTask.user) {
                alert('Both title and description are required');
                return;
            }
            // Se utiliza la acción 'addTask'
            this.$store.dispatch('addTask', this.newTask).catch(error => {
                console.error('Error adding task:', error);
            });
        },
        completeTask(taskId) {
            // Se utiliza la acción 'completeTask'
            this.$store.dispatch('completeTask', taskId).catch(error => {
                console.error('Error completing task:', error);
            });
        },
        deleteTask(taskId) {
            // Se utiliza la acción 'deleteTask'
            this.$store.dispatch('deleteTask', taskId).catch(error => {
                console.error('Error deleting task:', error);
            });
        }
    },
    mounted() {
        this.fetchTasks();
    }
};
</script>
