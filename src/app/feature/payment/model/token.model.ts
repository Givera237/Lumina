export interface TokenPack {
  id: string;
  name: string;
  tokens: number;
  description: string;
  priceXAF: number;
  icon: string;
  isPopular?: boolean;
}

export interface PaymentMethod {
  id: 'orange-money' | 'mtn-momo';
  name: string;
  subtitle: string;
  icon: string;
  iconColorClass: string;
  bgColorClass: string;
}