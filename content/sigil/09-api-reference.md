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
- `IconElementHelpers`
- `VisualElementIconExtensions`

## Scope

Sigil is focused on named icons for Unity UI Toolkit. It is not a complete SVG engine, icon search service, asset-management framework, UI framework, or design system.
