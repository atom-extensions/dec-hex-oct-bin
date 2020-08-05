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

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.dec-hex-oct-bin')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');

      await activationPromise;

      // Now we can test for view visibility
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement).toBeVisible();
      spyOn(atom.workspace, "toggle").and.callThrough();
      atom.commands.dispatch(workspaceElement, 'dec-hex-oct-bin:toggle');
      expect(atom.workspace.toggle).toHaveBeenCalledWith(DecHexOctBin.view.getURI())
      // expect(decHexOctBinElement).not.toBeVisible();
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
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-decimal');
      await DecHexOctBin.view.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("b");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("13");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("1011");
    });

    it("as hex", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-hex');
      await DecHexOctBin.view.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("17");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("21");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("10001");
    });

    it("as octal", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-octal');
      await DecHexOctBin.view.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("9");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("9");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("11");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("1001");
    });

    it("as binary", async () => {
      textEditor.setText("11");
      textEditor.selectAll();
      atom.commands.dispatch(textEditor.getElement(), 'dec-hex-oct-bin:parse-binary');
      await DecHexOctBin.view.update();
      const decHexOctBinElement = workspaceElement.querySelector('.dec-hex-oct-bin');
      expect(decHexOctBinElement.querySelector('#decimal').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#hex').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#octal').textContent).toBe("3");
      expect(decHexOctBinElement.querySelector('#binary').textContent).toBe("11");
    });
  });
});
