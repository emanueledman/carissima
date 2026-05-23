export type ClotheCategory = 'top' | 'bottom' | 'shoes' | 'outerwear' | 'accessory';

export type ClotheOccasion = 'work_formal' | 'work_casual' | 'meeting' | 'weekend';

export type WeatherType = 'cold' | 'mild' | 'hot' | 'rainy';

export type ColorFamily = 'neutra' | 'quente' | 'fria' | 'metalica';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClotheCategory;
  subCategory: string; // e.g. "Camisa", "Calça Alfaiataria", "Blazer", "Tênis", "Vestido", "Óculos"
  color: string; // Hex color string, e.g. "#1e293b"
  colorName: string; // Friendly name, e.g. "Azul Marinho"
  colorFamily: ColorFamily;
  occasions: ClotheOccasion[];
  weatherTypes: WeatherType[];
  imageUrl: string; // Can be direct SVG markup, placeholder string, or base64 data URL
  customImage?: boolean; // Whether the user uploaded their own photo
  isFavorite: boolean;
  lastUsed: string | null; // ISO Date string, e.g. "2026-05-23"
}

export interface Outfit {
  id: string;
  top: ClothingItem;
  bottom: ClothingItem;
  shoes: ClothingItem;
  outerwear?: ClothingItem; // Required if code is 'cold' or 'rainy'
  accessory?: ClothingItem;
}

export interface HistoryEntry {
  id: string;
  date: string; // "YYYY-MM-DD"
  outfit: Outfit;
  occasion: ClotheOccasion;
  weather: WeatherType;
  timeSavedMinutes: number; // e.g., 15 minutes
  rating: 'love' | 'good' | 'neutral' | 'bad';
  comment?: string;
}

export interface StyleProfile {
  styleType: 'minimalist' | 'chic' | 'casual' | 'creative';
  favoriteColors: string[]; // hex codes
  avoidColors: string[]; // hex codes
}

export interface StylistFeedback {
  title: string;
  commentary: string; // Why it matches, color theory, etc.
  challenge: string; // Gamification challenge ("Add a dash of red")
  compliment: string; // Morning energizer compliment
  fromAi: boolean; // True if it came from Gemini, false if rule-based fallback
}

export interface AppStats {
  totalOutfitsChoosen: number;
  totalTimeSavedMinutes: number;
  currentStreakDays: number;
  lastUsedDate: string | null;
}
