## IconElement

`IconElement` is a UI Toolkit `TextElement`. It supports textures, Material Symbols font glyphs, and Sigil vector data.

The recommended constructor supplies both the registry and name:

```csharp
var icon = new IconElement(registry, "home");
```

You can assign either value later:

```csharp
var icon = new IconElement();
icon.Registry = registry;
icon.IconName = "favorite";
```

The name-only constructor still requires a registry before it can resolve anything:

```csharp
var icon = new IconElement("settings");
icon.Registry = registry;
```

Changing `Registry` or `IconName` refreshes the element immediately.

```csharp
icon.IconName = "refresh";
```

The same element can switch between a Material Symbol and an inline SVG as long as both names are available in its registry.

### Built-in USS names

Every `IconElement` receives:

- `sigil-icon` through `IconElement.UssClassName`;
- `sigil-icon--missing` through `IconElement.MissingUssClassName` while fallback is displayed.

The custom icon-name property is available as `IconElement.NameUssProperty` and has the value `--sigil-name`.

## USS styling

Sigil uses standard UI Toolkit properties for presentation. It introduces only one custom property: `--sigil-name`.

```csharp
var icon = new IconElement(registry);
icon.AddToClassList("primary-action-icon");
root.Add(icon);
```

```css
.primary-action-icon {
    --sigil-name: add_circle;
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: rgb(95, 190, 255);
    opacity: 0.9;
}
```

Property behavior:

- `width` and `height` define the available drawing area;
- `font-size` controls the Material Symbols glyph size;
- `color` controls Material Symbols and SVG `currentColor` paint;
- `opacity` applies to the complete element, including fixed SVG colors;
- normal UI Toolkit transforms and layout rules apply to the element itself.

For predictable Material Symbols sizing, set `width`, `height`, and `font-size` to matching values.

SVG geometry is scaled uniformly into the content rectangle and preserves the `viewBox` aspect ratio. `font-size` does not size SVG geometry; use `width` and `height`.

### Styling from C#

Standard inline styles work as expected:

```csharp
icon.style.width = 40f;
icon.style.height = 40f;
icon.style.fontSize = 40f;
icon.style.color = Color.cyan;
icon.style.opacity = 0.75f;
```
