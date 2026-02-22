<?php

namespace App\Filament\Resources\Products;

use App\Enums\RolesEnum;
use App\Filament\Resources\Products\Pages\CreateProduct;
use App\Filament\Resources\Products\Pages\EditProduct;
use App\Filament\Resources\Products\Pages\ListProducts;
use App\Filament\Resources\Products\Pages\ProductImages;
use App\Filament\Resources\Products\Pages\ProductVariations;
use App\Filament\Resources\Products\Pages\ProductVariationTypes;
use App\Filament\Resources\Products\Schemas\ProductForm;
use App\Filament\Resources\Products\Tables\ProductsTable;
use App\Models\Product;
use BackedEnum;
use Filament\Facades\Filament;
use Filament\Pages\Enums\SubNavigationPosition;
use Filament\Resources\Pages\Page;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'product';

    protected static ?SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->forVendor();
    }

    public static function form(Schema $schema): Schema
    {
        return ProductForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProductsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
            'images' => ProductImages::route('/images/{record}'),
            'variation-types' => ProductVariationTypes::route('/variation-types/{record}'),
            'variations' => ProductVariations::route('/variations/{record}'),
        ];
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
                EditProduct::class,
                ProductImages::class,
                ProductVariationTypes::class,
                ProductVariations::class,
            ]);
    }

    public static function canViewAny(): bool
    {
        $user = Filament::auth()->user();
        return $user && ($user->hasAnyRole([RolesEnum::Vendor]) || $user->hasAnyRole([RolesEnum::Admin]));
    }
}
