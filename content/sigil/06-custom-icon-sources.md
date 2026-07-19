## Custom icon sources

Implement `IIconSource` to connect another icon provider to the registry:

```csharp
public sealed class ProjectIconSource : IIconSource
{
    public bool TryGetIcon(IconRequest request, out IconResult result)
    {
        // Resolve request.Name and construct an IconResult when found.
        result = default;
        return false;
    }
}
```

`IconResult` supports three public content forms:

- `Texture2D`;
- `Font` plus Unicode codepoint;
- `IconVectorData`.

Core icon data does not depend on UI Toolkit. A custom source should cache expensive parsing or conversion work rather than rebuilding results for every lookup.
