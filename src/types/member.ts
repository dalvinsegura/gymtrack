
export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  emergencyContact: string;
  emergencyPhone: string;
  address: string;
  registrationDate: string;
  plan: Plan;
  status: MembershipStatus;
}

export interface Plan {
  id: string;
  name: string;
  duration: number; // months
  price: number;
  startDate: string;
  endDate: string;
}

export type MembershipStatus = 'active' | 'expired' | 'suspended';

export const PLAN_TYPES = [
  { id: 'monthly', name: 'Mensual', duration: 1, price: 30 },
  { id: 'quarterly', name: 'Trimestral', duration: 3, price: 80 },
  { id: 'semiannual', name: 'Semestral', duration: 6, price: 150 },
  { id: 'annual', name: 'Anual', duration: 12, price: 280 },
];
