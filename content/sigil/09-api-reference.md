## Public API summary

### Core

- `IIconSource`
- `IconRegistry`
- `IconRequest`
- `IconResult`
- `IconContentType`
- `IconVectorData`, `IconVectorPath`, `IconPathCommand`, and paint types

### Material Symbols

- `MaterialSymbolsIconSource.LoadDefault()`
- `MaterialSymbolsIconSource(Font, string)`
- `MaterialSymbolsIconSource.IconCount`

### SVG

- `SvgIconSource.Register`
- `SvgIconSource.Unregister`
- `SvgIconSource.IconCount`
- `SvgIconException`

### UI Toolkit

- `IconElement`
- `IconElement.Registry`
- `IconElement.IconName`
- `IconElement.UxmlFactory`
- `IconElement.UxmlTraits`
- `IconRegistryContext.SetIconRegistry`
- `IconRegistryContext.TryGetIconRegistry`
- `IconRegistryContext.ClearIconRegistry`
- `IconElementHelpers`
- `VisualElementIconExtensions`

### Fonts

- `IFontSource`
- `FontRegistry`
- `FontFamily`
- `FontVariant`
- `FontRequest`
- `FontResult`
- `FontWeight`
- `FontStyle`
- `TextElementFontExtensions`

## Scope

Sigil is focused on named icons for Unity UI Toolkit. It is not a complete SVG engine, icon search service, asset-management framework, UI framework, or design system.
