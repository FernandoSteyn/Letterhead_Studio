# General Material Ckraftmanship Premium Letterhead Package

## Overview

Created by Fernando Steyn - This is a premium, completely offline-accessible letterhead template package for General Material Ckraftmanship (Pty) Ltd, a construction company. The package provides multiple professionally designed letterhead templates with 3D effects, animations, and modern web technologies. It features static HTML templates optimized for Gumroad marketplace sales and is completely independent of any external platforms.

## System Architecture

### Frontend Architecture
- **Primary Technology**: Static HTML with advanced CSS3 animations and JavaScript effects
- **Framework**: React 18 with TypeScript (for dynamic application layer)
- **Styling**: 
  - Custom CSS with CSS Grid and Flexbox layouts
  - Tailwind CSS for utility classes
  - Advanced 3D transformations and animations
  - Responsive design principles
- **3D Graphics**: Three.js with React Three Fiber for interactive elements
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL via Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage
- **API Design**: RESTful API architecture

### Template System
- **Static Templates**: Five distinct letterhead designs (Classic, Bold, Contemporary, Elegant, Minimalist)
- **Dynamic Effects**: JavaScript-powered 3D parallax, hover effects, and animations
- **Print Optimization**: CSS media queries for high-quality printing
- **Responsive Design**: Mobile-first approach with desktop enhancements

## Key Components

### Letterhead Template Variants
1. **Classic Corporate** (`letterhead-classic.html`) - Traditional floating header design
2. **Bold Construction** (`letterhead-bold.html`) - Industrial-themed with geometric patterns
3. **Contemporary Asymmetric** (`letterhead-contemporary.html`) - Modern flowing design
4. **Elegant Professional** (`letterhead-elegant.html`) - Sophisticated ornamental style
5. **Minimalist Modern** (`letterhead-minimalist.html`) - Clean side-panel layout

### Company Profile System
- **Company Information**: Complete business details including B-BBEE Level 1 certification
- **Registration Details**: CIPC Registration Number 2025/273604/07
- **Brand Identity**: Consistent logo and color scheme across all templates
- **Contact Information**: Address, phone, email integration

### Interactive Effects Engine
- **3D Parallax System**: Mouse-tracking parallax effects for depth
- **Animation Triggers**: Scroll-based and interaction-based animations
- **Hover Effects**: Interactive elements with smooth transitions
- **Print Optimization**: Automatic effect disabling for print media

### CSS Architecture
- **Shared Styles**: Common variables and base styles in `shared.css`
- **Template-Specific**: Individual CSS files for each letterhead variant
- **3D Effects**: Advanced CSS transforms and animations
- **Color System**: Construction industry-themed color palette

## Data Flow

### Static Template Flow
1. User accesses letterhead template HTML file
2. Shared CSS loads base styles and variables
3. Template-specific CSS applies unique styling
4. JavaScript initializes interactive effects
5. 3D animations and parallax effects activate on user interaction

### Dynamic Application Flow
1. React frontend renders template selection interface
2. User customizes company information and design preferences
3. Frontend sends customization data to Express backend
4. Backend processes template generation using Drizzle ORM
5. Generated letterhead returned to frontend for preview/export

### Database Interactions
- User authentication and session management
- Company profile storage and retrieval
- Template usage analytics and preferences
- Custom design saving and version control

## External Dependencies

### Frontend Dependencies
- **Fonts**: Google Fonts (Inter, Playfair Display, Roboto)
- **Icons**: Emoji-based icons for construction themes
- **Effects**: Custom JavaScript for 3D interactions

### Backend Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Express sessions with connect-pg-simple
- **Validation**: Zod for schema validation
- **HTTP Client**: Custom fetch utilities for API communication

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **Drizzle Kit**: Database migration and schema management
- **PostCSS**: CSS processing with Tailwind integration

## Deployment Strategy

### Static Asset Deployment
- HTML templates served as static files
- CSS and JavaScript assets optimized for CDN delivery
- Print-optimized versions for PDF generation
- Progressive enhancement for accessibility

### Full-Stack Application Deployment
- **Frontend**: Vite build output served from `/dist/public`
- **Backend**: Node.js Express server with TypeScript compilation
- **Database**: Neon PostgreSQL with connection pooling
- **Sessions**: PostgreSQL-backed session storage

### Environment Configuration
- Development: Hot reloading with Vite dev server
- Production: Optimized builds with ESBuild bundling
- Database migrations managed through Drizzle Kit

## Changelog

Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Removed all Replit branding and dependencies, added Fernando Steyn as creator, cleaned up attached files, prepared for Gumroad marketplace distribution
- July 03, 2025. Added AI-Powered Letterhead Generator with Gemini AI integration for letter writing assistance, free email/WhatsApp sharing, real-time editing, and auto-save functionality
- July 03, 2025. Enhanced with digital signature functionality: users can draw signatures with consent or upload signature images for professional business letters
- July 03, 2025. Fixed critical Gemini AI integration issues by creating simplified server with direct API calls, bypassing problematic @google/genai library
- July 03, 2025. Created comprehensive GitHub repository package with professional documentation, deployment guides, and open-source licensing for marketplace distribution
- July 04, 2025. Resolved all AI connection issues - confirmed Gemini API working perfectly with all 6 functions operational (Generate, Improve, Humanize, Make Formal, Make Friendly, Test Connection). Enhanced frontend error handling and user feedback notifications. Template switching and logo upload functionality fully operational.

## User Preferences

Preferred communication style: Simple, everyday language.
Creator: Fernando Steyn - Premium letterhead package must be completely offline accessible and Replit-independent.