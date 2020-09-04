/** @babel */
/** @jsx etch.dom */

import etch from 'etch';

export default class DecHexOctBinView {
    constructor(serialized) {
        // Initialize
        this.state = {
            decimal: "",
            hex: "",
            octal: "",
            binary: ""
        }
        if (serialized) {
            this.state = serialized.state;
        }
        etch.initialize(this);
    }

    render() {
        // Create root element
        return (
            <div className="dec-hex-oct-bin padded" ref="rootElement">
                <div className="row block inset-panel">
                    <div className="col"><button className="btn" id="parse-decimal" title="Choose input type" on={{click: this.parseAsDecimal}}>Decimal</button></div>
                    <div className="col number highlight" id="decimal" title="Click to copy this value" on={{click: this.copyValueToClipboard}}>{this.state.decimal}</div>
                </div>
                <div className="row block inset-panel">
                    <div className="col"><button className="btn" id="parse-hex" title="Choose input type" on={{click: this.parseAsHex}}>Hex</button></div>
                    <div className="col number highlight" id="hex" title="Click to copy this value" on={{click: this.copyValueToClipboard}}>{this.state.hex}</div>
                </div>
                <div className="row block inset-panel">
                    <div className="col"><button className="btn" id="parse-octal" title="Choose input type" on={{click: this.parseAsOctal}}>Octal</button></div>
                    <div className="col number highlight" id="octal" title="Click to copy this value" on={{click: this.copyValueToClipboard}}>{this.state.octal}</div>
                </div>
                <div className="row block inset-panel">
                    <div className="col"><button className="btn" id="parse-binary" title="Choose input type" on={{click: this.parseAsBinary}}>Binary</button></div>
                    <div className="col number highlight" id="binary" title="Click to copy this value" on={{click: this.copyValueToClipboard}}>{this.state.binary}</div>
                </div>
            </div>
        );
    }

    update(value) {
        if (value != null) {
            this.state = {
                decimal: value.toString(10),
                hex: value.toString(16),
                octal: value.toString(8),
                binary: value.toString(2),
            }
        }
        return etch.update(this);
    }

    getSelectedText() {
        return atom.workspace.getActiveTextEditor().getSelectedText();
    }

    copyValueToClipboard(event) {
        atom.clipboard.write(event.target.textContent);
    }

    parseAsDecimal() {
        return this.update(parseInt(this.getSelectedText(), 10));
    }

    parseAsHex() {
        return this.update(parseInt(this.getSelectedText(), 16));
    }

    parseAsOctal() {
        return this.update(parseInt(this.getSelectedText(), 8));
    }

    parseAsBinary() {
        return this.update(parseInt(this.getSelectedText(), 2));
    }

    // Used by Atom for tab text.
    getTitle() {
        return 'Number conversion';
    }

    // Used by Atom to identify the view when toggling.
    getURI() {
        return 'atom://dec-hex-oct-bin';
    }

    // Open in right dock by default
    getDefaultLocation() {
        return 'right';
    }

    getElement() {
        return this.refs.rootElement;
    }

    // Tear down any state and detach
    destroy() {
        return etch.destroy(this);
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {
        // This is used to look up the deserializer function. It can be any string, but it needs to be unique across all packages!
        return {
            deserializer: 'dec-hex-oct-bin/DecHexOctBinView',
            state: this.state
        };
    }

    toggle() {
        return atom.workspace.toggle(this.getURI());
    }
}
