import { Car, ConciergeBell, BedDouble, Gift, UtensilsCrossed, Heart, LucideIcon } from "lucide-react";

export interface BenefitItemData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const BENEFIT_ITEMS: BenefitItemData[] = [
  {
    id: "airport-transportation",
    icon: Car,
    title: "Airport transportation",
    description: "Transfers between the airport and your resort, arranged for you.",
  },
  {
    id: "dedicated-concierge",
    icon: ConciergeBell,
    title: "Dedicated concierge",
    description: "One point of contact before and during your stay.",
  },
  {
    id: "priority-room-requests",
    icon: BedDouble,
    title: "Priority room requests",
    description: "Your room preferences handled ahead of arrival.",
  },
  {
    id: "vip-welcome-amenity",
    icon: Gift,
    title: "VIP welcome amenity",
    description: "A thoughtful welcome waiting in your room.",
  },
  {
    id: "preferred-dining-reservations",
    icon: UtensilsCrossed,
    title: "Preferred dining reservations",
    description: "Priority seating at the resort restaurants.",
  },
  {
    id: "personalized-service",
    icon: Heart,
    title: "Personalized service",
    description: "Care that adapts to your family's needs.",
  },
];
