export interface Order {
  id: number
  productName: string
  purchasePlace: string
  fullName: string
  phone: string
  amount: number
  term: number
  monthlyPayment: number
  totalAmount: number
  downPayment?: number
  percent?: number
  isRead: boolean
  createdAt: string
}

export interface CreateOrderPayload {
  productName: string
  purchasePlace: string
  fullName: string
  phone: string
  amount: number
  term: number
  monthlyPayment: number
  totalAmount: number
  downPayment: number
  percent: number
  isRead: false
  createdAt: string
}

export interface ProductCard {
  id: number
  title: string
  imageUrl: string
}

export interface CreateCardPayload {
  title: string
  imageUrl: string
}

export interface ProcSettings {
  id: number
  percent: number
}

export interface AuthUser {
  id: number
  email: string
  fullName?: string
}

export interface AuthResponse {
  token: string
  data: AuthUser
}

export interface InstallmentResult {
  monthlyPayment: number
  lastPayment: number
  paymentsCount: number
  totalAmount: number
  amount: number
  term: number
  downPayment: number
  financedAmount: number
  percent: number
  hasUnevenLastPayment: boolean
}

export interface OrderStats {
  today: number
  week: number
  month: number
  total: number
}
