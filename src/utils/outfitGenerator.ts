import { ClothingItem, Outfit, ClotheOccasion, WeatherType, HistoryEntry, StyleProfile } from '../types';

/**
 * Score a candidate clothing item based on preferences, favorites, recency, etc.
 */
function evaluateItem(
  item: ClothingItem,
  history: HistoryEntry[],
  styleProfile: StyleProfile,
  occasion: ClotheOccasion,
  weather: WeatherType
): number {
  let score = 100;

  // 1. Favor favoritismo
  if (item.isFavorite) {
    score += 25; // Favorito bias
  }

  // 2. Proteger contra repetição recente
  const lastUsedDaysLimit = 3;
  const recentHistory = history.slice(0, lastUsedDaysLimit);
  recentHistory.forEach((entry, idx) => {
    const recencyPenalty = (lastUsedDaysLimit - idx) * 35; // Penaliza mais se usado ontem
    if (
      entry.outfit.top.id === item.id ||
      entry.outfit.bottom.id === item.id ||
      entry.outfit.shoes.id === item.id ||
      entry.outfit.outerwear?.id === item.id
    ) {
      score -= recencyPenalty;
    }
  });

  // 3. Estilo Preferido
  if (styleProfile.favoriteColors.includes(item.color)) {
    score += 15;
  }
  if (styleProfile.avoidColors.includes(item.color)) {
    score -= 50;
  }

  // 4. Perfeição de clima e ocasião
  if (item.occasions.includes(occasion)) {
    score += 15;
  }
  if (item.weatherTypes.includes(weather)) {
    score += 15;
  }

  return score;
}

/**
 * Checks color harmony between selected items
 */
function evaluateColorHarmony(top: ClothingItem, bottom: ClothingItem, outerwear?: ClothingItem): number {
  let harmonyBonus = 0;

  const families = [top.colorFamily, bottom.colorFamily];
  if (outerwear) families.push(outerwear.colorFamily);

  // Regra 1: Tons neutros combinam com absolutamente tudo! O visual fica limpo e minimalista moderno.
  const neutralCount = families.filter(f => f === 'neutra').length;
  if (neutralCount === families.length) {
    harmonyBonus += 20; // Visual monocromático ou neutro é super chique
  } else if (neutralCount >= 1) {
    harmonyBonus += 15; // Equilibrar uma peça colorida com neutros é excelente
  }

  // Regra 2: Evitar misturar quente + frio extremos a menos que neutros estejam envolvidos
  const hasWarm = families.includes('quente');
  const hasCool = families.includes('fria');
  if (hasWarm && hasCool && neutralCount === 0) {
    harmonyBonus -= 15; // Choque térmico de cores não-neutras pode ficar confuso de manhã
  }

  return harmonyBonus;
}

export function generateSmartOutfit(
  closet: ClothingItem[],
  occasion: ClotheOccasion,
  weather: WeatherType,
  history: HistoryEntry[],
  styleProfile: StyleProfile
): Outfit | null {
  if (closet.length === 0) return null;

  // 1. Filtrar e pontuar Tops
  let topCandidates = closet.filter(item => item.category === 'top');
  if (topCandidates.length === 0) return null;
  
  // Preferir que combinem com a ocasião e o clima
  let mainTops = topCandidates.filter(t => t.occasions.includes(occasion) && t.weatherTypes.includes(weather));
  if (mainTops.length === 0) {
    // Relaxa clima
    mainTops = topCandidates.filter(t => t.occasions.includes(occasion));
  }
  if (mainTops.length === 0) {
    // Relaxa tudo
    mainTops = topCandidates;
  }

  // 2. Filtrar e pontuar Bottoms
  let bottomCandidates = closet.filter(item => item.category === 'bottom');
  if (bottomCandidates.length === 0) return null;

  let mainBottoms = bottomCandidates.filter(b => b.occasions.includes(occasion) && b.weatherTypes.includes(weather));
  if (mainBottoms.length === 0) {
    mainBottoms = bottomCandidates.filter(b => b.occasions.includes(occasion));
  }
  if (mainBottoms.length === 0) {
    mainBottoms = bottomCandidates;
  }

  // 3. Filtrar e pontuar Shoes
  let shoesCandidates = closet.filter(item => item.category === 'shoes');
  if (shoesCandidates.length === 0) return null;

  let mainShoes = shoesCandidates.filter(s => s.occasions.includes(occasion) && s.weatherTypes.includes(weather));
  if (mainShoes.length === 0) {
    mainShoes = shoesCandidates.filter(s => s.occasions.includes(occasion));
  }
  if (mainShoes.length === 0) {
    mainShoes = shoesCandidates;
  }

  // Se o clima for frio ou chuvoso, Outerwear (casaco) é altamente recomendado
  let outerwearCandidates = closet.filter(item => item.category === 'outerwear');
  let selectedOuterwear: ClothingItem | undefined;

  const requiresOuterwear = weather === 'cold' || weather === 'rainy' || weather === 'mild';

  if (requiresOuterwear && outerwearCandidates.length > 0) {
    // Filtra outerwear
    let mainOuterwear = outerwearCandidates.filter(o => o.occasions.includes(occasion) && o.weatherTypes.includes(weather));
    if (mainOuterwear.length === 0) {
      mainOuterwear = outerwearCandidates.filter(o => o.occasions.includes(occasion));
    }
    if (mainOuterwear.length === 0) {
      mainOuterwear = outerwearCandidates;
    }
    
    // Pontua e escolhe o melhor
    const scoredOuter = mainOuterwear.map(o => ({
      item: o,
      score: evaluateItem(o, history, styleProfile, occasion, weather)
    })).sort((a, b) => b.score - a.score);

    if (scoredOuter.length > 0) {
      selectedOuterwear = scoredOuter[0].item;
    }
  }

  // Acessórios
  let accessoryCandidates = closet.filter(item => item.category === 'accessory');
  let selectedAccessory: ClothingItem | undefined;
  if (accessoryCandidates.length > 0) {
    const mainAccs = accessoryCandidates.filter(a => a.occasions.includes(occasion));
    const finalAccs = mainAccs.length > 0 ? mainAccs : accessoryCandidates;

    const scoredAcc = finalAccs.map(a => ({
      item: a,
      score: evaluateItem(a, history, styleProfile, occasion, weather)
    })).sort((a, b) => b.score - a.score);

    if (scoredAcc.length > 0) {
      selectedAccessory = scoredAcc[0].item;
    }
  }

  // Vamos montar combinações de (Top, Bottom, Shoes) e avaliar a harmonia de cores
  interface Combination {
    top: ClothingItem;
    bottom: ClothingItem;
    shoes: ClothingItem;
    totalScore: number;
  }

  const combinations: Combination[] = [];

  for (const t of mainTops) {
    const tScore = evaluateItem(t, history, styleProfile, occasion, weather);
    for (const b of mainBottoms) {
      const bScore = evaluateItem(b, history, styleProfile, occasion, weather);
      for (const s of mainShoes) {
        const sScore = evaluateItem(s, history, styleProfile, occasion, weather);

        // Score de cor
        const colorHarmonyScore = evaluateColorHarmony(t, b, selectedOuterwear);

        combinations.push({
          top: t,
          bottom: b,
          shoes: s,
          totalScore: tScore + bScore + sScore + colorHarmonyScore
        });
      }
    }
  }

  if (combinations.length === 0) return null;

  // Ordena por pontuação e escolhe a melhor combinação (com um leve elemento de variação randômica controlada se estiverem com notas próximas!)
  // Isso evita sugerir EXATAMENTE a mesma coisa se ela regenerar o look, criando surpresa moderada!
  combinations.sort((a, b) => b.totalScore - a.totalScore);

  // Pequeno ruído aleatório nos top 3 para dar alternativas frescas
  const topSize = Math.min(3, combinations.length);
  const randomIndex = Math.floor(Math.random() * topSize);
  const bestComb = combinations[randomIndex];

  return {
    id: `outfit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    top: bestComb.top,
    bottom: bestComb.bottom,
    shoes: bestComb.shoes,
    outerwear: selectedOuterwear,
    accessory: selectedAccessory
  };
}
