
import { GoogleGenAI, Type } from "@google/genai";
import { Vitals, DiagnosisResult, RiskPredictionResult } from "./types";

const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const checkAI = () => {
  if (!ai) {
    throw new Error("Gemini API Key is missing. Please add GEMINI_API_KEY to your .env file.");
  }
  return ai;
};

export const getAIdiagnosis = async (vitals: Vitals, symptoms: string): Promise<DiagnosisResult> => {
  const prompt = `Analyze patient vitals and symptoms for a primary healthcare worker.
  Vitals: Age ${vitals.age}, Gender ${vitals.gender}, BP ${vitals.bp_systolic}/${vitals.bp_diastolic}, Sugar ${vitals.sugar}, Temp ${vitals.temp}F, SpO2 ${vitals.spo2}%.
  Symptoms: ${symptoms}
  
  Provide likely conditions with probabilities, a risk level (LOW, MODERATE, HIGH), and a suggested treatment protocol.`;

  const response = await checkAI().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          conditions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                probability: { type: Type.NUMBER }
              },
              required: ["name", "probability"]
            }
          },
          riskLevel: { type: Type.STRING, description: "LOW, MODERATE, or HIGH" },
          protocol: { type: Type.STRING }
        },
        required: ["conditions", "riskLevel", "protocol"]
      }
    }
  });

  return JSON.parse(response.text) as DiagnosisResult;
};

export const getHealthRiskPrediction = async (vitals: Vitals, lifestyle: string): Promise<RiskPredictionResult[]> => {
  const prompt = `Predict long-term health risks (5-year window) based on:
  Vitals: BP ${vitals.bp_systolic}/${vitals.bp_diastolic}, Sugar ${vitals.sugar}, Age ${vitals.age}.
  Lifestyle: ${lifestyle}
  
  Predict risk for Diabetes, Hypertension, and Heart Disease.`;

  const response = await checkAI().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            disease: { type: Type.STRING },
            riskPercentage: { type: Type.NUMBER },
            meterLevel: { type: Type.STRING },
            preventivePlan: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["disease", "riskPercentage", "meterLevel", "preventivePlan"]
        }
      }
    }
  });

  return JSON.parse(response.text) as RiskPredictionResult[];
};

export const chatWithAI = async (message: string): Promise<string> => {
  const response = await checkAI().models.generateContent({
    model: 'gemini-2.5-flash',
    contents: message,
    config: {
      systemInstruction: "You are CURE AI, a professional medical assistant for CURE Clinic. Your tone is professional, caring, and informative. Always provide helpful health advice but remind users to consult with our real doctors for definitive diagnosis. Keep responses concise.",
    }
  });
  return response.text || "I'm sorry, I couldn't process that.";
};
