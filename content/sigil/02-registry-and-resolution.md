## Registry lifetime

`IconRegistry` is an ordinary C# object. Sigil does not create a global registry automatically.

For a small view, create a registry when the view is constructed. For a larger application, keep a shared registry in the UI composition root or another service with an appropriate lifetime.

```csharp
var registry = new IconRegistry();

bool added = registry.Register(MaterialSymbolsIconSource.LoadDefault());
int sourceCount = registry.SourceCount;

bool removed = registry.Unregister(source);
```

`Register` throws `ArgumentNullException` for `null`. A source already contained by the registry according to `List.Contains`/`Equals` returns `false` and is not added again. For sources that do not override `Equals`, this means the same instance.

### Resolve without creating UI

Core code can request icon data directly:

```csharp
if (registry.TryGetIcon("home", out IconResult result))
{
    Debug.Log($"Resolved {result.Name} as {result.ContentType}");
}
```

The equivalent request-object overload is also available:

```csharp
var request = new IconRequest("home");
bool found = registry.TryGetIcon(request, out IconResult result);
```

An empty, whitespace-only, or `null` icon name is invalid and causes `IconRequest` to throw `ArgumentException`.

## Source priority and duplicate names

Sources are queried in registration order. The first source that resolves a name wins.

```csharp
registry.Register(projectSvgIcons);
registry.Register(MaterialSymbolsIconSource.LoadDefault());
```

In this example, a project SVG named `home` overrides the Material Symbol named `home`. Reverse the registration order to give Material Symbols priority.

Duplicate behavior is deterministic:

- registering an `IIconSource` considered equal to an existing source returns `false`;
- identical names in different sources resolve from the first registered source;
- registering the same name twice in one `SvgIconSource` returns `false` and keeps the first SVG.
