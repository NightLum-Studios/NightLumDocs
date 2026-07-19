# Sigil 1.0.0

Sigil is a named-icon library for Unity UI Toolkit. It separates icon lookup from rendering:

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
