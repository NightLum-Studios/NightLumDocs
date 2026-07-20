## Requirements

- Unity 2022.3 LTS or newer.
- UI Toolkit runtime or Editor UI.

## Namespaces

Most projects use these namespaces:

```csharp
using NightLum.Sigil;
using NightLum.Sigil.MaterialSymbols;
using NightLum.Sigil.Svg;
using NightLum.Sigil.UIToolkit;
using NightLum.Sigil.Fonts;
using UnityEngine.UIElements;
```

The corresponding assemblies are:

- `NightLum.Sigil.Core` - registry, contracts, and UI-independent icon data;
- `NightLum.Sigil.MaterialSymbols` - bundled Material Symbols source;
- `NightLum.Sigil.Svg` - inline SVG source and parser;
- `NightLum.Sigil.UIToolkit` - `IconElement` and UI Toolkit display helpers.
- `NightLum.Sigil.Fonts` - font registry, family assets, variants, requests, and results.
- `NightLum.Sigil.Fonts.Editor` - Google Fonts import tooling; Editor-only.

The runtime assemblies do not depend on `UnityEditor` or `AssetDatabase`.

## Complete Material Symbols example

The normal workflow is to create one registry for a UI context, register the sources it needs, and pass that registry to each icon element.

```csharp
using NightLum.Sigil;
using NightLum.Sigil.MaterialSymbols;
using NightLum.Sigil.UIToolkit;
using UnityEngine;
using UnityEngine.UIElements;

public sealed class ToolbarView : MonoBehaviour
{
    [SerializeField] private UIDocument document;

    private IconRegistry _icons;
    private IconElement _actionIcon;

    private void OnEnable()
    {
        _icons = new IconRegistry();
        _icons.Register(MaterialSymbolsIconSource.LoadDefault());

        _actionIcon = new IconElement(_icons, "home");
        _actionIcon.AddToClassList("toolbar-icon");
        document.rootVisualElement.Add(_actionIcon);
    }

    public void ShowSettingsIcon()
    {
        _actionIcon.IconName = "settings";
    }
}
```

`MaterialSymbolsIconSource.LoadDefault()` loads the bundled font and codepoint table from Unity `Resources`. It does not download anything at runtime.

Material names are case-sensitive and use the official snake-case form:

```text
home
favorite
settings
arrow_forward
delete_forever
```

Sigil does not include an icon browser or search API. Use the official Material Symbols catalog to find names.

## EditorWindow example

The same runtime API works in Editor UI Toolkit windows:

```csharp
using NightLum.Sigil;
using NightLum.Sigil.MaterialSymbols;
using NightLum.Sigil.UIToolkit;
using UnityEditor;

public sealed class SigilExampleWindow : EditorWindow
{
    [MenuItem("Window/Sigil Example")]
    private static void Open()
    {
        GetWindow<SigilExampleWindow>();
    }

    public void CreateGUI()
    {
        var registry = new IconRegistry();
        registry.Register(MaterialSymbolsIconSource.LoadDefault());

        rootVisualElement.Add(new IconElement(registry, "settings"));
    }
}
```

Keep this code in an Editor-only assembly because it derives from `EditorWindow`. Sigil itself does not require Editor APIs.
