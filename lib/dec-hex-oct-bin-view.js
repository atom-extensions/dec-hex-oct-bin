/** @babel */

/** @jsx etch.dom */

const etch = require("etch");

export default class DecHexOctBinView {
    constructor(state = {}) {
        // Initialize
        this.state = {
            decimal: "",
            hex: "",
            octal: "",
            binary: "",
            ...state,
        }

        etch.initialize(this);
    }

    render() {
        // Create root element
        return (
            <div className="dec-hex-oct-bin">
                <div className="padded">
                    <div className="row block inset-panel">
                        <div className="col"><button className="btn" title="Choose input type" on={{click: this.parseDecimal}}>Decimal</button></div>
                        <div className="col number highlight" id="decimal" title="Copy this value" on={{click: this.copy}}>{this.state.decimal}</div>
                    </div>
                    <div className="row block inset-panel">
                        <div className="col"><button className="btn" title="Choose input type" on={{click: this.parseHex}}>Hex</button></div>
                        <div className="col number highlight" id="hex" title="Copy this value" on={{click: this.copy}}>{this.state.hex}</div>
                    </div>
                    <div className="row block inset-panel">
                        <div className="col"><button className="btn" title="Choose input type" on={{click: this.parseOctal}}>Octal</button></div>
                        <div className="col number highlight" id="octal" title="Copy this value" on={{click: this.copy}}>{this.state.octal}</div>
                    </div>
                    <div className="row block inset-panel">
                        <div className="col"><button className="btn" title="Choose input type" on={{click: this.parseBinary}}>Binary</button></div>
                        <div className="col number highlight" id="binary" title="Copy this value" on={{click: this.copy}}>{this.state.binary}</div>
                    </div>
                </div>
            </div>
        );
    }

    update(num) {
        if (num != null) {
            this.state = {
                decimal: num.toString(10),
                hex: num.toString(16),
                octal: num.toString(8),
                binary: num.toString(2),
            }
        }
        return etch.update(this);
    }

    getSelectedText() {
        return atom.workspace.getActiveTextEditor().getSelectedText();
    }

    copy(e) {
        atom.clipboard.write(e.target.textContent);
    }

    parseN() {

    }

    parseDecimal() {
        return this.update(parseInt(this.getSelectedText(), 10));
    }

    parseHex() {
        return this.update(parseInt(this.getSelectedText(), 16));
    }

    parseOctal() {
        return this.update(parseInt(this.getSelectedText(), 8));
    }

    parseBinary() {
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

    // Returns an object that can be retrieved when package is activated
    serialize() {
        // This is used to look up the deserializer function. It can be any string, but it needs to be unique across all packages!
        return {
            deserializer: 'dec-hex-oct-bin/DecHexOctBinView'
        };
    }

    // Tear down any state and detach
    destroy() {
        return etch.destroy(this);
    }

    getElement() {
        return this.element;
    }
}
