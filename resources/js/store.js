import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; // Asegúrate de tener axios instalado

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: [] // Estado inicial para las tareas
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        FILTER_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        UPDATE_TASK(state, updatedTask) {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                Vue.set(state.tasks, index, updatedTask);
            }
        },
        DELETE_TASK(state, taskId) {
            state.tasks = state.tasks.filter(t => t.id !== taskId);
        }
    },
    actions: {
        fetchTasks({ commit }, task) {
            axios.get('/fetch-tasks', task)
                .then(response => {
                    commit('SET_TASKS', response.data);
                })
                .catch(error => {
                    console.error("Error fetching task:", error);
                });
        },
        filterTasks({ commit }, selectedStatus) {
            axios.post('/filter-tasks', {selectedStatus})
                .then(response => {
                    commit('FILTER_TASKS', response.data);
                })
                .catch(error => {
                    console.error("Error filtering task:", error);
                });
        },
        addTask({ commit }, task) {
            axios.post('/tasks', task)
                .then(response => {
                    task.user = '';
                    task.title = '';
                    task.description = '';
                    let data = response.data ? response.data : [];
                    let status = data && data.status ? data.status : 'error';
                    let message = data && data.message ? data.message : 'Failed';
                    Vue.prototype.$toast[status](message, {
                        timeout: 2000
                    });
                    commit('ADD_TASK', response.data);
                })
                .catch(error => {
                    let respuesta = error.response ?? null;
                    let data = respuesta ? respuesta.data : null;
                    let message = data ? data.message : '';
                    Vue.prototype.$toast.error(message, {
                        timeout: 2000
                    });
                    console.error("Error adding task:", error);
                });
        },
        completeTask({ commit }, taskId) {
            axios.put(`/tasks/${taskId}`)
                .then(response => {
                    let data = response.data ? response.data : [];
                    let status = data && data.status ? data.status : 'error';
                    let message = data && data.message ? data.message : 'Failed';
                    Vue.prototype.$toast[status](message, {
                        timeout: 2000
                    });
                    commit('UPDATE_TASK', data);
                })
                .catch(error => {
                    let respuesta = error.response ?? null;
                    let data = respuesta ? respuesta.data : null;
                    let message = data ? data.message : '';
                    Vue.prototype.$toast.error(message, {
                        timeout: 2000
                    });
                    console.error("Error updating task:", error);
                });
        },
        deleteTask({ commit }, taskId) {
            axios.delete(`/tasks/${taskId}`)
                .then((response) => {
                    let data = response.data ? response.data : [];
                    let status = data && data.status ? data.status : 'error';
                    let message = data && data.message ? data.message : 'Failed';
                    Vue.prototype.$toast[status](message, {
                        timeout: 2000
                    });
                    commit('DELETE_TASK', taskId);
                })
                .catch(error => {
                    let respuesta = error.response ?? null;
                    let data = respuesta ? respuesta.data : null;
                    let message = data ? data.message : '';
                    Vue.prototype.$toast.error(message, {
                        timeout: 2000
                    });
                    console.error("Error deleting task:", error);
                });
        }
    },
    getters: {
        tasks: state => state.tasks
    }
});
