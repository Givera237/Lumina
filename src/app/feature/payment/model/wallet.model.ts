export interface TokenPacks {
  id: string;
  tokens: number;
  label: string;
  priceXAF: number;
  icon: string;
  isPopular?: boolean;
}

export interface PaymentMethods {
  id: 'orange' | 'mtn';
  name: string;
  subtitle: string;
  logoUrl: string;
  logoAlt: string;
  bgColorClass: string;
}