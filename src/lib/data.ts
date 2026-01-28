// Product type definition
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  sizes?: string[];
}

// Single mock product data
export const categories = [
  'All',
  'Hoodie',
  'T-shirt',
  'Shoes',
];

export const mockProducts: Product[] = [
  {
    id: "weison-essential-tee",
    name: "Ance Studio Hoodie",
    description: "A premium cotton t-shirt with a clean silhouette and a soft, structured drape that holds its shape all day.",
    price: 34.99,
    originalPrice: 44.99,
    image: "/images/ance studio.webp",
    category: "Hoodie",
    rating: 4.8,
    reviews: 1324,
    inStock: true,
    features: [
      "Premium 180gsm cotton",
      "Breathable, all-day comfort",
      "Modern tailored fit",
      "Reinforced stitching",
      "Tag-free neckline",
      "Colorfast finish"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: "weison-essential-shirt",
    name: "Ance Studio Pink T Shirt",
    description: "A refined everyday shirt crafted from premium cotton with a clean, tailored fit and easy-care finish.",
    price: 59.99,
    originalPrice: 79.99,
    image: "/images/ance studio pink.webp",
    category: "T-shirt",
    rating: 4.9,
    reviews: 2148,
    inStock: true,
    features: [
      "Premium 180gsm cotton",
      "Breathable, all-day comfort",
      "Modern tailored fit",
      "Wrinkle-resistant finish",
      "Reinforced stitching",
      "Tag-free neckline"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: "weison-oxford-shirt",
    name: "Weison Polo Shirt",
    description: "A comfortable and stylish hoodie with premium materials, perfect for casual wear and layering.",
    price: 64.99,
    originalPrice: 84.99,
    image: "/images/polo1.avif",
    category: "T-shirt",
    rating: 4.9,
    reviews: 1782,
    inStock: true,
    features: [
      "Oxford weave cotton",
      "Structured spread collar",
      "Wrinkle-resistant finish",
      "Reinforced seams",
      "Button-down cuffs",
      "Easy care"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: "weison-urban-crew",
    name: "Weison Maison Margiela Replica low-top leather sneakers",
    description: "Premium leather sneakers with minimalist design and exceptional comfort.",
    price: 48.0,
    image: "/images/Maison Shoes.webp",
    category: "Shoes",
    rating: 4.6,
    reviews: 412,
    inStock: true,
    features: ["Soft cotton blend", "Everyday comfort", "Relaxed fit", "Easy care"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "weison-minimal-oxford",
    name: "Maison Margiela T-shirt",
    description: "Premium t-shirt with clean lines and modern minimalist design.",
    price: 72.0,
    image: "/images/maison.webp",
    category: "T-shirt",
    rating: 4.7,
    reviews: 288,
    inStock: true,
    features: ["Oxford weave", "Structured collar", "Refined silhouette", "Breathable"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "weison-weekend-linen",
    name: "Chrome Heart Hoodie Fire Black",
    description: "Premium black hoodie with bold Chrome Hearts styling and comfortable fit.",
    price: 68.0,
    image: "/images/chrome heart.webp",
    category: "Hoodie",
    rating: 4.5,
    reviews: 196,
    inStock: true,
    features: ["Breathable linen", "Soft wash finish", "Easy drape", "Warm-weather comfort"],
    sizes: ["S", "M", "L", "XL"]
  },
];

export const mockProduct: Product = mockProducts[0];

// Cart item type
export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

// Order type
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: ShippingAddress;
}

// Shipping address type
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Testimonial type
export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const mockTestimonial: Testimonial = {
  id: "1",
  name: "Sarah Mitchell",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  rating: 5,
  comment: "This shirt fits perfectly and looks polished without feeling stiff. The fabric is breathable and the stitching is top-notch.",
  date: "2024-01-15"
};
