export type NavItem = {
  name: string;
  href: string;
};

export type MembershipTier = 'Bronze' | 'Silver' | 'Gold VIP' | 'Titanium Elite';

export type UserRole = 'member' | 'trainer' | 'admin';

export interface StageInfo {
  id: number;
  title: string;
  status: string;
  description: string;
}
