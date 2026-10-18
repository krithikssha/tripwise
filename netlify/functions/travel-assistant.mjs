
import { GoogleGenAI } from "@google/genai";

export default async function handler(request) {
  // Allow only POST requests.
  if (request.method !== "POST") {
    return Response.json(
      { error: "Only POST requests are allowed." },
      { status: 405 }
    );
  }

  // Keep the API key on the server.
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "Gemini API key is not configured on the server.",
      },
      { status: 500 }
    );
  }

  try {
    // Read and validate the user's preferences.
    const body = await request.json();
    const preferences = body?.preferences;

    if (
      typeof preferences !== "string" ||
      !preferences.trim() ||
      preferences.length > 1200
    ) {
      return Response.json(
        {
          error:
            "Please enter travel preferences of up to 1200 characters.",
        },
        { status: 400 }
      );
    }

    // Connect to Gemini.
    const ai = new GoogleGenAI({ apiKey });

    // Generate travel recommendations.
    const result = await ai.models.generateContent({
      model: "gemini-3.8-flash",

      contents: `
You are TripWise's friendly, thoughtful AI travel planner.

Create useful, realistic travel suggestions tailored to the
user's preferences. Write in clear, natural English.

USER PREFERENCES:
${preferences.trim()}

IMPORTANT RULES:

1. If the user names a destination, focus on that destination.
   Do not replace it with unrelated destinations.
2. If no destination is named, suggest up to three options.
3. Match the requested trip duration. If none is given, assume
   three days and state that assumption.
4. Keep the itinerary practical, with a manageable number of
   activities per day and sensible geographical grouping.
5. Include relevant local food, cultural experiences, scenery,
   markets or activities based on the user's interests.
6. Provide budget estimates only when appropriate. State the
   currency, assumptions and that prices are not verified.
7. Do not claim to have checked live prices, opening hours,
   availability, weather or transport schedules.
8. Do not invent facts. If details are missing, make reasonable
   assumptions and briefly mention them.
9. Avoid lengthy introductions and repetitive descriptions.
10. Finish every sentence and section. Never intentionally end
    the answer halfway through a sentence or bullet point.

USE THIS FORMAT:

## ✦ YOUR TRAVEL MATCH
Give a short, personalised introduction.

## DESTINATION IDEAS
Explain why the destination or suggested options match the
user's interests. Keep this section concise.

## YOUR SUGGESTED ITINERARY
Organise the plan by day, with practical activities and
suggestions for meals or breaks where relevant.

## LOCAL EXPERIENCES
Recommend a few relevant local foods, cultural experiences,
markets, scenic places or activities.

## BUDGET & PRACTICAL NOTES
Include a reasonable estimated budget when enough information
is available. Explain what the estimate includes and what
the traveller should verify.

Finish with one short, useful travel tip.

Keep the entire response concise enough to finish comfortably.
Prefer complete, specific recommendations over long descriptions.
Return the complete answer in Markdown.
`,

      config: {
        maxOutputTokens: 3000,
        
      },
    });

    // Extract the generated response.
    const recommendation = result.text?.trim();
    const finishReason =
      result.candidates?.[0]?.finishReason;

    // Diagnostic logs for troubleshooting incomplete answers.
    console.log("Gemini finish reason:", finishReason);
    console.log(
      "Gemini response length:",
      recommendation?.length ?? 0
    );

    if (!recommendation) {
      console.error(
        "Gemini returned no text. Finish reason:",
        finishReason
      );

      return Response.json(
        {
          error:
            "No recommendations were returned. Please try again.",
        },
        { status: 502 }
      );
    }

    // Send the response to the frontend.
    return Response.json({
      recommendation,
      finishReason,
    });
  } catch (error) {
    console.error(
      "Gemini request failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return Response.json(
      {
        error:
          "The AI assistant could not respond. Please try again.",
      },
      { status: 502 }
    );
  }
}
