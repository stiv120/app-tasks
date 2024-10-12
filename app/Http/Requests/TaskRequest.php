<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     * @return void
     */
    protected function passedValidation()
    {
        parent::passedValidation();
        $userFound = User::where('email', $this->user)->first();
        if (!$userFound?->id) {
            throw new HttpResponseException(response()->json([
                'status' => 'error',
                'statusCode' => 422,
                'data' => $this->all(),
                'message' => 'User not found'
            ], 422));
        }
        $this->merge(['user_id' => $userFound?->id]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user' => 'required|max:500',
            'title' => 'required|max:255',
            'description' => 'required|max:500'
        ];
    }
}
