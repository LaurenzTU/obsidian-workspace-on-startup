import { App, Notice, Plugin, PluginSettingTab, Setting, Platform } from 'obsidian';

// Interface for the plugin's settings
interface AutoWorkspaceSettings {
	desktopWorkspaceName: string;
	mobileWorkspaceName: string;
	desktopEnabled: boolean;
	mobileEnabled: boolean;
}

// Default settings
const DEFAULT_SETTINGS: AutoWorkspaceSettings = {
	desktopWorkspaceName: '',
	mobileWorkspaceName: '',
	desktopEnabled: true,
	mobileEnabled: true
};

export default class AutoWorkspacePlugin extends Plugin {
	settings: AutoWorkspaceSettings;

	/**
	 * This is the entry point of the plugin. It's designed to be as fast as possible.
	 */
	async onload() {
		// Loads settings from disk. This is a quick async operation.
		await this.loadSettings();

		// Registers the settings tab. This is a lightweight, synchronous operation.
		this.addSettingTab(new AutoWorkspaceSettingTab(this.app, this));

		// **PERFORMANCE KEY:** This is the most important part for performance.
		// We register a callback for the 'layout-ready' event. This means the plugin
		// does NOT block Obsidian's startup. It waits until the app is fully loaded
		// and ready before attempting to load the workspace.
		this.app.workspace.onLayoutReady(this.loadWorkspaceOnStartup.bind(this));

		console.log('Auto Workspace Loader plugin loaded.');
	}

	onunload() {
		console.log('Auto Workspace Loader plugin unloaded.');
	}

	/**
	 * Loads settings, handling migration from older versions and ensuring
	 * all setting properties exist.
	 */
	async loadSettings() {
		// Start with the defaults to ensure all keys are present.
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * This is the core logic, which runs only after Obsidian is fully loaded.
	 * Its operations do not affect startup time.
	 */
	private async loadWorkspaceOnStartup(): Promise<void> {
		const isMobile = Platform.isMobile;
		const shouldLoad = isMobile ? this.settings.mobileEnabled : this.settings.desktopEnabled;
		const workspaceToLoad = isMobile ? this.settings.mobileWorkspaceName : this.settings.desktopWorkspaceName;

		// These checks are extremely fast.
		if (!shouldLoad || !workspaceToLoad || workspaceToLoad.trim() === '') {
			return; // Exit if not enabled or no workspace is set.
		}

		console.log(`Auto Workspace: Attempting to load workspace "${workspaceToLoad}" on ${isMobile ? 'mobile' : 'desktop'}`);

		try {
			const workspacesPlugin = (this.app as any).internalPlugins.plugins.workspaces;
			const workspaceInstance = workspacesPlugin?.instance;

			if (workspaceInstance && workspacesPlugin.enabled) {
				// The actual workspace loading is an async I/O operation.
				// By this point, the app is already interactive, so the user
				// is not blocked while this happens.
				await workspaceInstance.loadWorkspace(workspaceToLoad);
				new Notice(`Workspace "${workspaceToLoad}" loaded.`);
			} else if (workspacesPlugin && !workspacesPlugin.enabled) {
				new Notice('Auto Workspace Loader: The core "Workspaces" plugin must be enabled.', 5000);
			}
		} catch (error) {
			console.error("Auto Workspace Plugin - Error loading workspace:", error);
			new Notice(`Error loading workspace: "${workspaceToLoad}". Please check if it still exists.`, 7000);
		}
	}
}

class AutoWorkspaceSettingTab extends PluginSettingTab {
	plugin: AutoWorkspacePlugin;

	constructor(app: App, plugin: AutoWorkspacePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl('h2', { text: 'Auto Workspace Loader Settings' });

		// The settings UI has no impact on general app performance; it only
		// runs when the user opens the settings tab.

		new Setting(containerEl)
			.setName('Enable for Desktop')
			.setDesc('If on, automatically load the specified desktop workspace.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.desktopEnabled)
				.onChange(async (value) => {
					this.plugin.settings.desktopEnabled = value;
					await this.plugin.saveSettings();
					this.display();
				}));

		new Setting(containerEl)
			.setName('Desktop workspace')
			.setDesc('The workspace to load on desktop devices.')
			.addText(text => {
				text.setPlaceholder('e.g., Main Work')
					.setValue(this.plugin.settings.desktopWorkspaceName)
					.setDisabled(!this.plugin.settings.desktopEnabled)
					.onChange(async (value) => {
						this.plugin.settings.desktopWorkspaceName = value.trim();
						await this.plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName('Enable for Mobile')
			.setDesc('If on, automatically load the specified mobile workspace.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.mobileEnabled)
				.onChange(async (value) => {
					this.plugin.settings.mobileEnabled = value;
					await this.plugin.saveSettings();
					this.display();
				}));

		new Setting(containerEl)
			.setName('Mobile workspace')
			.setDesc('The workspace to load on mobile devices.')
			.addText(text => {
				text.setPlaceholder('e.g., Quick Notes')
					.setValue(this.plugin.settings.mobileWorkspaceName)
					.setDisabled(!this.plugin.settings.mobileEnabled)
					.onChange(async (value) => {
						this.plugin.settings.mobileWorkspaceName = value.trim();
						await this.plugin.saveSettings();
					});
			});
	}
}