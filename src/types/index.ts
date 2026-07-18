export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  licenseNumber: string;
  createdAt?: Date;
}

export interface Bike {
  _id?: string;
  name: string;
  model: string;
  images: string[];
  price5Hours: number;
  price1Day: number;
  price2Days: number;
  extraKmCharge: number;
  available: boolean;
  features: string[];
  color: string;
}

export interface CartItem {
  totalPrice: any;
  priceSnapshot: any;
  bikeId: string;
  bike: Bike;
  duration: '5hours' | '1day' | '2days';
  startDate: string;
  quantity: number;
}

export interface Booking {
  _id?: string;
  userId: string;
  bikeId: string;
  duration: '5hours' | '1day' | '2days';
  startDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, '_id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bikeId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}
