const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
const port = 5000;

console.log('🚀 Starting Simple AI Server...');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// CORS headers
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

// Simple Gemini API function
function callGeminiDirect(prompt) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            port: 443,
            path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                console.log('📨 Raw Gemini response:', responseData);
                try {
                    const parsed = JSON.parse(responseData);
                    if (parsed.candidates && parsed.candidates[0] && parsed.candidates[0].content) {
                        const result = parsed.candidates[0].content.parts[0].text;
                        console.log('✅ Extracted text:', result);
                        resolve(result);
                    } else {
                        console.error('❌ Invalid response structure:', parsed);
                        reject(new Error('Invalid API response structure'));
                    }
                } catch (error) {
                    console.error('❌ Parse error:', error);
                    reject(new Error('Failed to parse API response'));
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Request error:', error);
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/generator', (req, res) => {
    res.sendFile(path.join(__dirname, 'letterhead-generator.html'));
});

app.get('/debug', (req, res) => {
    res.sendFile(path.join(__dirname, 'debug.html'));
});

// Test AI endpoint
app.post('/api/test-ai', async (req, res) => {
    console.log('🧪 Testing AI connectivity...');
    
    if (!process.env.GEMINI_API_KEY) {
        return res.json({
            success: false,
            error: 'No API key configured',
            details: { hasApiKey: false }
        });
    }

    try {
        const testResponse = await callGeminiDirect('Say "AI test successful."');
        console.log('✅ AI test successful');
        
        res.json({
            success: true,
            message: 'AI service is working properly',
            testResponse: testResponse
        });
    } catch (error) {
        console.error('❌ AI test failed:', error);
        res.json({
            success: false,
            error: error.message,
            details: { hasApiKey: true, errorType: error.name }
        });
    }
});

// Generate letter endpoint
app.post('/api/generate-letter', async (req, res) => {
    console.log('🤖 Generating letter...');
    console.log('📝 Request body:', req.body);

    if (!process.env.GEMINI_API_KEY) {
        return res.json({
            success: false,
            error: 'AI service not configured'
        });
    }

    try {
        const { prompt, companyName = 'General Material Ckraftmanship', recipientName = 'Valued Client' } = req.body;
        
        if (!prompt) {
            return res.json({
                success: false,
                error: 'Prompt is required'
            });
        }

        const letterPrompt = `Write a professional business letter with the following requirements:

Company: ${companyName}
Recipient: ${recipientName}
Request: ${prompt}

Instructions:
- Start with "Dear ${recipientName},"
- Write only the letter body content (no letterhead, no company address)
- Use professional, courteous tone
- End with "Sincerely," 
- Keep it concise and business-appropriate
- Format with proper paragraphs`;

        console.log('🤖 Calling Gemini with prompt:', letterPrompt);
        const content = await callGeminiDirect(letterPrompt);
        
        console.log('✅ Letter generated successfully');
        res.json({
            success: true,
            content: content
        });

    } catch (error) {
        console.error('❌ Letter generation failed:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Improve letter endpoint
app.post('/api/improve-letter', async (req, res) => {
    console.log('🎨 Improving letter...');
    console.log('📝 Request body:', req.body);

    if (!process.env.GEMINI_API_KEY) {
        return res.json({
            success: false,
            error: 'AI service not configured'
        });
    }

    try {
        const { content, companyName = 'General Material Ckraftmanship', recipientName = 'Valued Client' } = req.body;
        
        if (!content) {
            return res.json({
                success: false,
                error: 'Letter content is required'
            });
        }

        const improvePrompt = `Please improve this business letter by making it more professional, clear, and engaging while maintaining the same meaning:

Company: ${companyName}
Recipient: ${recipientName}

Original letter:
${content}

Instructions:
- Keep the same structure and greeting
- Improve clarity and professionalism
- Use better business language
- Maintain the original intent
- End with "Sincerely,"`;

        console.log('🤖 Calling Gemini for improvement...');
        const improvedContent = await callGeminiDirect(improvePrompt);
        
        console.log('✅ Letter improved successfully');
        res.json({
            success: true,
            content: improvedContent
        });

    } catch (error) {
        console.error('❌ Letter improvement failed:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Humanize text endpoint
app.post('/api/humanize-text', async (req, res) => {
    console.log('👤 Humanizing text...');
    console.log('📝 Request body:', req.body);

    if (!process.env.GEMINI_API_KEY) {
        return res.json({
            success: false,
            error: 'AI service not configured'
        });
    }

    try {
        const { content, companyName = 'General Material Ckraftmanship', recipientName = 'Valued Client' } = req.body;
        
        if (!content) {
            return res.json({
                success: false,
                error: 'Text content is required'
            });
        }

        const humanizePrompt = `Please rewrite this business letter to make it sound more natural, warm, and human while remaining professional:

Company: ${companyName}
Recipient: ${recipientName}

Original letter:
${content}

Instructions:
- Make it sound more conversational and friendly
- Remove overly formal or robotic language
- Add natural transitions and flow
- Keep it professional but approachable
- Maintain the same message and structure`;

        console.log('🤖 Calling Gemini for humanization...');
        const humanizedContent = await callGeminiDirect(humanizePrompt);
        
        console.log('✅ Text humanized successfully');
        res.json({
            success: true,
            content: humanizedContent
        });

    } catch (error) {
        console.error('❌ Text humanization failed:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Make more formal endpoint
app.post('/api/make-formal', async (req, res) => {
    console.log('🎩 Making letter more formal...');
    console.log('📝 Request body:', req.body);

    if (!process.env.GEMINI_API_KEY) {
        return res.json({
            success: false,
            error: 'AI service not configured'
        });
    }

    try {
        const { content, companyName = 'General Material Ckraftmanship', recipientName = 'Valued Client' } = req.body;
        
        if (!content) {
            return res.json({
                success: false,
                error: 'Letter content is required'
            });
        }

        const formalPrompt = `Please rewrite this business letter to make it more formal and professional:

Company: ${companyName}
Recipient: ${recipientName}

Original letter:
${content}

Instructions:
- Use more formal business language
- Add appropriate business terminology
- Maintain professional tone throughout
- Use proper formal structure
- Keep the same meaning but elevate the language`;

        console.log('🤖 Calling Gemini for formalization...');
        const formalContent = await callGeminiDirect(formalPrompt);
        
        console.log('✅ Letter formalized successfully');
        res.json({
            success: true,
            content: formalContent
        });

    } catch (error) {
        console.error('❌ Letter formalization failed:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Make more friendly endpoint
app.post('/api/make-friendly', async (req, res) => {
    console.log('😊 Making letter more friendly...');
    console.log('📝 Request body:', req.body);

    if (!process.env.GEMINI_API_KEY) {
        return res.json({
            success: false,
            error: 'AI service not configured'
        });
    }

    try {
        const { content, companyName = 'General Material Ckraftmanship', recipientName = 'Valued Client' } = req.body;
        
        if (!content) {
            return res.json({
                success: false,
                error: 'Letter content is required'
            });
        }

        const friendlyPrompt = `Please rewrite this business letter to make it more friendly and approachable while remaining professional:

Company: ${companyName}
Recipient: ${recipientName}

Original letter:
${content}

Instructions:
- Use warmer, more friendly language
- Add personal touches where appropriate
- Make it more conversational
- Keep it professional but approachable
- Maintain the same message with a friendlier tone`;

        console.log('🤖 Calling Gemini for friendliness...');
        const friendlyContent = await callGeminiDirect(friendlyPrompt);
        
        console.log('✅ Letter made more friendly successfully');
        res.json({
            success: true,
            content: friendlyContent
        });

    } catch (error) {
        console.error('❌ Letter friendliness failed:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log('✅ Simple AI Server running on port 5000');
    console.log('📝 Access the generator at: http://localhost:5000/generator');
    console.log('🐛 Debug page at: http://localhost:5000/debug');
    if (process.env.GEMINI_API_KEY) {
        console.log('🤖 Gemini API key found');
    } else {
        console.log('⚠️ No Gemini API key');
    }
});