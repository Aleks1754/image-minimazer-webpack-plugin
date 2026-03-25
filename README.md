# Image Optimisation - Vergleichsprojekt

Ein Lernprojekt zum Vergleich verschiedener Bildoptimierungs-Ansätze mit Webpack und Vite. Dieses Projekt demonstriert, wie dieselbe Aufgabe (Bildoptimierung während des Build-Prozesses) mit unterschiedlichen Tools und Bibliotheken gelöst werden kann.

## 📋 Überblick

Das Projekt vergleicht vier verschiedene Bildoptimierungs-Setups:

1. **Webpack + ImageMinimizerPlugin (Imagemin)** - Verwendet klassische Imagemin-Bibliotheken
2. **Webpack + ImageMinimizerPlugin (Sharp + SVGO)** - Nutzt die leistungsstarke Sharp-Bibliothek
3. **Vite + vite-image-optimizer** - Vite-Plugin mit Sharp und SVGO
4. **Vite + vite-plugin-imagemin** - Vite-Plugin mit Imagemin-Bibliotheken

## 🚀 Features

- **Automatisierter Benchmark**: Pipeline-Skript (`pipeline.js`) führt alle Builds automatisch aus
- **Detaillierte Metriken**: Vergleich von Build-Zeit, Bundle-Größe und optimierter Bildgröße
- **Identische Testbilder**: Alle Setups verwenden dieselben Quellbilder für faire Vergleiche
- **Verschiedene Bildformate**: Unterstützung für PNG, JPEG, GIF, SVG und WebP
- **Hochqualitative Kompression**: Konfigurationen optimiert für maximale Qualität bei minimaler Dateigröße

## 📁 Projektstruktur

```
image-optimisation/
├── Webpack/
│   ├── imagemin/          # Webpack mit Imagemin-Plugins
│   │   ├── src/
│   │   ├── webpack.config.js
│   │   └── package.json
│   └── sharp/             # Webpack mit Sharp + SVGO
│       ├── src/
│       ├── webpack.config.js
│       └── package.json
├── vite/
│   ├── vite-image-optimizer/    # Vite mit vite-image-optimizer
│   │   ├── src/
│   │   ├── vite.config.js
│   │   └── package.json
│   └── vite-plugin-imagemin/    # Vite mit vite-plugin-imagemin
│       ├── src/
│       ├── vite.config.js
│       └── package.json
├── pipeline.js            # Benchmark-Skript
└── package.json
```

## 🛠️ Installation

```bash
# Hauptprojekt-Abhängigkeiten installieren
npm install

# Abhängigkeiten für alle Subprojekte installieren
cd Webpack/imagemin && npm install && cd ../..
cd Webpack/sharp && npm install && cd ../..
cd vite/vite-image-optimizer && npm install && cd ../..
cd vite/vite-plugin-imagemin && npm install && cd ../..
```

## 🎯 Verwendung

### Alle Setups benchmarken

```bash
npm test
```

Dieser Befehl führt `pipeline.js` aus, welches:
- Alle vier Setups nacheinander baut
- Build-Zeiten misst
- Bundle-Größen vergleicht
- Optimierte Bildgrößen analysiert
- Eine detaillierte Zusammenfassung ausgibt

### Einzelne Setups ausführen

**Webpack mit Imagemin:**
```bash
cd Webpack/imagemin
npm run build    # Production Build
npm start        # Development Server
```

**Webpack mit Sharp:**
```bash
cd Webpack/sharp
npm run build    # Production Build
npm start        # Development Server
```

**Vite mit vite-image-optimizer:**
```bash
cd vite/vite-image-optimizer
npm run build    # Production Build
npm run dev      # Development Server
```

**Vite mit vite-plugin-imagemin:**
```bash
cd vite/vite-plugin-imagemin
npm run build    # Production Build
npm run dev      # Development Server
```

## ⚙️ Konfigurationsdetails

### Webpack + Imagemin

Verwendet folgende Imagemin-Plugins:
- **gifsicle**: GIF-Optimierung mit Optimierungslevel 3
- **mozjpeg**: JPEG-Kompression mit Qualität 100
- **pngquant**: PNG-Quantisierung mit maximaler Qualität
- **svgo**: SVG-Optimierung mit Multipass

### Webpack + Sharp

Nutzt Sharp für Raster-Bilder und SVGO für Vektorgrafiken:
- **JPEG**: Lossless, progressiv, mozjpeg-aktiviert
- **PNG**: Lossless, Kompression Level 9, adaptives Filtern
- **GIF**: 256 Farben, maximaler Effort
- **WebP**: Lossless, Qualität 100
- **SVG**: SVGO mit Preset-Default

### Vite + vite-image-optimizer

Sharp-basierter Optimizer mit:
- Qualität 100 für PNG, JPEG, TIFF
- Lossless WebP und AVIF
- SVGO für SVG-Dateien
- Detaillierte Build-Statistiken

### Vite + vite-plugin-imagemin

Imagemin-Integration für Vite:
- gifsicle, pngquant, mozjpeg
- WebP und AVIF Unterstützung
- SVGO für SVG-Optimierung

## 📊 Benchmark-Ergebnisse

Nach dem Ausführen von `npm test` erhalten Sie eine Ausgabe wie:

```
=== SUMMARY ===
Total time: X.XXs
Original images size: XXXX Bytes ≈ X.XX MB

=== ImageMinimizerWebpackPlugin(Imagemin) ===
Time: X.XXs
Bundle size: XXXX Bytes ≈ X.XX MB
Optimised images size: XXXX Bytes ≈ X.XX MB

[... weitere Ergebnisse ...]
```

## 🔍 Vergleichskriterien

Das Projekt vergleicht:
- **Build-Performance**: Zeit bis zur Fertigstellung des Builds
- **Bundle-Größe**: Gesamtgröße des dist-Ordners
- **Bildoptimierung**: Größe der optimierten Bilder vs. Original
- **Konfigurationskomplexität**: Einfachheit der Setup-Konfiguration
- **Flexibilität**: Anpassungsmöglichkeiten der Optimierungsparameter

## 📝 Technologie-Stack

- **Build-Tools**: Webpack 5, Vite
- **Bildoptimierung**: Sharp, Imagemin, SVGO
- **Bundler-Plugins**:
  - image-minimizer-webpack-plugin
  - vite-plugin-image-optimizer
  - vite-plugin-imagemin
- **Node.js**: ESM-Module

## 🎓 Lernziele

Dieses Projekt eignet sich für:
- Verständnis verschiedener Bildoptimierungs-Ansätze
- Vergleich von Webpack- und Vite-Ökosystemen
- Performance-Benchmarking von Build-Tools
- Auswahl des richtigen Tools für spezifische Anforderungen

## 📄 Lizenz

ISC

## 👤 Autor

Aleks
