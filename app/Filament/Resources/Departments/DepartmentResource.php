<?php

namespace App\Filament\Resources\Departments;

use App\Enums\RolesEnum;
use App\Filament\Resources\Departments\Pages\CreateDepartment;
use App\Filament\Resources\Departments\Pages\EditDepartment;
use App\Filament\Resources\Departments\Pages\ListDepartments;
use App\Filament\Resources\Departments\RelationManagers\CategoriesRelationManager;
use App\Filament\Resources\Departments\Schemas\DepartmentForm;
use App\Filament\Resources\Departments\Tables\DepartmentsTable;
use App\Models\Department;
use BackedEnum;
use Filament\Facades\Filament;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class DepartmentResource extends Resource
{
    protected static ?string $model = Department::class;

    protected static string|BackedEnum|null $navigationIcon = 'blade-collection';

    public static function form(Schema $schema): Schema
    {
        $schema->schema([
            TextInput::make('name')
                ->live(onBlur: true)
                ->required()
            ->afterStateUpdated(function (string $operation, $state, callable $set):string {
                $set('slug', Str::slug($state));
            }),
            TextInput::make('slug')
                ->required(),
            Checkbox::make('active')
        ]);
        return DepartmentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {

        return DepartmentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            CategoriesRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDepartments::route('/'),
            'create' => CreateDepartment::route('/create'),
            'edit' => EditDepartment::route('/{record}/edit'),
        ];
    }

    public static function canViewAny(): bool
    {
        $user = Filament::auth()->user();
        return $user && $user->hasAnyRole([RolesEnum::Admin]);
    }
}
