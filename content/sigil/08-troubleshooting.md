## Troubleshooting

### The element shows `?`

- Verify that the registry was assigned.
- Verify that the intended source was registered.
- Check spelling and case of `IconName`.
- For Material Symbols, use the official snake-case icon name.
- Inspect the tooltip for the unresolved name.

### A Material Symbol is blank or incorrectly sized

- Set `width`, `height`, and `font-size`.
- Confirm that another USS rule is not overriding `unity-font-definition` or text styles.
- Check the Console for the mandatory-resource error from `LoadDefault()`.

### An SVG ignores USS color

Use `fill='currentColor'` or `stroke='currentColor'`. Fixed hexadecimal paint values do not follow USS `color`.

### An SVG is clipped or unexpectedly small

- Verify its `viewBox` coordinates and size.
- Set the `IconElement` width and height.
- Remember that Sigil preserves the `viewBox` aspect ratio.

### The wrong icon wins

Two sources contain the same name. Check their registration order; the first registered source has priority.

### SVG registration throws

Read the `SvgIconException` message. The input may use an unsupported element, command, transform, paint value, or malformed number.
