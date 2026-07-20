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

### UXML IconElement

`IconElement` has a Unity 2022.3-compatible UXML factory and supports the `icon-name` attribute:

```xml
<ui:UXML xmlns:ui="UnityEngine.UIElements"
         xmlns:sigil="NightLum.Sigil.UIToolkit">
    <ui:VisualElement class="toolbar">
        <sigil:IconElement name="home-icon"
                           icon-name="home"
                           class="toolbar-icon" />
    </ui:VisualElement>
</ui:UXML>
```

UXML only declares the element and icon name. It does not create registries, register sources, download icons, or import inline SVG. Keep those operations in C#.

### Registry context for a UI tree

UXML-created elements normally obtain their registry from the containing UI tree:

```csharp
var registry = new IconRegistry();
registry.Register(projectSvgIcons);
registry.Register(MaterialSymbolsIconSource.LoadDefault());

document.rootVisualElement.SetIconRegistry(registry);
```

`SetIconRegistry` affects the selected root and its descendants, not the complete application. An `IconElement` walks its ancestors and uses the nearest context. This allows independent documents and nested subtrees:

```csharp
documentA.rootVisualElement.SetIconRegistry(documentAIcons);
documentB.rootVisualElement.SetIconRegistry(documentBIcons);

// A nested subtree may override only its descendants.
dialogRoot.SetIconRegistry(dialogIcons);
```

The existing `IconElement.Registry` property has higher priority than the tree context. Set it to `null` to let the element use its nearest context again.

Context helpers:

```csharp
root.SetIconRegistry(registry);

if (child.TryGetIconRegistry(out var inheritedRegistry))
{
    // inheritedRegistry is the nearest context registry.
}

root.ClearIconRegistry();
```

Existing descendants refresh immediately when a context is assigned, replaced, or cleared. Elements added to a live UI tree resolve on `AttachToPanelEvent`. An element moved between live panels resolves against its new ancestor context.

### Icon-name priority

An icon name may come from three public inputs. The deterministic priority is:

1. `IconName` assigned through C# or a C# constructor;
2. UXML `icon-name`;
3. USS `--sigil-name`.

Higher-priority input does not delete lower-priority values. This makes temporary C# changes reversible:

```csharp
icon.IconName = "settings"; // Overrides UXML and USS.
icon.IconName = null;       // Restores icon-name, or --sigil-name if UXML has none.
```

An explicit empty or whitespace C# value is treated as an invalid/missing name, not as a request to fall back. Use `null` to remove the C# override.

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
