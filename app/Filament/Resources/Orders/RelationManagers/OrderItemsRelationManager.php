<?php

namespace App\Filament\Resources\Orders\RelationManagers;

use App\Filament\Resources\Orders\Pages\ViewOrder;
use App\Models\VariationType;
use App\Models\VariationTypeOption;
use App\Filament\Resources\Orders\OrderResource;
use Filament\Actions\ViewAction;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class OrderItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'orderItems';

    protected static ?string $relatedResource = OrderResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('product')
                    ->label('Product Name')
                    ->getStateUsing(function ($record) {
                        return $record->product->title;
                    }),
                TextColumn::make('quantity')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('price')
                    ->money()
                    ->sortable(),
                TextColumn::make('total_price')
                    ->label('Total')
                    ->money()
                    ->state(fn ($record) => $record->quantity * $record->price),
            ])
            ->recordActions([
                ViewAction::make(),
            ])
            ->headerActions([

            ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Fieldset::make('product')
                ->relationship('product')
                ->schema([
                    TextEntry::make('title'),
                ]),
            ]);
    }

    public function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Fieldset::make('product')
                    ->relationship('product')
                    ->schema([
                        TextEntry::make('title'),
                    ]),
                Fieldset::make('Variation')
                    ->schema([
                        TextEntry::make('orderItems')
                            ->getStateUsing(function($record) {
                                $variations = $record->variation_type_option_ids;

                                if (!$variations) {
                                    return '-';
                                }

                                return collect($variations)
                                    ->map(function ($optionId, $typeId) {

                                        $type = VariationType::find($typeId);
                                        $option = VariationTypeOption::find($optionId);

                                        return $type?->name . ': ' . $option?->name;
                                    })
                                    ->implode(', ');
                            }),
                    ])
            ]);
    }

    public static function canViewForRecord(Model $ownerRecord, string $pageClass): bool
    {
        return $pageClass == ViewOrder::class;
    }
}
