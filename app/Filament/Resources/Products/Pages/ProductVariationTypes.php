<?php

namespace App\Filament\Resources\Products\Pages;

use App\Enums\ProductVariationType;
use App\Filament\Resources\Products\ProductResource;
use Filament\Actions\DeleteAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Schema;

class ProductVariationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected static ?string $title = 'Product Variation Types';
    protected static ?string $navigationLabel = 'Variations Types';

    protected static string|null|\BackedEnum $navigationIcon = 'heroicon-o-numbered-list';

    public function form(Schema $schema): Schema
    {
        return $schema->schema([
            Repeater::make('variationTypes')
            ->label(false)
            ->relationship()
            ->collapsible()
            ->defaultItems(1)
            ->addActionLabel('Add new variation type')
            ->columns(2)
            ->columnSpan(2)
                ->schema([
                    TextInput::make('name')
                    ->required(),
                    Select::make('type')
                    ->options(ProductVariationType::labels())
                    ->required(),
                    Repeater::make('options')
                    ->relationship()
                    ->collapsible()
                    ->schema([
                        TextInput::make('name')
                        ->required()
                        ->columnSpan(2),
                        SpatieMediaLibraryFileUpload::make('images')
                        ->image()
                        ->disk('public')
                        ->multiple()
                        ->openable()
                        ->panelLayout('grid')
                        ->collection('images')
                        ->reorderable()
                        ->appendFiles()
                        ->preserveFilenames()
                        ->columnSpan(2),
                    ])
                    ->columnSpan(2),
                ])
        ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResourceUrl('index');
    }
}
