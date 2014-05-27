DecHexOctBinView = require './dec-hex-oct-bin-view'

module.exports =
  decHexOctBinView: null

  activate: (state) ->
    @decHexOctBinView = new DecHexOctBinView(state.decHexOctBinViewState)

  deactivate: ->
    @decHexOctBinView.destroy()

  serialize: ->
    decHexOctBinViewState: @decHexOctBinView.serialize()
