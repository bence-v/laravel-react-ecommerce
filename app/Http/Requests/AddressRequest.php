<?php

namespace App\Http\Requests;

use App\Enums\AddressTypesEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'city' => ['required', 'max:255'],
            'address_line_1' => ['required', 'max:500'],
            'address_line_2' => ['max:500'],
            'zip' => ['required','numeric'],
            'primary' => ['required'],
            'type' => ['required', Rule::enum(AddressTypesEnum::class)],
        ];
    }
}
