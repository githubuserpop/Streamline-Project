# Streamline-Project

A personalized news aggregator that allows users to view news about relevant topics and create a customized news section that filters and displays only the topics they're interested in.

---

## Tech Stack
- **Frontend:** React 18.2.0
- **Routing:** react-router-dom v6.x
- **Styling:** CSS Modules / standard CSS
- **Icons:** FontAwesome (via CDN in `index.html`)
- **Build Tool:** Create React App

## Features
- Personalized news feed based on user-selected topics
- Topic filtering and management
- Responsive UI for desktop and mobile
- Dynamic routing for news sections
- Clean, modern design with FontAwesome icons
- Fast client-side navigation

## Design
- Modern, user-friendly interface
- Responsive layout for all devices
- FontAwesome icons integrated via CDN for visual enhancement
- Modular component structure for easy maintenance

## Project Setup

### Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Streamline-Project.git
   cd Streamline-Project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the development server:
```bash
npm start
```
The application will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production
Create an optimized production build:
```bash
npm run build
```

## Known Issues and Troubleshooting
- **Blank Screen Issue**: If you encounter a blank screen when running the development server, ensure you're using the correct React version (18.2.0) and react-router-dom version (v6.x). Check your package.json and update dependencies if needed.
- **FontAwesome Icons Not Loading**: Ensure you have an internet connection as FontAwesome is loaded via CDN in the index.html file.

## Configuration
- The app currently uses hardcoded or mock data for news sources. To connect to real news APIs, update the API endpoints in the relevant service files.
- Environment variables can be configured in a `.env` file (see `.env.example` if it exists).

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---
Last updated: April 25, 2025
