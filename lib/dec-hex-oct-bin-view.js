'use babel';

export default class DecHexOctBinView {
    constructor(state) {
        // Initialize
        this.currentValue = 0;
        this.currentValueType = 'Decimal';
        // Create root element
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('dec-hex-oct-bin');
        this.rootElement.innerHTML = `
            <div class="padded">
                <div class="row block inset-panel">
                    <div class="col"><button class="btn" title="Choose input type">Decimal</button></div>
                    <div class="col number highlight" id="decimal" title="Copy this value"></div>
                </div>
                <div class="row block inset-panel">
                    <div class="col"><button class="btn active" title="Choose input type">Hex</button></div>
                    <div class="col number highlight" id="hex" title="Copy this value"></div>
                </div>
                <div class="row block inset-panel">
                    <div class="col"><button class="btn" title="Choose input type">Octal</button></div>
                    <div class="col number highlight" id="octal" title="Copy this value"></div>
                </div>
                <div class="row block inset-panel">
                    <div class="col"><button class="btn" title="Choose input type">Binary</button></div>
                    <div class="col number highlight" id="binary" title="Copy this value"></div>
                </div>
            </div>`;
    }

    getSelectedText() {
        return atom.workspace.getActiveTextEditor().getSelectedText();
    }

    updatePanel() {
        console.log('test2');
        this.rootElement.querySelector("#decimal").textContent = this.currentValue.toString(10);
        this.rootElement.querySelector("#hex").textContent = this.currentValue.toString(16);
        this.rootElement.querySelector("#octal").textContent = this.currentValue.toString(8);
        this.rootElement.querySelector("#binary").textContent = this.currentValue.toString(2);
        console.log('test3');
    }

    parseN() {

    }

    parseDecimal() {
        this.currentValue = parseInt(this.getSelectedText(), 10);
        this.updatePanel();
    }

    parseHex() {
        this.currentValue = parseInt(this.getSelectedText(), 16);
        this.updatePanel();
    }

    parseOctal() {
        this.currentValue = parseInt(this.getSelectedText(), 8);
        this.updatePanel();
    }

    parseBinary() {
        this.currentValue = parseInt(this.getSelectedText(), 2);
        this.updatePanel();
    }

    // Used by Atom for tab text.
    getTitle() {
        return 'Number conversion';
    }

    // Used by Atom to identify the view when toggling.
    getURI() {
        return 'atom://dec-hex-oct-bin';
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
        this.rootElement.remove();
    }

    getElement() {
        return this.rootElement;
    }
}
