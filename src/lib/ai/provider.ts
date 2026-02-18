export type AIProvider = 'openai' | 'anthropic' | 'google';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

export interface AIGenerateRequest {
  prompt: string;
  type: 'headline' | 'description' | 'cta' | 'full_section' | 'full_page';
  context?: {
    industry?: string;
    targetAudience?: string;
    tone?: string;
    existingContent?: string;
  };
}

export interface AIGenerateResponse {
  content: string;
  provider: AIProvider;
}

const DEFAULT_MODELS: Record<AIProvider, string> = {
  openai: 'gpt-4o',
  anthropic: 'claude-sonnet-4-20250514',
  google: 'gemini-2.0-flash',
};

function buildPrompt(request: AIGenerateRequest): string {
  const { type, context } = request;
  const base = request.prompt || '';

  const typeInstructions: Record<string, string> = {
    headline: 'Generate a compelling headline for a landing page. Return ONLY the headline text, no quotes or formatting.',
    description: 'Generate a persuasive description/subtitle for a landing page section. Return ONLY the text, 1-2 sentences max.',
    cta: 'Generate a high-converting call-to-action button text. Return ONLY the button text, 2-5 words.',
    full_section: 'Generate content for a landing page section as JSON with fields: title, subtitle, description, ctaText. Return valid JSON only.',
    full_page: 'Generate a complete landing page structure as a JSON array of sections. Each section should have: type (hero|features|cta|testimonials|faq|stats|footer), variant (string), props (object with title, subtitle, items, etc). Return valid JSON array only.',
  };

  let prompt = `${typeInstructions[type] || typeInstructions.headline}\n\n`;
  if (base) prompt += `User request: ${base}\n`;
  if (context?.industry) prompt += `Industry: ${context.industry}\n`;
  if (context?.targetAudience) prompt += `Target audience: ${context.targetAudience}\n`;
  if (context?.tone) prompt += `Tone: ${context.tone}\n`;
  if (context?.existingContent) prompt += `Existing content for reference: ${context.existingContent}\n`;

  return prompt;
}

async function callOpenAI(config: AIConfig, prompt: string): Promise<string> {
  const model = config.model || DEFAULT_MODELS.openai;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are an expert landing page copywriter. Be concise and persuasive.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

async function callAnthropic(config: AIConfig, prompt: string): Promise<string> {
  const model = config.model || DEFAULT_MODELS.anthropic;
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
      system: 'You are an expert landing page copywriter. Be concise and persuasive.',
    }),
  });
  if (!res.ok) throw new Error(`Anthropic error: ${res.status}`);
  const data = await res.json();
  return data.content[0].text.trim();
}

async function callGoogle(config: AIConfig, prompt: string): Promise<string> {
  const model = config.model || DEFAULT_MODELS.google;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Google AI error: ${res.status}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text.trim();
}

export async function generateContent(config: AIConfig, request: AIGenerateRequest): Promise<AIGenerateResponse> {
  const prompt = buildPrompt(request);

  const providers: Record<AIProvider, (c: AIConfig, p: string) => Promise<string>> = {
    openai: callOpenAI,
    anthropic: callAnthropic,
    google: callGoogle,
  };

  const handler = providers[config.provider];
  if (!handler) throw new Error(`Unsupported provider: ${config.provider}`);

  const content = await handler(config, prompt);
  return { content, provider: config.provider };
}
