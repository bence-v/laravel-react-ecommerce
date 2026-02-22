<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrderInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('total_price')
                    ->money(),
                TextEntry::make('user.name')
                    ->label('Customer Name'),
                TextEntry::make('status'),
                TextEntry::make('online_payment_commission')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('website_commission')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('vendor_subtotal')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                Section::make('Address')
                    ->schema([
                        TextEntry::make('address.address_line_1')
                            ->label('Address Line 1'),
                        TextEntry::make('address.address_line_2')
                            ->label('Address Line 2'),
                        TextEntry::make('address.city')
                            ->label('City'),
                        TextEntry::make('address.zip')
                            ->label('Zip Code'),
                    ]),

            ]);
    }
}
