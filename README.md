# Dash2Dock Blur

A GNOME Shell Extension with smooth animations, customizable styling, and dynamic macOS-style background blur behind the dock.

This project is a fork of [Dash2Dock Animated](https://github.com/icedman/dash2dock-lite) by icedman. Huge thanks and full credit to [icedman](https://github.com/icedman) and upstream contributors for the original dock implementation!

### Notice & Compatibility

* Extension UUID: `dash2dock-blur@shreyasspoojary531-ux`
* Settings Schema: `org.gnome.shell.extensions.dash2dock-blur`
* Supports GNOME Shell 45, 46, 47, 48, 49, 50+

### Features

* **Dynamic macOS-Style Background Blur**: Native Shell background blur with translucent tint and smooth rounded corners.
* **Independent Coexistence**: Configured with unique IDs, schemas, and CSS names to operate independently from upstream Dash2Dock Animated and Ubuntu Dock.
* **Fluid Dock Animations**: Magnification, spread, and rise icon effects.
* **Autohide / Intellihide**: Smooth dodge mode and pressure-sense reveal.
* **Dock Positions**: Bottom, left, right, top.
* **Panel and Floating Modes**.
* **Integrated Indicators**: Running app indicators, notification badges, dynamic trash icon, mounts, clock, and calendar.

### Installation

#### Install from Source

1. Clone this repository:
   ```bash
   git clone https://github.com/shreyasspoojary531-ux/dash2dock-lite.git dash2dock-blur
   cd dash2dock-blur
   ```

2. Compile the settings schema and install:
   ```bash
   make install
   ```
   Or symlink directly into your extensions folder:
   ```bash
   mkdir -p ~/.local/share/gnome-shell/extensions
   ln -s "$(pwd)" ~/.local/share/gnome-shell/extensions/dash2dock-blur@shreyasspoojary531-ux
   glib-compile-schemas schemas/
   ```

3. Enable the extension:
   ```bash
   gnome-extensions enable dash2dock-blur@shreyasspoojary531-ux
   ```

*(Note: Disable Ubuntu Dock or Dash2Dock Animated while using Dash2Dock Blur to avoid duplicate docks.)*

#### Preferences

Open the preferences dialog:
```bash
gnome-extensions prefs dash2dock-blur@shreyasspoojary531-ux
```

## Custom Configuration & Styles

Configuration files are loaded from `~/.config/dash2dock-blur/` (with automatic fallback to `~/.config/d2da/` if present).
You can add custom styles by creating `style.css` in that folder.

## Upstream Credits

* Upstream project: [icedman/dash2dock-lite](https://github.com/icedman/dash2dock-lite)
* Original Author: icedman ([Buy Me A Coffee](https://www.buymeacoffee.com/icedman) / [Ko-fi](https://ko-fi.com/icedman))

## License

Distributed under the GNU General Public License v3.0. See [LICENSE](LICENSE) for details.
