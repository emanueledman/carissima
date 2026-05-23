import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables (.env files)
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy client setup for Gemini API
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn("WARNING: GEMINI_API_KEY is not configured or uses the placeholder. Smart Stylist AI will fall back to local rule-based tips.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST Endpoint: Get Custom Stylist Feedback
app.post('/api/stylist', async (req, res) => {
  try {
    const { outfit, occasion, weather } = req.body;
    
    if (!outfit || !occasion || !weather) {
      return res.status(400).json({ error: 'Faltam dados do look, ocasião ou clima.' });
    }

    const { top, bottom, shoes, outerwear, accessory } = outfit;

    const topDesc = top ? `${top.name} (${top.subCategory}) na cor ${top.colorName}` : 'Nenhum';
    const bottomDesc = bottom ? `${bottom.name} (${bottom.subCategory}) na cor ${bottom.colorName}` : 'Nenhum';
    const shoesDesc = shoes ? `${shoes.name} (${shoes.subCategory}) na cor ${shoes.colorName}` : 'Nenhum';
    const outerwearDesc = outerwear ? `${outerwear.name} (${outerwear.subCategory}) na cor ${outerwear.colorName}` : 'Nenhum';
    const accessoryDesc = accessory ? `${accessory.name} (${accessory.subCategory}) na cor ${accessory.colorName}` : 'Nenhum';

    const occasionMap: Record<string, string> = {
      work_formal: 'Trabalho Formal (Ambiente executivo/alinhado)',
      work_casual: 'Trabalho Casual / Home Office',
      meeting: 'Reunião Importante com Chefes/Clientes',
      weekend: 'Fim de Semana / Lazer Casual'
    };

    const weatherMap: Record<string, string> = {
      cold: 'Frio extremo / Inverno',
      mild: 'Clima ameno / Agradável',
      hot: 'Calor quente / Sol',
      rainy: 'Chuvoso / Úmido'
    };

    const ai = getAiClient();
    
    // Fallback if API Key isn't available
    if (!ai) {
      return res.json({
        title: `Look ${occasionMap[occasion]?.split(' ')[0] || 'Moderno'}`,
        commentary: `Este look combina perfeitamente. O tom do item ${top?.name || ''} harmoniza super bem com ${bottom?.name || ''} para um visual confortável e elegante. Perfeito para usar hoje no clima de ${weatherMap[weather] || 'hoje'}!`,
        challenge: `Adicione um acessório discreto (brinco ou relógio) para elevar o look de hoje.`,
        compliment: `Você está maravilhosa! Vista seu melhor sorriso e tenha um dia incrível.`,
        fromAi: false
      });
    }

    const systemPrompt = `Você é uma estilista profissional de moda pessoal altamente sofisticada, carinhosa, experiente e encorajadora. Você ajuda uma mulher que trabalha de manhã a se vestir com velocidade, estilo e autoconfiança. Sua resposta deve estar sempre em Português do Brasil (pt-BR).`;

    const instructionsPrompt = `
      Analise o Outfit escolhido:
      - Peça Superior (Top): ${topDesc}
      - Peça Inferior (Bottom): ${bottomDesc}
      - Calçado (Shoes): ${shoesDesc}
      - Casaco/Outerwear: ${outerwearDesc}
      - Acessório: ${accessoryDesc}

      Contexto do Dia:
      - Ocasião/Atividade: ${occasionMap[occasion] || occasion}
      - Clima/Temperatura: ${weatherMap[weather] || weather}

      Gere uma resposta no formato JSON estruturado com os seguintes campos obrigatórios:
      - "title": Um título curto (máximo de 4 palavras) charmoso e criativo para este outfit específico, ex: "Moderno Minimalista", "Casual Chique de Outono", "Executiva Moderna".
      - "commentary": Um parágrafo super fluido (no máximo 3 frases) explicando do ponto de vista da moda e teoria das cores porque esse look funciona tão bem junto e por que é adequado para o clima e para a ocasião de hoje. Destaque contrastes de tons, caimentos ou silhuetas.
      - "challenge": Um pequeno desafio diário (máximo de 15 palavras) divertido e fácil para torná-la estilosa ou tirá-la ligeiramente da zona de conforto (ex: "Dobre sutilmente a manga da camisa", "Combine com seu batom vermelho favorito", "Adicione um cinto para marcar a cintura").
      - "compliment": Um elogio matinal atencioso, caloroso e personalizado de bom dia para que ela saia de casa sorrindo e com pressa positiva.

      Não invente marcas. Fale de forma inspiracional com jargão leve de consultoria de imagem (ex: 'alongamento de silhueta', 'ponto focal', 'harmonia cromática').
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: instructionsPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['title', 'commentary', 'challenge', 'compliment'],
          properties: {
            title: {
              type: Type.STRING,
              description: 'Título curto e elegante do look'
            },
            commentary: {
              type: Type.STRING,
              description: 'Estudo do look e explicação de moda das combinações de peças e cores para o clima e ocasião de forma estimulante'
            },
            challenge: {
              type: Type.STRING,
              description: 'Desafio curto para elevar o visual'
            },
            compliment: {
              type: Type.STRING,
              description: 'Elogio pessoal fofo de bom dia'
            }
          }
        }
      }
    });

    const outputText = response.text || '';
    const result = JSON.parse(outputText);

    return res.json({
      title: result.title || 'Look Harmonioso',
      commentary: result.commentary || 'Excelente coordenação de cores e peças para a sua rotina moderna.',
      challenge: result.challenge || 'Trabalhe o caimento com um ajuste sutil nas mangas!',
      compliment: result.compliment || 'Você tem um estilo próprio magnífico. Vá e arrase!',
      fromAi: true
    });

  } catch (error) {
    console.error('Erro na rota /api/stylist:', error);
    // Silent recovery to guarantee seamless operation under any crash
    return res.json({
      title: 'Combinação Moderna',
      commentary: 'A harmonia das proporções e texturas deste visual traz sofisticação imediata, transmitindo segurança e praticidade para o seu compromisso.',
      challenge: 'Experimente um penteado diferente ou dobre as mangas para um toque descontraído!',
      compliment: 'Pronta em segundos, elegante o dia inteiro! Tenha uma excelente manhã.',
      fromAi: false
    });
  }
});

// Configure Vite integration or Static delivery
async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Mount Vite dev middleware
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    // Assets distribution serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Production static distribution serving is configured');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Morning Outfit Picker running on port http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Failed to initialize server:', err);
});
