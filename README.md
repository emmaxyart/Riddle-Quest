# 🎮 Riddle Quest Game

A dynamic and engaging riddle game built with Next.js, where players can test their wit and compete with friends through various difficulty levels.

## ✨ Features

- 🧩 Multiple difficulty levels (Easy, Medium, Hard)
- 🏆 Achievement system
- 📊 Real-time score tracking
- ⏱️ Time-based challenges
- 💡 Hint system
- 🎵 Sound effects and background music
- 📱 Responsive design
- 🔗 Social sharing capabilities
- 📈 Player statistics and profiles

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/riddle-quest-game.git
cd riddle-quest-game
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RAPIDAPI_KEY=your_rapidapi_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing!

## 🛠️ Built With

- [Next.js 15.2.4](https://nextjs.org/) - React Framework
- [React 19.0.0](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [RapidAPI](https://rapidapi.com/) - Riddle Data Provider

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── game/              # Game routes
│   └── layout.tsx         # Root layout
├── components/            # React components
├── context/              # State management
├── types/                # TypeScript definitions
└── utils/                # Utility functions
```

## 🎮 Game Mechanics

- **Scoring System**: Points are awarded based on:
  - Speed of answer
  - Difficulty level
  - Hint usage (penalties applied)
  - Correct answer streaks

- **Achievements**: Unlock special achievements for:
  - Perfect scores
  - Speed records
  - No hints used
  - Winning streaks

## 🔄 API Integration

The game uses both internal and external APIs:
- RapidAPI for riddle data
- Custom API routes for game management
- Fallback mock data system

## 📱 Social Features

Share your achievements on:
- Twitter/X
- Facebook
- WhatsApp
- Copy to clipboard

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
```

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

## 🚀 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/riddle-quest-game)

## 📝 Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SITE_URL=your_site_url
RAPIDAPI_KEY=your_rapidapi_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👏 Acknowledgments

- RapidAPI for providing the riddle data
- Next.js team for the amazing framework
- All contributors and players

## 📞 Support

For support, email emmanueledobor34@gmail.com

---

Made with ❤️ by [Emmanuel Edobor]
