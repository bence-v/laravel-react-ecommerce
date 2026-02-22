<?php

namespace App\Filament\Resources\Orders\Schemas;

use App\Enums\OrderStatusEnum;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('total_price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Select::make('status')
                    ->options(OrderStatusEnum::labels())
                    ->required(),
                Section::make('Address')
                    ->schema([
                        TextInput::make('address.address_line_1')
                            ->label('Address Line 1'),
                        TextInput::make('address.address_line_2')
                            ->label('Address Line 2'),
                        TextInput::make('address.city')
                            ->label('City'),
                        TextInput::make('address.zip')
                            ->label('Zip Code'),
                    ]),
            ]);
    }
}
