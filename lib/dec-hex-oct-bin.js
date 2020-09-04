/** @babel */

import DecHexOctBinView from './dec-hex-oct-bin-view';
import { CompositeDisposable } from 'atom';
const configSchema = require("../config.json");

export default {
    decHexOctBinView: null,
    subscriptions: null,
	config: configSchema,

    activate(serialized) {
        this.decHexOctBinView = new DecHexOctBinView(serialized.decHexOctBinView);
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable.
        this.subscriptions = new CompositeDisposable(
            // Registers an opener for the view.
            atom.workspace.addOpener(uri => {
                if (uri == this.decHexOctBinView.getURI()) return this.decHexOctBinView;
            }),
            // Registers the command that toggles the view.
            atom.commands.add('atom-workspace', {
                'dec-hex-oct-bin:toggle': () => this.decHexOctBinView.toggle()
            }),
            // Registers all conversion commands.
            atom.commands.add('atom-text-editor', {
                'dec-hex-oct-bin:parse-as-decimal': () => this.decHexOctBinView.parseAsDecimal(),
                'dec-hex-oct-bin:parse-as-hex': () => this.decHexOctBinView.parseAsHex(),
                'dec-hex-oct-bin:parse-as-octal': () => this.decHexOctBinView.parseAsOctal(),
                'dec-hex-oct-bin:parse-as-binary': () => this.decHexOctBinView.parseAsBinary()
            }),
			// Registers all configuration change events
			atom.config.onDidChange("dec-hex-oct-bin.ui.orientation", orientation => {
                if (orientation.newValue == "wide") {
                    this.decHexOctBinView.refs.rootElement.classList.add("wide");
                } else {
                    this.decHexOctBinView.refs.rootElement.classList.remove("wide");
                }
			})
        );
    },

    deactivate() {
        this.decHexOctBinView.destroy();
        this.subscriptions.dispose();
    },

    serialize() {
        return {
            decHexOctBinView: this.decHexOctBinView.serialize()
        };
    },

    deserializeDecHexOctBinView(serializedDecHexOctBinView) {
        return new DecHexOctBinView(serializedDecHexOctBinView);
    }
};
