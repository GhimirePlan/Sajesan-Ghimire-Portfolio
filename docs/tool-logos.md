# Tool logo assets

The tools grid serves optimized local 96 × 96 WebP assets from `src/assets/tech/tools`. Images load lazily; no external logo service is called by visitors. Logos remain the property of their respective owners.

Sources:

- PVsyst: https://www.pvsyst.com/favicon.ico
- HelioScope: https://helioscope.aurorasolar.com/wp-content/uploads/2022/11/cropped-favicon-192x192.png
- MATLAB, AutoCAD, MS Excel: existing repository logo assets.
- ETAP: https://etap.com/favicon/apple-touch-icon.png
- HOMER: https://homerenergy.com/static/images/favicon/apple-touch-icon.png
- Revit, Python, C++ and Notion: https://github.com/simple-icons/simple-icons/tree/develop/icons (autodeskrevit, python, cplusplus, notion).
- SketchUp: https://sketchup.trimble.com/favicons/android-chrome-192x192.png
- Primavera P6: Oracle Primavera wordmark, https://www.pngkit.com/png/detail/376-3761095_primavera-p6-oracle-primavera-logo-png.png
- DIALux evo: https://www.dialux.com/apple-touch-icon-144-precomposed.png
- Storlytics: https://www.storlytics.net/static/media/storlytics_white.eb8899c28d0b557c5600.png
- Virto Solar: https://virto.solar/wp-content/uploads/2023/12/cropped-Virto-logo-04-300x300.png
- ChatGPT: https://chatgpt.com/cdn/assets/favicon-180x180.9e0103ce69.png
- SCADA is a technology category, not a single product: its generic monitoring icon is custom SVG geometry rasterized to WebP.

Primary tools are defined in `technologies` in `src/constants/index.ts`; previous non-overlapping tools are retained in `additionalTechnologies` and revealed through a native details element. The official solar software brand spelling is Virto Solar.
