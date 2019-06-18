/*globals define, _, $*/
/*jshint browser: true, newcap: false*/
/**
 * @author rkereskenyi / https://github.com/rkereskenyi
 */


//TODO does it really work with the fixed paths????
define([
    'js/Constants',
    'js/RegistryKeys',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
		'text!./Straight.html',
		'text!./Right.html',
		'text!./Left.html',
		'text!./ZigZagRight.html',
		'text!./ZigZagLeft.html',
	'text!./PrimMotConnection.html',
    './Prim_Mot_Connection',
    './canyonview.META'
], function (CONSTANTS,
             REGISTRY_KEYS,
             nodePropertyNames,
             DiagramDesignerWidgetConstants,
			 StraightTemplate,
			 RightTemplate,
			 LeftTemplate,
			 ZigZagRightTemplate,
			 ZigZagLeftTemplate,
             Prim_Mot_ConnectionTemplate,
             Prim_Mot_Connection,
             canyonviewMETA) {
    'use strict';
//	   console.log('canyonviewDecoratorCore use strict');

    var canyonviewDecoratorCore,
        canyonviewDecoratorClass = 'canyonview',
        DEFAULT_CLASS = 'default',
	   METATYPETEMPLATE_STRAIGHT = $(StraightTemplate),
	   METATYPETEMPLATE_RIGHT = $(RightTemplate),
	   METATYPETEMPLATE_LEFT = $(LeftTemplate),
	   METATYPETEMPLATE_ZIGZAGRIGHT = $(ZigZagRightTemplate),
	   METATYPETEMPLATE_ZIGZAGLEFT = $(ZigZagLeftTemplate),
        METATYPETEMPLATE_Prim_Mot_Connection = $(Prim_Mot_ConnectionTemplate);


    canyonviewDecoratorCore = function () {
    };

    canyonviewDecoratorCore.prototype.$DOMBase = $('<div/>', {class: canyonviewDecoratorClass});


    canyonviewDecoratorCore.prototype._initializeDecorator = function (params) {
        this.$name = undefined;

        this._displayConnectors = false;
        if (params && params.connectors) {
            this._displayConnectors = params.connectors;
        }
    };

    /**** Override from *.WidgetDecoratorBase ****/
    canyonviewDecoratorCore.prototype.getTerritoryQuery = function () {
        return {};
    };


    /**** Override from *.WidgetDecoratorBase ****/
    canyonviewDecoratorCore.prototype.destroy = function () {
    };


    /**** Override from *.WidgetDecoratorBase ****/
    canyonviewDecoratorCore.prototype.doSearch = function (searchDesc) {
        var searchText = searchDesc.toString().toLowerCase(),
            name = this._getName();

        return (name && name.toLowerCase().indexOf(searchText) !== -1);
    };


    canyonviewDecoratorCore.prototype.renderMetaType = function () {
//	   console.log('canyonviewDecoratorCore.prototype.renderMetaType');
        if (this._metaType && this._metaTypeTemplate) {
            this.$el.append(this._metaTypeTemplate);
        } else {
            this.$el.addClass(DEFAULT_CLASS);
            this.$el.append($('<div/>', {class: 'name'}));
        }

        this.$name = this.$el.find('.name');

        if (this._displayConnectors) {
            this.initializeConnectors();
        } else {
            this.$el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS).remove();
        }

        this._renderMetaTypeSpecificParts();
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */
    canyonviewDecoratorCore.prototype._renderMetaTypeSpecificParts = function () {
    };

    canyonviewDecoratorCore.prototype._getName = function () {
        var client = this._control._client,
            nodeObj = client.getNode(this._gmeID),
            name = '(N/A)';

        if (nodeObj) {
            name = nodeObj.getAttribute(nodePropertyNames.Attributes.name) || name;
        }

        return name;
    };


    canyonviewDecoratorCore.prototype._renderContent = function () {
        //render GME-ID in the DOM, for debugging
        this._gmeID = this._metaInfo[CONSTANTS.GME_ID];
        this.$el.attr({'data-id': this._gmeID});

//	   console.log('canyonviewDecoratorCore.prototype._renderContent');

        this._instantiateMetaType();

        this.renderMetaType();

        //find placeholders

        this._update();
    };


    /**** Override from PartBrowserWidgetDecoratorBase ****/
    /**** Override from DiagramDesignerWidgetDecoratorBase ****/
    canyonviewDecoratorCore.prototype.update = function () {
        this._update();

    };

    canyonviewDecoratorCore.prototype._update = function () {
        this._updateName();
        this._updateMetaTypeSpecificParts();
        this._updateColors();
    };

    /* TO BE OVERRIDDEN IN META TYPE SPECIFIC CODE */
    canyonviewDecoratorCore.prototype._updateMetaTypeSpecificParts = function () {
    };

    /***** UPDATE THE NAME OF THE NODE *****/
    canyonviewDecoratorCore.prototype._updateName = function () {
        if (this.$name) {
            this.$name.text(this._getName());
        }
    };


    canyonviewDecoratorCore.prototype._instantiateMetaType = function () {
        var META_TYPES = canyonviewMETA.getMetaTypes();

	   //console.log('canyonviewDecoratorCore.prototype._instantiateMetaType');
        if (META_TYPES) {
	        if (canyonviewMETA.TYPE_INFO.isStraight(this._gmeID)) {
//	            console.log(' - - Straight!');
                this._metaType = META_TYPES.Straight;
                this._metaTypeTemplate = METATYPETEMPLATE_STRAIGHT.clone();
			} else if (canyonviewMETA.TYPE_INFO.isRight(this._gmeID)) {
		        console.log(' - - Right!');
	            this._metaType = META_TYPES.Right;
				this._metaTypeTemplate = METATYPETEMPLATE_RIGHT.clone();
	        } else if (canyonviewMETA.TYPE_INFO.isLeft(this._gmeID)) {
	   console.log(' - - LEft!');
	            this._metaType = META_TYPES.Left;
				this._metaTypeTemplate = METATYPETEMPLATE_LEFT.clone();
	   } else if (canyonviewMETA.TYPE_INFO.isZigZagRight(this._gmeID)) {
	   console.log(' - - ZigZagRight!');
	   this._metaType = META_TYPES.ZigZagRight;
				this._metaTypeTemplate = METATYPETEMPLATE_ZIGZAGRIGHT.clone();
	   } else if (canyonviewMETA.TYPE_INFO.isZigZagLeft(this._gmeID)) {
	   console.log(' - - ZigZagLEft!');
	   this._metaType = META_TYPES.ZigZagLeft;
				this._metaTypeTemplate = METATYPETEMPLATE_ZIGZAGLEFT.clone();
	   } else if (canyonviewMETA.TYPE_INFO.isPrim_Mot_Connection(this._gmeID)) {
//	            console.log(' - - Prim_Mot_Connection!');
                this._metaType = META_TYPES.Prim_Mot_Connection;
                this._metaTypeTemplate = METATYPETEMPLATE_Prim_Mot_Connection.clone();
                _.extend(this, new Prim_Mot_Connection());
	         } else {
//				console.log( ' - - unknown: ' + this._gmeID);
	         }

//	   if(this._metaTypeTemplate) {
//		    console.log(' - - Template success!');
//
//	   } else {
//		    console.log(' - - Template FAILED!');
//	   }
        }
    };


    canyonviewDecoratorCore.prototype._updateColors = function () {
        var el;
        this._getNodeColorsFromRegistry();

//	   console.log('canyonviewDecoratorCore.prototype._updateColors');

        if (this.fillColor && this._metaTypeTemplate) {
			if (canyonviewMETA.TYPE_INFO.isStraight(this._gmeID)) {
//	    console.log(' - - filling with color:' + this.fillColor);
                this._metaTypeTemplate.css({'background-color': this.fillColor});
            } else if (canyonviewMETA.TYPE_INFO.isPrim_Mot_Connection(this._gmeID)) {
                // Do nothing
            }
        }

        if (this.borderColor && this._metaTypeTemplate) {
//            if (canyonviewMETA.TYPE_INFO.isInitial(this._gmeID)) {
//                // Do nothing
//            } else if (canyonviewMETA.TYPE_INFO.isEnd(this._gmeID)) {
//                el = this._metaTypeTemplate.find('.icon');
//                if (el) {
//                    el.css({'background-color': this.borderColor});
//                }
//            } else {

//	   console.log(' - - border color:' + this.borderColor);
                this._metaTypeTemplate.css({'border-color': this.borderColor});
//            }
        }

        if (this.textColor) {
		this.$el.css({color: this.textColor});
//		console.log(' - - text color:' + this.textColor);
        } else {
            this.$el.css({color: ''});
        }
    };

    canyonviewDecoratorCore.prototype._getNodeColorsFromRegistry = function () {
        var objID = this._metaInfo[CONSTANTS.GME_ID];
        this.fillColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.COLOR, true);
        this.borderColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.BORDER_COLOR, true);
        this.textColor = this.preferencesHelper.getRegistry(objID, REGISTRY_KEYS.TEXT_COLOR, true);
    };


    return canyonviewDecoratorCore;
});
