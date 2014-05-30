# Rhapsody Control
Provides remote controls and media key support for the Rhapsody website. This is primarily designed to work with a [Fluid](http://fluidapp.com/) [SSB](http://en.wikipedia.org/wiki/Site-specific_browser) but it should also work with userscript extensions such as [GreaseMonkey](http://www.greasespot.net/) or [TamperMonkey](http://tampermonkey.net/) in supported browsers. Just be aware that the Growl notifications won't work when used in a browser.

## Installation

1. Setup this script in: *~/Sites/rhapsody-control*
2. Install the Node dependencies:
	`npm install`
3. Install [Forever](https://github.com/nodejitsu/forever) into your global Node modules:
	`npm install -g forever`
3. Create a symlink for the included shell script:
	`ln -s ~/Sites/rhapsody-control/shell-scripts/rhapsody /usr/local/sbin/rhapsody`
3. Download Fluid and create an SSB that points to <http://app.rhapsody.com/>
4. Open the newly created Rhapsody app and open the Window->Userscripts menu
5. Add a pattern of "*.rhapsody.com"
6. Paste the contents of (*js/userscript.min.js*) into the text field

## Usage

### Start

1. Start the command server:
`rhapsody start` or `cd ~/Sites/rhapsody-control; npm start`

### Commands

* Play/Pause:
	`rhapsody pause` or `cd ~/Sites/rhapsody-control; npm run-script pause`
* Previous:
	`rhapsody prev` or `cd ~/Sites/rhapsody-control; npm run-script prev`
* Next:
	`rhapsody next` or `cd ~/Sites/rhapsody-control; npm run-script next`
* Shuffle:
	`rhapsody shuffle` or `cd ~/Sites/rhapsody-control; npm run-script shuffle`

## Suppress iTunes from taking over the media keys

Normally iTunes will take over the media keys on your keyboard (previous, play/pause, and next). With a music service like Rhapsody, we want to suppress this behavior so iTunes won't launch when you use the media keys.

### Method #1

* Patch iTunes
	1. Install the iTunesPatch located [here](http://www.thebitguru.com/projects/iTunesPatch) and follow the installation instructions
	2. Install the MediaKeysPlugin into your Rhapsody plugins folder:
		* */Applications/Rhapsody.app/Contents/PlugIns/MediaKeysPlugin.fluidplugin*
	3. Open the Rhapsody SSB and open the Window->Userscripts menu
	4. Add a new userscript in the left hand pane, name it "MediaKeys"
	5. Add a pattern of “*.rhapsody.com”
	6. Paste the contents of (*js/mediaKeysPlugin.min.js*) into the text field
	7. Refresh

### Method #2

* Remap the media keys:
	1. Use a program like KeyRemap4MacBook to remap the keys like so:
		* Map previous to F7
		* Map play/pause to F8
		* Map next to F9
	2. Use a macro program like Keyboard Maestro to fire the following terminal commands:
		* Map the F7 key to `cd ~/Sites/rhapsody-control; npm run-script prev`
		* Map the F8 key to `cd ~/Sites/rhapsody-control; npm run-script pause`
		* Map the F9 key to `cd ~/Sites/rhapsody-control; npm run-script next`
