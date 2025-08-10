# AgroChain LATAM

A blockchain-powered cooperative equipment financing platform for Latin American farmers built with React, TypeScript, and Stellar/Soroban.

## Overview

AgroChain LATAM enables farmers and cooperatives to tokenize, co-own, and finance agricultural equipment through blockchain technology. The platform addresses the equipment financing gap in Latin American agriculture by creating cooperative ownership models.

## Features

- **Equipment Marketplace** - Browse and invest in tokenized agricultural equipment
- **Tokenization Platform** - Submit equipment for fractional ownership
- **Cooperative Dashboard** - Manage investments and track performance  
- **IoT Simulation** - Monitor equipment usage and health
- **Governance System** - Vote on equipment decisions and proposals
- **Multi-language Support** - Spanish, Portuguese, and English

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with animations
- **Routing**: React Router DOM
- **State Management**: React Query + Context API
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Blockchain**: Stellar Network, Soroban Smart Contracts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/crushrrr007/AgroChain-LATAM.git
cd agrochain-latam

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components
├── pages/              # Application pages
├── state/              # Context providers and state management
├── lib/                # Utility functions
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## Key Pages

- `/` - Homepage with hero section and features
- `/marketplace` - Browse tokenized equipment
- `/tokenize` - Submit equipment for tokenization
- `/dashboard` - User dashboard and analytics
- `/iot` - IoT equipment monitoring simulation
- `/voting` - Governance and voting interface

## Development

The project uses:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **ESLint** for code linting
- **Tailwind CSS** for styling
- **Path aliases** (`@/` maps to `src/`)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.