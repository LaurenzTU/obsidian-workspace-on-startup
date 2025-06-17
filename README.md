Obsidian Auto Workspace Loader

A simple, lightweight plugin for Obsidian that automatically loads a specified workspace when the application starts. You can set a different startup workspace for desktop and mobile devices.
Features

    Automatic Workspace Loading: Set a workspace to load automatically every time you open Obsidian.

    Platform Specific: Configure a different startup workspace for your desktop and mobile devices.

    Enable/Disable Toggles: Easily enable or disable the auto-loading feature for each platform without losing your settings.

    Lightweight & Performant: The plugin is designed to be highly efficient. It runs only once after Obsidian has finished its own startup process and has no impact on performance afterward.

How to Use

Once installed, the plugin's settings can be found in Obsidian under Settings > Community Plugins > Auto Workspace Loader.

    Enable for Desktop/Mobile: Use the toggle to turn the auto-loading feature on or off for that platform.

    Enter Workspace Name: In the text field for each platform, enter the exact name of the workspace you want to load.

    Done! The next time you start Obsidian on that device, it will automatically load your chosen workspace.

Manual Installation

Until this plugin is available in the community store, you can install it manually.

    Go to the Releases page of this repository.

    Download the main.js, styles.css, and manifest.json files from the latest release.

    In your Obsidian vault, navigate to the .obsidian/plugins/ folder.

    Create a new folder inside plugins named auto-workspace-loader.

    Copy the three downloaded files into this new folder.

    Completely restart Obsidian.

    Go to Settings > Community Plugins, find "Auto Workspace Loader," and enable it.

For Developers (Building from source)

If you want to build the plugin from the source code:

    Clone this repository.

    In the repository's root directory, run npm install to install the dependencies.

    Run npm run build to compile the TypeScript code into main.js.