{View} = require 'atom'

module.exports =
class DecHexOctBinView extends View

  valueToConvert = ""
  editorview = ""

  @content: ->

            @div class: "tool-panel panel-bottom padded", =>
              @div class: "inset-panel", =>
                @div class: "panel-heading", 'DecHexOctBin'

                @div class: 'block', =>
                    @button class: 'btn btn-primary inline-block-tight', click : 'processdecimal', 'Decimal'
                    @span class: 'inline-block highlight-info', outlet: 'decvalue'
                @div class: 'block', =>
                    @button class: 'btn btn-primary inline-block-tight', click : 'processhex', 'Hex'
                    @span class: 'inline-block highlight-info', outlet: 'hexvalue'
                @div class: 'block', =>
                    @button class: 'btn btn-primary inline-block-tight', click : 'processoctal', 'Octal'
                    @span class: 'inline-block highlight-info', outlet: 'octvalue'
                @div class: 'block', =>
                    @button class: 'btn btn-primary inline-block-tight', click : 'processbinary', 'Binary'
                    @span class: 'inline-block highlight-info', outlet: 'binvalue'


  initialize: (serializeState) ->
    atom.workspaceView.command "dec-hex-oct-bin:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "DecHexOctBinView was toggled!"
    editorview = atom.workspaceView
    if @hasParent()
      @detach()
    else
      atom.workspaceView.appendToRight(this)

  processdecimal: ->
    atom.workspace.activePaneItem.selectWord()
    valueToConvert = atom.workspace.activePaneItem.getSelectedText()


    value = parseInt(valueToConvert, 10)
    @decvalue.text(value)
    value = parseInt(valueToConvert).toString(16)
    @hexvalue.text(value)
    value = parseInt(valueToConvert).toString(8)
    @octvalue.text(value)
    value = parseInt(valueToConvert).toString(2)
    @binvalue.text(value)
    editorview.focus()

  processhex: ->
    atom.workspace.activePaneItem.selectWord()
    valueToConvert = atom.workspace.activePaneItem.getSelectedText()

    value = parseInt(valueToConvert, 16)
    @decvalue.text(value)
    value = parseInt(valueToConvert, 16).toString(16)
    @hexvalue.text(value)
    value = parseInt(valueToConvert, 16).toString(8)
    @octvalue.text(value)
    value = parseInt(valueToConvert, 16).toString(2)
    @binvalue.text(value)
    editorview.focus()

  processoctal: ->
    atom.workspace.activePaneItem.selectWord()
    valueToConvert = atom.workspace.activePaneItem.getSelectedText()

    value = parseInt(valueToConvert, 8)
    @decvalue.text(value)
    value = parseInt(valueToConvert, 8).toString(16)
    @hexvalue.text(value)
    value = parseInt(valueToConvert, 8).toString(8)
    @octvalue.text(value)
    value = parseInt(valueToConvert, 8).toString(2)
    @binvalue.text(value)
    editorview.focus()

  processbinary: ->
    atom.workspace.activePaneItem.selectWord()
    valueToConvert = atom.workspace.activePaneItem.getSelectedText()

    value = parseInt(valueToConvert, 2)
    @decvalue.text(value)
    value = parseInt(valueToConvert, 2).toString(16)
    @hexvalue.text(value)
    value = parseInt(valueToConvert, 2).toString(8)
    @octvalue.text(value)
    value = parseInt(valueToConvert, 2).toString(2)
    @binvalue.text(value)
    editorview.focus()
