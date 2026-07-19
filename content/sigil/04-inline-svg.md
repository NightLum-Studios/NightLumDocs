## Inline SVG icons

`SvgIconSource` registers SVG text under a name and is compatible with `IconRegistry`.

```csharp
var svgSource = new SvgIconSource();

bool registered = svgSource.Register(
    "diamond",
    "<svg viewBox='0 0 24 24'>" +
    "<path d='M12 1L23 12L12 23L1 12Z' fill='currentColor'/>" +
    "</svg>");

registry.Register(svgSource);

var diamond = new IconElement(registry, "diamond");
root.Add(diamond);
```

SVG is parsed when `Register` is called. The parsed `IconVectorData` and path commands are cached in the source and reused by subsequent lookups.

```csharp
int count = svgSource.IconCount;
bool removed = svgSource.Unregister("diamond");
```

`Register` validates the icon name before parsing. A duplicate name returns `false` without replacing or reparsing the existing SVG.

### Multiple paths, fill, and stroke

```csharp
svgSource.Register(
    "outlined_diamond",
    "<svg viewBox='0 0 24 24'>" +
    "<path d='M12 1L23 12L12 23L1 12Z' fill='currentColor'/>" +
    "<path d='M12 6L18 12L12 18L6 12Z' " +
    "fill='none' stroke='#ffffff' stroke-width='1.5'/>" +
    "</svg>");
```

Paint values can be declared on the root `<svg>` element and inherited by paths, or declared on individual paths.

If `fill` is omitted, SVG paths use black. If `stroke` is omitted, there is no stroke. The default stroke width is `1` when a stroke is present.

Use `fill='currentColor'` or `stroke='currentColor'` when the icon should follow the USS `color` property.

## Supported SVG subset

Sigil intentionally implements a small subset for interface icons, not a general SVG renderer.

### Required structure

- One `<svg>` root element.
- A `viewBox` containing four numbers: minimum X, minimum Y, width, and height.
- Positive `viewBox` width and height.
- One or more direct `<path>` children.

Whitespace and XML comments are allowed. DTD processing is prohibited.

### Path commands

The following commands are supported in absolute and relative forms:

- `M` / `m` - move to;
- `L` / `l` - line to;
- `H` / `h` - horizontal line;
- `V` / `v` - vertical line;
- `C` / `c` - cubic Bezier curve;
- `Q` / `q` - quadratic Bezier curve;
- `Z` / `z` - close path.

Repeated coordinate groups after a command are supported where applicable.

### Paint values

Supported `fill` and `stroke` values:

- `none`;
- `currentColor`;
- hexadecimal colors accepted by Unity `ColorUtility`;
- `black`;
- `white`;
- `transparent`.

`stroke-width` accepts a non-negative invariant-culture number.

### Unsupported SVG features

The following are not implemented:

- child elements such as `g`, `defs`, `circle`, `rect`, `line`, `polygon`, and `image`;
- arcs (`A` / `a`);
- smooth cubic and quadratic commands (`S`, `s`, `T`, `t`);
- transforms;
- gradients and paint servers such as `url(...)`;
- filters and masks;
- animation;
- embedded images and external resources;
- SVG stylesheets and the complete SVG standard.

Unsupported child elements and paint values throw `SvgIconException`. Unsupported attributes are not interpreted, so do not rely on them being applied.

### SVG errors

Malformed XML, a missing or invalid `viewBox`, empty path data, unsupported elements, unsupported path commands, invalid numbers, and unsupported paint values produce `SvgIconException` during registration.

```csharp
try
{
    svgSource.Register("custom", svgText);
}
catch (SvgIconException exception)
{
    Debug.LogError($"Could not register SVG icon: {exception.Message}");
}
```
