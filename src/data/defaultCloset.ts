import { ClothingItem } from '../types';

export const DEFAULT_CLOSET: ClothingItem[] = [
  // Tops (Partes Superiores)
  {
    id: 'top-seda-creme',
    name: 'Camisa de Seda Creme',
    category: 'top',
    subCategory: 'Camisa',
    color: '#eae5d8',
    colorName: 'Creme',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'work_casual', 'meeting', 'weekend'],
    weatherTypes: ['mild', 'hot', 'cold', 'rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  },
  {
    id: 'top-colete-preto',
    name: 'Colete de Alfaiataria Charcoal',
    category: 'top',
    subCategory: 'Colete',
    color: '#1c1c1e',
    colorName: 'Preto',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'work_casual', 'meeting', 'weekend'],
    weatherTypes: ['mild', 'hot'],
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=300&auto=format&fit=crop',
    isFavorite: false,
    lastUsed: null
  },
  {
    id: 'top-camisa-verde',
    name: 'Camisa Algodão Oliva',
    category: 'top',
    subCategory: 'Camisa',
    color: '#3b533d',
    colorName: 'Verde Oliva',
    colorFamily: 'fria',
    occasions: ['work_casual', 'weekend'],
    weatherTypes: ['mild', 'hot'],
    imageUrl: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=300&auto=format&fit=crop',
    isFavorite: false,
    lastUsed: null
  },
  {
    id: 'top-linho-offwhite',
    name: 'Camisa de Linho Off-White',
    category: 'top',
    subCategory: 'Camisa',
    color: '#fafaf9',
    colorName: 'Creme',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'work_casual', 'meeting', 'weekend'],
    weatherTypes: ['mild', 'hot'],
    imageUrl: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  },

  // Bottoms (Partes Inferiores)
  {
    id: 'bottom-alfaiataria-bege',
    name: 'Calça Pantalona Alfaiataria',
    category: 'bottom',
    subCategory: 'Calça',
    color: '#d1c4b2',
    colorName: 'Bege',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'meeting', 'work_casual', 'weekend'],
    weatherTypes: ['cold', 'mild', 'hot', 'rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  },
  {
    id: 'bottom-alfaiataria-preta',
    name: 'Calça Alfaiataria Cremona',
    category: 'bottom',
    subCategory: 'Calça',
    color: '#121212',
    colorName: 'Preto',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'meeting', 'work_casual'],
    weatherTypes: ['cold', 'mild', 'rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  },

  // Shoes (Calçados)
  {
    id: 'shoes-scarpin-nude',
    name: 'Scarpin Nude Clássico',
    category: 'shoes',
    subCategory: 'Scarpin',
    color: '#dfcebb',
    colorName: 'Nude',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'meeting', 'work_casual'],
    weatherTypes: ['mild', 'hot', 'cold', 'rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  },
  {
    id: 'shoes-mule-couro',
    name: 'Mule de Couro Premium',
    category: 'shoes',
    subCategory: 'Mule',
    color: '#2d2d2d',
    colorName: 'Café Escuro',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'work_casual', 'meeting'],
    weatherTypes: ['mild', 'hot'],
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300&auto=format&fit=crop',
    isFavorite: false,
    lastUsed: null
  },
  {
    id: 'shoes-tenis-branco',
    name: 'Tênis Casual Minimal',
    category: 'shoes',
    subCategory: 'Tênis',
    color: '#ffffff',
    colorName: 'Branco',
    colorFamily: 'neutra',
    occasions: ['work_casual', 'weekend'],
    weatherTypes: ['mild', 'hot', 'cold'],
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=300&auto=format&fit=crop',
    isFavorite: false,
    lastUsed: null
  },

  // Outerwear (Casacos/Blazers)
  {
    id: 'out-blazer-bege',
    name: 'Blazer Alfaiataria Milão',
    category: 'outerwear',
    subCategory: 'Blazer',
    color: '#d6d3d1',
    colorName: 'Bege Fendi',
    colorFamily: 'neutra',
    occasions: ['work_formal', 'meeting', 'work_casual'],
    weatherTypes: ['cold', 'mild', 'rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  },

  // Accessories (Acessórios)
  {
    id: 'acc-bolsa-marrom',
    name: 'Bolsa Estruturada Marrom',
    category: 'accessory',
    subCategory: 'Bolsa',
    color: '#7a421b',
    colorName: 'Marrom',
    colorFamily: 'quente',
    occasions: ['work_formal', 'meeting', 'work_casual', 'weekend'],
    weatherTypes: ['cold', 'mild', 'hot', 'rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop',
    isFavorite: true,
    lastUsed: null
  }
];
