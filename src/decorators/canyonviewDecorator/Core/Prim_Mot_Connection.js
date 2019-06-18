/*globals define, _, Raphael*/
/*jshint browser: true, newcap: false*/
/**
 * @author rkereskenyi / https://github.com/rkereskenyi
 */

define([
    'raphaeljs',
    'js/NodePropertyNames',
    'js/RegistryKeys',
    'js/Constants',
    'js/Utils/GMEVisualConcepts'
], function (_raphaeljs, nodePropertyNames, REGISTRY_KEYS, CONSTANTS, GMEVisualConcepts) {

    'use strict';
	   //console.log('Prim_Mot_Connection use strict');

    var Prim_Mot_Connection,
        WIDTH = 120,
        HEIGHT = 40,
        MARGIN = 10,
        DEFAULT_COLOR = '#000000',
        DEFAULT_STROKE_WIDTH = 4,
        Y = HEIGHT / 2 + 0.5;

    Prim_Mot_Connection = function () {
    };

   Prim_Mot_Connection.prototype._getPrim_Mot_ConnectionLineStyle = function () {
	 //  console.log('Prim_Mot_Connection.prototype._getPrim_Mot_ConnectionLineStyle');
        this._lineStyle = {};
        this._lineStyle[CONSTANTS.LINE_STYLE.WIDTH] = DEFAULT_STROKE_WIDTH;
        this._lineStyle[CONSTANTS.LINE_STYLE.COLOR] = DEFAULT_COLOR;
        this._lineStyle[CONSTANTS.LINE_STYLE.PATTERN] = CONSTANTS.LINE_STYLE.PATTERNS.SOLID;
        this._lineStyle[CONSTANTS.LINE_STYLE.TYPE] = CONSTANTS.LINE_STYLE.TYPES.NONE;
        this._lineStyle[CONSTANTS.LINE_STYLE.START_ARROW] = CONSTANTS.LINE_STYLE.LINE_ARROWS.NONE;
        this._lineStyle[CONSTANTS.LINE_STYLE.END_ARROW] = CONSTANTS.LINE_STYLE.LINE_ARROWS.DIAMOND;

	   //console.log(' - _linestyle[CONSTANTS.LINE_STYLE.END_ARROW] = ' + this._lineStyle[CONSTANTS.LINE_STYLE.END_ARROW]);
	   //console.log(' - gmeID: ' + this._gmeID);

        _.extend(this._lineStyle, GMEVisualConcepts.getConnectionVisualProperties(this._gmeID));
	   //console.log(' - _linestyle[CONSTANTS.LINE_STYLE.END_ARROW]2 = ' + this._lineStyle[CONSTANTS.LINE_STYLE.END_ARROW]);
    };

   Prim_Mot_Connection.prototype._getDisplayFormat = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._gmeID),
            displayFormat;

        if (nodeObj) {
            displayFormat = nodeObj.getRegistry(REGISTRY_KEYS.DISPLAY_FORMAT) || '';
        }

        return displayFormat;
    };

	Prim_Mot_Connection.prototype._renderMetaTypeSpecificParts = function () {
	  // console.log('Prim_Mot_Connection.prototype._renderMetaTypeSpecificParts');
        this.SVGPaper = Raphael(this.$el.find('.svgContainer')[0], WIDTH, 40);
        this.path = this.SVGPaper.path('M ' + MARGIN + ',' + Y + ' L ' + (WIDTH - MARGIN) + ',' + Y);
        this.txtDisplayFormat = this.SVGPaper.text(WIDTH / 2, 8, '');



	   //console.log(' - - Path: ' + this.path);
    };

   Prim_Mot_Connection.prototype._updateMetaTypeSpecificParts = function () {
        this._getPrim_Mot_ConnectionLineStyle();


	   //console.log(' - _linestyle[CONSTANTS.LINE_STYLE.END_ARROW]3 = ' + this._lineStyle[CONSTANTS.LINE_STYLE.END_ARROW]);

        this.path.attr({
            stroke: this._lineStyle[CONSTANTS.LINE_STYLE.COLOR],
            'stroke-width': this._lineStyle[CONSTANTS.LINE_STYLE.WIDTH],
            'stroke-dasharray': this._lineStyle[CONSTANTS.LINE_STYLE.PATTERN],
            'arrow-start': this._lineStyle[CONSTANTS.LINE_STYLE.START_ARROW],
            'arrow-end': this._lineStyle[CONSTANTS.LINE_STYLE.END_ARROW]
        });

	   //console.log(' - this.path = ' + this.path);

        this.txtDisplayFormat.attr('text', this._getDisplayFormat());
    };


    return Prim_Mot_Connection;
});