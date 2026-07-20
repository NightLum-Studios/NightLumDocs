## Font families

Font lookup is intentionally separate from `IconRegistry`. A font registry contains one or more sources, normally generated `FontFamily` assets. It is an ordinary C# object; Sigil does not create a global font registry.

### Import from Google Fonts

Open `Tools > Sigil > Google Fonts Importer`.

1. Enter your own Google Fonts Developer API key. Sigil does not include or persist a key.
2. Enter the exact family name, such as `Inter`, `Roboto`, or `JetBrains Mono`.
3. Select the weights and normal/italic styles required by the project.
4. Choose an output folder inside `Assets` and run the import.

The importer uses HTTPS and saves only:

- the selected static TTF variants;
- the family's `METADATA.pb`;
- its license file;
- a `FontFamily` asset;
- a generated USS file.

Unity imports the TTF files as normal `Font` assets. The importer does not clone the Google Fonts repository and there is no Player/runtime network access. The API key exists only in the Editor window field and request; it is not written to project files.

If Google Fonts does not provide a selected static TTF variant, the import stops with a clear error instead of silently substituting a variable or incorrect font.

### Register and use from C#

Assign generated `FontFamily` assets to the view or composition root, then register them:

```csharp
using NightLum.Sigil.Fonts;
using NightLum.Sigil.UIToolkit;

var fonts = new FontRegistry();
fonts.Register(interFamily);
fonts.Register(robotoFamily);
fonts.Register(jetBrainsMonoFamily);

title.SetFont(fonts, "Inter", FontWeight.Bold);
body.SetFont(fonts, "Roboto", FontWeight.Regular);
code.SetFont(fonts, "JetBrains Mono", FontWeight.Regular);
```

`SetFont` returns `true` when a font was resolved and applied, or `false` when no source can satisfy the request. It throws for a `null` element or registry and for invalid request values.

Normal and italic variants are separate. Request an italic variant explicitly:

```csharp
caption.SetFont(fonts, "Inter", FontWeight.Medium, FontStyle.Italic);
```

If `UnityEngine.FontStyle` is also imported in the same file, qualify the Sigil enum as `NightLum.Sigil.Fonts.FontStyle.Italic`.

### Weight fallback

Nearest-weight fallback is enabled by default and searches only variants with the requested style:

```csharp
// Resolves the closest available normal variant.
body.SetFont(fonts, "Inter", FontWeight.Medium);

// Requires an exact Medium Normal variant.
bool applied = body.SetFont(
    fonts,
    "Inter",
    FontWeight.Medium,
    FontStyle.Normal,
    useNearestWeightFallback: false);
```

Distance is calculated from the numeric weights 100 through 900. Equal-distance ties choose the lighter variant. Normal never falls back to italic, and italic never falls back to normal.

### UXML and USS

The generated USS contains one native UI Toolkit class per imported variant. Class names use this format:

```text
sigil-font-{family-slug}-{numeric-weight}-{normal|italic}
```

For example:

```css
.sigil-font-inter-700-normal {
    -unity-font-definition: url("inter-700-Normal.ttf");
}
```

Attach the generated stylesheet to the UXML document and apply the class normally:

```xml
<ui:UXML xmlns:ui="UnityEngine.UIElements">
    <ui:Label text="Title" class="sigil-font-inter-700-normal" />
    <ui:Label text="Body" class="sigil-font-inter-400-normal" />
</ui:UXML>
```

This UXML/USS path uses standard `-unity-font-definition`; it does not require a global registry or a custom text element. C# lookup and USS classes reference the same imported local font assets.

### Font runtime model

- `FontWeight`: `Thin` (100) through `Black` (900).
- `FontStyle`: `Normal` or `Italic`.
- `FontVariant`: one imported Unity `Font` plus its weight and style.
- `FontFamily`: a serializable family asset and `IFontSource` implementation.
- `FontRequest`: family, weight, style, and nearest-weight policy.
- `FontResult`: requested and resolved values plus the Unity font asset.
- `FontRegistry`: ordered, non-global collection of `IFontSource` instances.

Sources are queried in registration order. The first source that resolves a request wins. Registering the same source instance twice returns `false`.

### Player builds

Imported TTF files are ordinary project assets. Unity includes a font when a scene, prefab, UXML/USS asset, `FontFamily`, or another included asset references it. Sigil performs no runtime download and the font runtime assembly does not reference `UnityEditor` or `AssetDatabase`.

Only import the weights and styles the project uses: each TTF is a separate asset and contributes to project/build size when referenced.
