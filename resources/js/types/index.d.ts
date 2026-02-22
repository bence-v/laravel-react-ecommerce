import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    stripe_account_active: boolean;
    vendor: {
        status: string;
        status_label: string;
        store_name: string;
        store_address: string;
        cover_image: string;
    },
}
export type CartItem = {
  id: number;
  product_id: number;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  option_ids: Record<string, number>;
  options: VariationTypeOption[];
};

export type GroupedCartItems = {
  user: User;
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    appName: string;
    csrf_token?: string;
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    currency_icon: string;
    totalQuantity: number;
    totalPrice: number;
    miniCartItems: CartItem[];
    error: string;
    success: {
        message: string;
        time: number;
    };
    departments: Department[];
    keyword: string;
};

export type Image = {
    id: number;
    thumb: string;
    small: string;
    large: string;
};

export type VariationTypeOption = {
    id: number;
    name: string;
    images: Image[];
    type: VariationType;
}

export type VariationType = {
    id: number;
    name: string;
    type: 'Select' | 'Radio' | 'Image';
    options: VariationTypeOption[];
}

export type Product = {
    id: number;
    title: string;
    slug: string;
    meta_title: string;
    meta_description: string;
    price: number;
    quantity: number;
    image: string;
    images: Image[];
    short_description: string;
    description: string;
    user: {
        id: number;
        name: string;
        store_name: string;
    };
    department: {
        id: number;
        slug: string;
        name: string;
    };
    variationTypes: VariationType[];
    variations: Array<{
        id: number;
        variation_type_option_ids: number[];
        quantity: number;
        price: number;
    }>
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginationProps<T> = {
    data: Array<T>;
    links: PaginationLink[];
    meta: {
        current_page: number;
        last_page: number;
        from: number;
        links: PaginationLink[];
    };
};

export type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    variation_type_option_ids: number[];
    product: {
        id: number;
        title: string;
        slug: string;
        options: {
            name: string;
            options: {
                name: string;
            }[];
        };
        description: string;
        image: string;
    }
};

export type Order = {
    id: number;
    total_price: number;
    status: string;
    created_at: string;
    address: {
        address_line_1: string;
        address_line_2: string;
        city: string;
        zip: string;
    };
    vendorUser: {
        id: string;
        name: string;
        email: string;
        store_name: string;
        store_address: string;
    };
    orderItems: OrderItem[];
};

export type Vendor = {
    id: number;
    store_name: string;
    store_address: string;
};

export type Category = {
    id: number;
    name: string;
};

export type Department = {
    id: number;
    name: string;
    slug: string;
    meta_title: string;
    meta_description: string;
    categories: Category[];
};

export type Address = {
    id: number;
    address_line_1: string;
    address_line_2: string;
    city: string;
    zip: string;
    primary: boolean;
    type: string;
}

