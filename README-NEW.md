# AI-Powered Letterhead Generator

A premium HTML template generator that leverages AI technology to create professional business letterheads with intelligent content generation and 3D visual effects.

## 🌟 Features

- **Premium Letterhead Templates**: Five professionally designed templates (Classic, Bold, Contemporary, Elegant, Minimalist)
- **AI-Powered Letter Generation**: Integrated with Google Gemini AI for intelligent content creation
- **3D Visual Effects**: Advanced CSS animations and interactive elements
- **Digital Signatures**: Draw or upload signature functionality
- **Contact Management**: Save and manage recipient information with auto-complete
- **Progressive Web App**: Offline-capable with mobile optimization
- **Print Optimization**: High-quality print layouts for professional documents
- **Completely Free**: No subscription fees or usage limits

## 🚀 Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Set up your Gemini API key in environment variables
4. Start the server: `node server-simple.js`
5. Open your browser to `http://localhost:5000/generator`

## 📋 Templates

### 1. Classic Corporate (`letterhead-classic.html`)
Traditional floating header design with professional styling perfect for established businesses.

### 2. Bold Construction (`letterhead-bold.html`)
Industrial-themed template with geometric patterns designed for construction companies.

### 3. Contemporary Asymmetric (`letterhead-contemporary.html`)
Modern flowing design with dynamic layouts and contemporary typography.

### 4. Elegant Professional (`letterhead-elegant.html`)
Sophisticated ornamental style with premium finishing touches for luxury brands.

### 5. Minimalist Modern (`letterhead-minimalist.html`)
Clean side-panel layout with focus on content clarity for tech companies.

## 🤖 AI Integration

The system uses Google's Gemini AI to generate professional business correspondence. Features include:

- **Intelligent Content Generation**: Describe your letter needs in plain English
- **Professional Formatting**: Automatically formats content for business communication
- **Context-Aware Writing**: Considers company information and recipient details
- **Multiple Letter Types**: Thank you letters, inquiries, proposals, and more

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini API (Direct REST calls)
- **Database**: PostgreSQL (optional for contact management)
- **Progressive Web App**: Service Worker implementation for offline use

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ai-letterhead-generator.git
cd ai-letterhead-generator

# Install dependencies
npm install

# Set environment variables
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Start development server
node server-simple.js
```

## 🔧 Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
DATABASE_URL=your_database_url_here (optional)
```

## 📖 Usage

1. **Access Generator**: Navigate to `/generator` for the main interface
2. **Select Template**: Choose from five professional letterhead designs
3. **Enter Company Details**: Add your business information
4. **AI Letter Generation**: Describe the letter you need in the prompt box
5. **Review and Edit**: Customize the generated content
6. **Add Signature**: Draw or upload your signature
7. **Print or Export**: Generate high-quality output for printing

## 🌐 API Endpoints

- `POST /api/test-ai` - Test AI connectivity
- `POST /api/generate-letter` - Generate letter content
- `GET /debug` - Debug page for troubleshooting

## 📱 Progressive Web App

The generator works offline and can be installed on mobile devices:

- **Offline Functionality**: Templates work without internet connection
- **Mobile Responsive**: Optimized for all screen sizes
- **App Installation**: Add to home screen capability

## 🎨 Customization

Each template includes:
- **Company branding** with logo upload
- **Color scheme** customization
- **Typography** options
- **Layout variations**
- **Print-specific** styling

## 🔒 Privacy & Security

- **Local Processing**: All templates work offline
- **No Data Collection**: Contact information stored locally
- **API Security**: Gemini API key kept server-side
- **Open Source**: Full code transparency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Create an issue in this repository
- **Documentation**: Check the `/docs` folder for detailed guides
- **Debug**: Use `/debug` page for troubleshooting AI connections

## 👨‍💻 Creator

**Fernando Steyn** - Premium letterhead package designed for complete offline accessibility and marketplace distribution.

### Company Information
- **General Material Ckraftmanship (Pty) Ltd**
- **CIPC Registration**: 2025/273604/07
- **B-BBEE Level**: 1
- **Industry**: Construction and Material Craftsmanship

## 🚀 Deployment

The application is ready for deployment on:
- **Replit** (configured)
- **Vercel** (static hosting)
- **Heroku** (full-stack)
- **Netlify** (static hosting)

## 🔄 Recent Updates

- **July 2025**: Fixed Gemini AI integration with direct API calls
- **July 2025**: Added comprehensive error handling and logging
- **July 2025**: Implemented contact management and auto-save
- **July 2025**: Enhanced mobile responsiveness and PWA features

---

*Built with passion for professional business communications* 🏗️✨