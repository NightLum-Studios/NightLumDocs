## Missing-icon fallback

When an icon cannot be resolved, `IconElement`:

- displays `?`;
- adds the `sigil-icon--missing` class;
- sets a tooltip containing the unknown name.

If no name was provided, the tooltip explains that the element has no Sigil icon name.

The fallback updates automatically when a valid `Registry` or `IconName` is assigned later.

```css
.sigil-icon--missing {
    color: rgb(255, 90, 90);
}
```

`IconRegistry.TryGetIcon` itself does not throw for an unknown valid name. It returns `false` and assigns the default `IconResult`.

## Optional default-registry helper

Sigil also exposes an optional convenience helper:

```csharp
IconElementHelpers.DefaultRegistry = registry;
var icon = IconElementHelpers.Icon("home");
```

`IconElementHelpers.Icon` throws `InvalidOperationException` until `DefaultRegistry` is assigned. The property is global mutable state, so explicit registry injection is preferable for reusable views, tests, and projects with multiple icon configurations.

## VisualElement extension methods

`VisualElementIconExtensions` provides lower-level helpers:

```csharp
bool found = textElement.TrySetIcon(registry, "home");
```

`TrySetIcon` returns `false` when the name is not found. Texture results can be assigned to any `VisualElement`. Font glyph results require a `TextElement`. Vector results should be displayed with `IconElement`; passing unsupported content to `SetIcon` throws `ArgumentException`.

For normal application UI, prefer `IconElement` because it handles all supported icon content types and missing-icon fallback.
