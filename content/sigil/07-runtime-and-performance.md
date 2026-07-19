## Runtime and Player builds

Material Symbols runtime data is stored under `Resources/Sigil` and loaded through `Resources.Load<Font>` and `Resources.Load<TextAsset>`.

Consequences:

- the font and codepoint table are available in Player builds;
- there is no runtime dependency on `UnityEditor` or `AssetDatabase`;
- there is no network request or download;
- the complete Material Symbols TTF is included rather than a per-icon subset.

The bundled raw font is approximately 10.15 MiB, and the codepoint table is approximately 77 KiB before Unity build packing and platform-specific compression.

If either mandatory resource is missing, `MaterialSymbolsIconSource.LoadDefault()` throws `InvalidOperationException` naming both expected resource paths.

Sigil does not use reflection to instantiate its runtime types. Normal direct use of `MaterialSymbolsIconSource`, `SvgIconSource`, `IconRegistry`, and `IconElement` does not require a `link.xml` or `[Preserve]` attributes.

## Caching behavior

- `MaterialSymbolsIconSource.LoadDefault()` caches and returns one default source instance.
- The Material Symbols codepoint file is parsed into a name-to-result dictionary once.
- `SvgIconSource.Register` parses SVG immediately and stores the resulting `IconVectorData`.
- Repeated registry lookups return cached results.
- UI Toolkit retains generated visual content until the element needs repainting.
