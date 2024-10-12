<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = ['title', 'description', 'user_id', 'completed'];

    //Estado pendiente
    const PENDING = 0;
    //Estado completado
    const COMPLETED = 1;

    // Relaciones
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
