/** @babel */

import DecHexOctBinView from './dec-hex-oct-bin-view';
import { CompositeDisposable } from 'atom';

export default {
    view: null,
    subscriptions: null,

    activate(state) {
        // Creates view instance.
        if (!this.view) {
            this.view = new DecHexOctBinView(state);
        }
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable.
        this.subscriptions = new CompositeDisposable(
            // Adds an opener for the view.
            atom.workspace.addOpener(uri => {
                if (uri == this.view.getURI()) return this.view;
            }),
            // Registers the command that toggles the view.
            atom.commands.add('atom-workspace', {
                'dec-hex-oct-bin:toggle': () => this.toggle()
            }),
            // Registers all conversion commands.
            atom.commands.add('atom-text-editor', {
                'dec-hex-oct-bin:parse': () => this.view.parseN(),
                'dec-hex-oct-bin:parse-decimal': () => this.view.parseDecimal(),
                'dec-hex-oct-bin:parse-hex': () => this.view.parseHex(),
                'dec-hex-oct-bin:parse-octal': () => this.view.parseOctal(),
                'dec-hex-oct-bin:parse-binary': () => this.view.parseBinary()
            })
        );
    },

    // Restores view on Atom startup.
    deserializeDecHexOctBinView(state) {
        if (this.view) {
            this.view.destroy();
        }
        this.view = new DecHexOctBinView(state);
        return this.view;
    },

    deactivate() {
        this.subscriptions.dispose();
        this.view.destroy();
        this.view = null;
    },

    toggle() {
        return atom.workspace.toggle(this.view.getURI());
    }
};
