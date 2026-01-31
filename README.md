# PokéSearch

⚠️ If you want to follow along, step by step, here's a tutorial I wrote: [Vibe Coding a Pokémon Search App with Cursor](https://nikola-breznjak.com/blog/vibecoding/vibe-coding-a-pokemon-search-app-with-cursor/).

A comprehensive web-based Pokémon search and discovery application built with Vue.js 3, allowing users to browse, search, and view detailed information about Pokémon using the PokéAPI.

![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

## Features

- **Search by Name or ID**: Quickly find any Pokémon by typing its name or Pokédex number
- **Autocomplete Suggestions**: Get real-time suggestions as you type (after 2+ characters)
- **Paginated Browse**: Browse through all 1000+ Pokémon with easy pagination
- **Detailed Information**: View comprehensive details including:
  - Official artwork and sprite variants (normal, shiny, front, back)
  - Base stats with animated visual bars
  - Type badges with authentic colors
  - Abilities with descriptions
  - Height and weight
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Accessible**: Keyboard navigable with proper ARIA labels and focus management
- **Fast & Cached**: Smart caching reduces API calls for a snappy experience

## Tech Stack

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| **Vue.js 3**     | Frontend framework (Composition API) |
| **Vite**         | Build tool and dev server            |
| **Tailwind CSS** | Utility-first CSS framework          |
| **Pinia**        | State management                     |
| **Vue Router**   | Client-side routing                  |
| **PokéAPI**      | Data source                          |

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/PokemonSearch.git
cd PokemonSearch

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/PokemonSearch/`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
PokemonSearch/
├── .github/workflows/      # GitHub Actions deployment
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/         # Shared components (Loading, Error, Pagination)
│   │   ├── layout/         # Header, Footer
│   │   ├── pokemon/        # Pokemon-specific components
│   │   └── search/         # Search bar and autocomplete
│   ├── composables/        # Vue 3 composition functions
│   ├── router/             # Vue Router configuration
│   ├── services/           # API service layer
│   ├── stores/             # Pinia state management
│   ├── utils/              # Helper functions and constants
│   ├── views/              # Page components
│   ├── App.vue             # Root component
│   ├── main.js             # App entry point
│   └── index.css           # Global styles & Tailwind
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Deployment

This project is configured for automatic deployment to GitHub Pages.

### Automatic Deployment

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Access at `https://yourusername.github.io/PokemonSearch/`

### Manual Deployment

```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## Usage

### Browsing Pokémon

- The home page displays a grid of Pokémon (20 per page)
- Use the pagination controls at the bottom to navigate
- Click any card to view detailed information

### Searching

- Use the search bar in the header
- Type at least 2 characters to see autocomplete suggestions
- Press Enter or click to search
- You can search by name (e.g., "pikachu") or ID (e.g., "25")

### Keyboard Navigation

- `Tab`: Navigate between elements
- `Enter`: Select/activate
- `Escape`: Close dropdowns
- `Arrow Up/Down`: Navigate autocomplete suggestions

## API Reference

This application uses the [PokéAPI](https://pokeapi.co/) - a free, open RESTful API for Pokémon data.

**Endpoints used:**

- `GET /pokemon?limit={n}&offset={o}` - Paginated list
- `GET /pokemon/{name|id}` - Single Pokémon details
- `GET /ability/{name}` - Ability descriptions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

- Pokémon data provided by [PokéAPI](https://pokeapi.co/)
- Pokémon and Pokémon character names are trademarks of Nintendo
