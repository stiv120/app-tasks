<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    /**
     * Obtener las tareas
     * @return json retorna un json con las tareas filtradas.
     */
    public function fetchTasks()
    {
        $tasks = Task::with('user')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($tasks);
    }

    /**
     * Filtrar las tareas
     * @param Request $request datos traídos de la petición
     * @return json retorna un json con las tareas filtradas.
     */
    public function filterTasks(Request $request)
    {
        $tasks = Task::with('user');
        if ($request->input('selectedStatus')) {
            $tasks = $tasks->whereIn('completed', $request->input('selectedStatus'));
        }
        $tasks = $tasks->orderBy('id', 'desc')->get();
        return response()->json($tasks);
    }

    /**
     * Crear tarea
     * @param TaskRequest $request datos traídos del formRequest de validación.
     * @return json retorna un json con la respuesta si creó o no la tarea.
     */
    public function store(TaskRequest $request)
    {
        $code = 422;
        $array = ['error' => 'Failed to insert in the database'];
        $task = Task::create($request->all());
        if($task) {
            $code = 201;
            $task->user;
            $task->status = 'success';
            $task->message = 'Successfully created';
            $array = $task;
        }
        return response()->json($array, $code);
    }

    /**
     * Actualizar tarea
     * @param int|string $id de la tarea.
     * @return json retorna un json con la respuesta si actualizó o no.
     */
    public function update($id)
    {
        $code = 422;
        $task = Task::find($id);
        $array = ['error' => 'Task not found'];
        if($task) {
            $array = ['error' => 'Failed to update in the database'];
            // Corrección: Se actualiza la tarea con el estado completado.
            $updated = $task->update(['completed' => Task::COMPLETED]);
            if ($updated) {
                $code = 200;
                $task->user;
                $task->status = 'success';
                $task->message = 'Successfully updated';
                $array = $task;
            }
        }
        return response()->json($array, $code);
    }

    /**
     * Eliminar tarea
     * @param int|string $id de la tarea.
     * @return json retorna un json con la respuesta si eliminó o no la tarea.
     */
    public function destroy($id)
    {
        $code = 422;
        $task = Task::find($id);
        $array = ['error' => 'Task not found'];
        if($task) {
            $array = ['error' => 'Failed to delete in the database'];
            $deleted = $task->delete();
            if ($deleted) {
                $code = 200;
                $task->user;
                $task->status = 'success';
                $task->message = 'Successfully eliminated';
                $array = $task;
            }
        }
        return response()->json($array, $code);
    }
}
