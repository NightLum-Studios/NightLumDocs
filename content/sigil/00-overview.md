# Sigil Documentation

Sigil provides named icons and local font families for Unity UI Toolkit. Icon lookup remains separate from rendering:

1. An icon source provides icon data by name.
2. `IconRegistry` stores sources and resolves requests in registration order.
3. `IconElement` renders the resolved icon through UI Toolkit.

Sigil 1.0.0 includes:

- the bundled Material Symbols Outlined font;
- inline SVG icons registered from C# strings;
- runtime and Editor UI Toolkit support;
- C# and USS icon names;
- native UI Toolkit size, color, and opacity styling;
- explicit behavior for missing and duplicate names.

The font subsystem is independent from the icon subsystem. It provides local font-family assets, weight/style resolution, C# helpers for `TextElement`, generated USS classes, and an Editor-only Google Fonts importer.
