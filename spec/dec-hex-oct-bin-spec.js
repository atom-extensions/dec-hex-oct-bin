/** @babel */

import DecHexOctBin from '../lib/dec-hex-oct-bin';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('DecHexOctBin', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('dec-hex-oct-bin');
  });

  describe('when the dec-hex-oct-bin:toggle event is triggered', () => {
    it('hides and shows the view', async () => {
      // This test shows you an integration test testing at the view level.

      expect(workspaceElement.querySelector('.dec-hex-oct-bin')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');

      await activationPromise;

      expect(workspaceElement.querySelector('.dec-hex-oct-bin')).toExist();

      // Now we can test for view visibility
      const pane = atom.workspace.paneForItem(DecHexOctBin.decHexOctBinView);
      const dock = atom.workspace.getRightDock();
      expect(pane.getContainer().getLocation()).toBe("right");
      expect(dock.isVisible()).toBe(true);

      // Hide view
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');
      expect(dock.isVisible()).toBe(false);
    });
  });

  describe("parsing selected text", () => {
    let textEditor;
    beforeEach(async () => {
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');
      await activationPromise;
      textEditor = await atom.workspace.open();
    });

    it("as decimal", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-as-decimal');
      await DecHexOctBin.decHexOctBinView.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("b");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("13");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("1011");
    });

    it("as decimal with button", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      decHexOctBinElement.querySelector('#parse-decimal').click();
      await DecHexOctBin.decHexOctBinView.update();
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("b");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("13");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("1011");
    });

    it("as hex", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-as-hex');
      await DecHexOctBin.decHexOctBinView.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("17");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("21");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("10001");
    });

    it("as hex with button", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      decHexOctBinElement.querySelector('#parse-hex').click();
      await DecHexOctBin.decHexOctBinView.update();
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("17");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("21");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("10001");
    });

    it("as octal", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-as-octal');
      await DecHexOctBin.decHexOctBinView.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("9");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("9");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("1001");
    });

    it("as octal with button", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      decHexOctBinElement.querySelector('#parse-octal').click();
      await DecHexOctBin.decHexOctBinView.update();
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("9");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("9");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("1001");
    });

    it("as binary", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-as-binary');
      await DecHexOctBin.decHexOctBinView.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("11");
    });

    it("as binary with button", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      decHexOctBinElement.querySelector('#parse-binary').click();
      await DecHexOctBin.decHexOctBinView.update();
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("11");
    });
  });

  describe("copies text", () => {
    beforeEach(async () => {
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');
      await activationPromise;
    });

    it("copies decimal text", async () => {
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      const element = decHexOctBinElement.querySelector('#decimal')
      element.textContent = "copied";
      atom.clipboard.write("not copied");
      expect(atom.clipboard.read()).not.toBe("copied");
      element.click();
      expect(atom.clipboard.read()).toBe("copied");
    });

    it("copies hex text", async () => {
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      const element = decHexOctBinElement.querySelector('#hex')
      element.textContent = "copied";
      atom.clipboard.write("not copied");
      expect(atom.clipboard.read()).not.toBe("copied");
      element.click();
      expect(atom.clipboard.read()).toBe("copied");
    });

    it("copies octal text", async () => {
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      const element = decHexOctBinElement.querySelector('#octal')
      element.textContent = "copied";
      atom.clipboard.write("not copied");
      expect(atom.clipboard.read()).not.toBe("copied");
      element.click();
      expect(atom.clipboard.read()).toBe("copied");
    });

    it("copies binary text", async () => {
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      const element = decHexOctBinElement.querySelector('#binary')
      element.textContent = "copied";
      atom.clipboard.write("not copied");
      expect(atom.clipboard.read()).not.toBe("copied");
      element.click();
      expect(atom.clipboard.read()).toBe("copied");
    });
  });

  describe("ui", () => {
    beforeEach(async () => {
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');
      await activationPromise;
    });

    it("set orientation class wide", async () => {
      atom.config.set('dec-hex-oct-bin.ui.orientation', "wide");
      await DecHexOctBin.decHexOctBinView.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.classList).toContain("wide");
    });
  });
});
