export enum ActivityType {
  SIGHTSEEING = 'SIGHTSEEING',
  FOOD = 'FOOD',
  ACTIVITY = 'ACTIVITY',
  TRANSPORT = 'TRANSPORT',
  REST = 'REST'
}

export interface Location {
  name: string;
  lat?: number;
  lng?: number;
  address?: string;
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  type: ActivityType;
  location?: Location;
  ticketInfo?: string;
  tips?: string;
}

export interface DayPlan {
  date: string;
  dayLabel: string;
  weatherForecast: {
    temp: string;
    condition: string;
    windScale: string;
    icon: string;
  };
  items: ItineraryItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  tags: string[];
  description: string;
  priceLevel: string;
  mustOrder: string[];
  kidFriendly: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}