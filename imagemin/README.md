# 🖼️ Bildoptimierungs-Galerie mit Webpack

Ein Demonstrationsprojekt zur Bildoptimierung mit **Image Minimizer Webpack Plugin**. Dieses Projekt zeigt, wie man Bilder verschiedener Formate (JPEG, PNG, GIF, SVG) automatisch komprimiert und eine moderne, responsive Galerie erstellt.

## 📋 Funktionen

- ✨ Automatische Bildkomprimierung beim Build-Prozess
- 🎨 Moderne, responsive Galerie mit CSS Grid
- 🖱️ Klickbare Bilder mit Vollbild-Ansicht
- 📱 Vollständig responsive für alle Bildschirmgrößen
- ⚡ Lazy Loading für optimale Performance
- 🎭 Sanfte Animationen und Hover-Effekte
- 📊 Bundle-Analyse mit Webpack Bundle Analyzer

## 🛠️ Technologien

- **Webpack 5** - Module Bundler
- **Image Minimizer Webpack Plugin** - Bildoptimierung
- **Imagemin** - Bildkomprimierungs-Engine
  - `imagemin-gifsicle` - GIF-Optimierung
  - `imagemin-mozjpeg` - JPEG-Optimierung
  - `imagemin-pngquant` - PNG-Optimierung
  - `imagemin-svgo` - SVG-Optimierung
- **Webpack Dev Server** - Entwicklungsserver
- **HTML Webpack Plugin** - HTML-Generierung

## 📦 Installation

```bash
npm install
```

## 🚀 Verwendung

### Entwicklungsmodus starten

```bash
npm start
```

Öffnet automatisch den Browser auf `http://localhost:3000`

### Produktions-Build erstellen

```bash
npm run build
```

Die optimierten Dateien werden im `dist/` Ordner erstellt.

## 📂 Projektstruktur

```
imagemin/
├── src/
│   ├── images/           # Original-Bilder
│   │   ├── 1024x1024.jpeg
│   │   ├── dansing_cat.gif
│   │   ├── fox.svg
│   │   ├── present.jpg
│   │   └── question.png
│   ├── index.html        # HTML-Template
│   ├── index.js          # JavaScript-Logik
│   └── style.css         # Styling
├── dist/                 # Build-Ausgabe (generiert)
├── webpack.config.js     # Webpack-Konfiguration
└── package.json
```

## ⚙️ Bildoptimierungs-Einstellungen

Die Bildkomprimierung ist in `webpack.config.js` konfiguriert:

- **GIF**: Interlaced, 64 Farben, Optimierungslevel 3
- **JPEG**: Qualität 75%
- **PNG**: Qualität 60-80%
- **SVG**: Preset-Default-Optimierungen

Diese Einstellungen bieten eine ausgewogene Balance zwischen Dateigröße und Bildqualität.

## 🎨 Features der Galerie

- **Responsive Grid-Layout**: Passt sich automatisch an die Bildschirmgröße an
- **Hover-Effekte**: Bilder vergrößern sich leicht beim Überfahren
- **Fullscreen-Modal**: Klick auf ein Bild öffnet Vollbildansicht
- **Animationen**: Sanfte Fade-in-Effekte beim Laden
- **Modernes Design**: Gradient-Hintergrund und Schatten-Effekte

## 📊 Bundle-Analyse

Nach dem Build wird automatisch der Webpack Bundle Analyzer gestartet, der die Bundle-Größe visualisiert und Optimierungspotentiale aufzeigt.

## 👨‍💻 Autor

Aleks

## 📄 Lizenz

ISC
