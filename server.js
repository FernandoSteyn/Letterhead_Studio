const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = 5000;

// Initialize Gemini AI with validation
let ai = null;
let aiConfigured = false;

try {
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== "") {
        ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        aiConfigured = true;
        console.log('✅ Gemini AI configured successfully');
    } else {
        console.log('⚠️ Gemini API key not found');
    }
} catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error.message);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Add CORS headers for all requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/generator', (req, res) => {
    res.sendFile(path.join(__dirname, 'letterhead-generator.html'));
});

// API endpoint for generating letters
app.post('/api/generate-letter', async (req, res) => {
    try {
        const { prompt, companyName, recipientName } = req.body;
        
        if (!prompt) {
            return res.json({ success: false, error: 'Prompt is required' });
        }

        // Check if AI is configured
        if (!aiConfigured || !ai) {
            console.log('❌ AI service not available, using template fallback');
            return res.json({
                success: false,
                error: 'AI service temporarily unavailable. Please check your Gemini API key configuration.'
            });
        }

        const systemPrompt = `You are a professional business letter master. Write ONLY the letter body content - never include letterhead, addresses, dates, or signatures.

STRICT FORMAT:
1. Start with: "Dear ${recipientName || '[Recipient Name]'},"
2. Write 2-3 professional paragraphs for the letter body
3. End with: "Sincerely,"
4. Use simple HTML: <p> tags for paragraphs only

NEVER INCLUDE:
- Company names, addresses, phone numbers
- Dates or letterhead information  
- Signature blocks (names, titles, companies)
- Complex HTML formatting

WRITING STYLE:
- Professional yet approachable business tone
- Clear, concise, and direct communication
- Proper grammar and business etiquette
- Action-oriented language when appropriate

REQUEST: ${prompt}

Generate the letter body content now:`;

        console.log('🤖 Calling Gemini AI...');
        
        const response = await Promise.race([
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{
                    parts: [{ text: systemPrompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 30000)
            )
        ]);

        let generatedContent = response.text || "I apologize, but I'm unable to generate the letter at this moment. Please try again.";
        
        // Clean up the content - remove any markdown or extra formatting
        generatedContent = generatedContent
            .replace(/```html?/gi, '')
            .replace(/```/g, '')
            .trim();
        
        console.log('✅ AI response received successfully');
        res.json({ 
            success: true, 
            content: generatedContent 
        });

    } catch (error) {
        console.error('❌ AI Generation Error:', error.message);
        
        let errorMessage = 'Unable to connect to AI service. ';
        
        if (error.message.includes('API_KEY')) {
            errorMessage += 'Invalid API key configuration.';
        } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
            errorMessage += 'Network connection issue. Please check your internet connection.';
        } else if (error.message.includes('quota') || error.message.includes('limit')) {
            errorMessage += 'API quota exceeded. Please try again later.';
        } else {
            errorMessage += 'Please try again or check your Gemini API key.';
        }
        
        res.json({ 
            success: false, 
            error: errorMessage
        });
    }
});

// API endpoint to test AI connectivity
app.post('/api/test-ai', async (req, res) => {
    try {
        if (!aiConfigured || !ai) {
            return res.json({ 
                success: false, 
                error: 'Gemini API not configured. Please check your API key.',
                details: {
                    hasApiKey: !!process.env.GEMINI_API_KEY,
                    keyLength: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0
                }
            });
        }

        console.log('🧪 Testing AI connectivity...');
        
        const testResponse = await Promise.race([
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{
                    parts: [{ text: "Say 'AI test successful' in one sentence." }]
                }]
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Connection timeout')), 15000)
            )
        ]);

        console.log('✅ AI test successful');
        res.json({ 
            success: true, 
            message: 'AI service is working properly',
            testResponse: testResponse.text
        });

    } catch (error) {
        console.error('❌ AI test failed:', error.message);
        res.json({ 
            success: false, 
            error: error.message,
            details: {
                hasApiKey: !!process.env.GEMINI_API_KEY,
                errorType: error.name || 'Unknown'
            }
        });
    }
});

// API endpoint for improving existing letters
app.post('/api/improve-letter', async (req, res) => {
    try {
        const { content } = req.body;
        
        if (!content) {
            return res.json({ success: false, error: 'Content is required' });
        }

        const improvePrompt = `Please improve this business letter by making it more professional, clear, and impactful. Maintain the core message but enhance the language, structure, and flow. Format as HTML with proper paragraph tags:

Original letter:
${content}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{
                parts: [{ text: improvePrompt }]
            }],
        });

        const improvedContent = response.text || content;
        
        res.json({ 
            success: true, 
            content: improvedContent 
        });

    } catch (error) {
        console.error('AI Improvement Error:', error);
        res.json({ 
            success: false, 
            error: 'Unable to improve content at this time' 
        });
    }
});

// API endpoint for adjusting tone
app.post('/api/adjust-tone', async (req, res) => {
    try {
        const { content, tone } = req.body;
        
        if (!content || !tone) {
            return res.json({ success: false, error: 'Content and tone are required' });
        }

        const toneInstructions = {
            formal: 'Make this letter more formal and professional. Use formal business language, proper titles, and respectful tone.',
            friendly: 'Make this letter more friendly and approachable while maintaining professionalism. Use warmer language and a more personal tone.'
        };

        const tonePrompt = `${toneInstructions[tone]} Format as HTML with proper paragraph tags:

Original letter:
${content}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: tonePrompt,
        });

        const adjustedContent = response.text || content;
        
        res.json({ 
            success: true, 
            content: adjustedContent 
        });

    } catch (error) {
        console.error('AI Tone Adjustment Error:', error);
        res.json({ 
            success: false, 
            error: 'Unable to adjust tone at this time' 
        });
    }
});

// Generic API endpoint for AI operations (humanize, generate, improve)
app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.json({ success: false, error: 'Prompt is required' });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const generatedContent = response.text || "Unable to process request at this time.";
        
        res.json({ 
            success: true, 
            content: generatedContent 
        });

    } catch (error) {
        console.error('AI Generation Error:', error);
        res.json({ 
            success: false, 
            error: 'Unable to generate content at this time' 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 AI-Powered Letterhead Generator running on port ${port}`);
    console.log(`📝 Access the generator at: http://localhost:${port}/generator`);
    console.log(`🤖 Gemini AI integration: ${process.env.GEMINI_API_KEY ? 'Connected' : 'Not configured'}`);
});

module.exports = app;