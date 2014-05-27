{WorkspaceView} = require 'atom'
DecHexOctBin = require '../lib/dec-hex-oct-bin'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "DecHexOctBin", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('dec-hex-oct-bin')

  describe "when the dec-hex-oct-bin:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.dec-hex-oct-bin')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'dec-hex-oct-bin:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.dec-hex-oct-bin')).toExist()
        atom.workspaceView.trigger 'dec-hex-oct-bin:toggle'
        expect(atom.workspaceView.find('.dec-hex-oct-bin')).not.toExist()
