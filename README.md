# Obsidian Auto Workspace Loader

![Made for Obsidian](https://img.shields.io/badge/Made%20for-Obsidian-7B68EE.svg)

A simple, lightweight plugin for Obsidian that automatically loads a specified workspace when the application starts. You can set a different startup workspace for desktop and mobile devices.

## Features

- **Automatic Workspace Loading:** Set a workspace to load automatically every time you open Obsidian.
- **Platform Specific:** Configure a different startup workspace for your desktop and mobile devices.
- **Enable/Disable Toggles:** Easily enable or disable the auto-loading feature for each platform without losing your settings.
- **Lightweight & Performant:** The plugin is designed to be highly efficient. It runs only once after Obsidian has finished its own startup process and has no impact on performance afterward.

## How to Use

Once installed, the plugin's settings can be found in Obsidian under **Settings** > **Community Plugins** > **Auto Workspace Loader**.

1.  **Enable for Desktop/Mobile:** Use the toggle to turn the auto-loading feature on or off for that platform.
2.  **Enter Workspace Name:** In the text field for each platform, enter the *exact* name of the workspace you want to load.
3.  **Done!** The next time you start Obsidian on that device, it will automatically load your chosen workspace.

## Manual Installation

Until this plugin is available in the community store, you can install it manually.

1.  Go to the [Releases](https://github.com/LaurenzTU/obsidian-workspace-on-startup/releases) page of this repository.
2.  Download the `main.js`, `styles.css`, and `manifest.json` files from the latest release.
3.  In your Obsidian vault, navigate to the `.obsidian/plugins/` folder.
4.  Create a new folder inside `plugins` named `auto-workspace-loader`.
5.  Copy the three downloaded files into this new folder.
6.  Completely restart Obsidian.
7.  Go to **Settings** > **Community Plugins**, find "Auto Workspace Loader," and enable it.

## For Developers (Building from source)

If you want to build the plugin from the source code:

1.  Clone this repository.
2.  In the repository's root directory, run `npm install` to install the dependencies.
3.  Run `npm run build` to compile the TypeScript code into `main.js`.