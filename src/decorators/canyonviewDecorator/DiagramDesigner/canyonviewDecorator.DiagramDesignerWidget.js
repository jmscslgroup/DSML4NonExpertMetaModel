/*globals define, _, $*/
/*jshint browser: true, camelcase: false*/

/**
 * @author rkereskenyi / https://github.com/rkereskenyi
 */

define([
    'js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/DiagramDesigner/DiagramDesignerWidget.DecoratorBase',
    './../Core/canyonviewDecoratorCore',
    './../Core/canyonview.META',
    //'text!./canyonviewDecorator.DiagramDesignerWidget.html',
    'css!./canyonviewDecorator.DiagramDesignerWidget.css'
], function (CONSTANTS,
            nodePropertyNames,
             DiagramDesignerWidgetDecoratorBase,
             //canyonviewDecoratorTemplate,
             canyonviewDecoratorCore,
             canyonviewMETA) {

    'use strict';

    var canyonviewDecoratorDiagramDesignerWidget,
        //__parent__ = DiagramDesignerWidgetDecoratorBase,
        //__parent_proto__ = DiagramDesignerWidgetDecoratorBase.prototype,
        DECORATOR_ID = 'canyonviewDecorator';

    canyonviewDecoratorDiagramDesignerWidget = function (options) {
        var opts = _.extend({}, options);

        //__parent__.apply(this, [opts]);
        DiagramDesignerWidgetDecoratorBase.apply(this, [opts]);

        this._initializeDecorator({connectors: true});

        //this.name = '';

        this.logger.debug('canyonviewDecorator ctor');
    };

	   /************************ INHERITANCE *********************/
    _.extend(canyonviewDecoratorDiagramDesignerWidget.prototype, DiagramDesignerWidgetDecoratorBase.prototype);
    _.extend(canyonviewDecoratorDiagramDesignerWidget.prototype, canyonviewDecoratorCore.prototype);

    //_.extend(canyonviewDecorator.prototype, __parent_proto__);
    //canyonviewDecorator.prototype.DECORATORID = DECORATOR_ID;
    canyonviewDecoratorDiagramDesignerWidget.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DiagramDesignerWidgetDecoratorBase MEMBERS **************************/

    //canyonviewDecorator.prototype.$DOMBase = $(canyonviewDecoratorTemplate);

    canyonviewDecoratorDiagramDesignerWidget.prototype.on_addTo = function () {
        var self = this;

        this._renderContent();
        // this._renderName();
        //
        // // set title editable on double-click
        // this.skinParts.$name.on('dblclick.editOnDblClick', null, function (event) {
        //     if (self.hostDesignerItem.canvas.getIsReadOnlyMode() !== true) {
        //         $(this).editInPlace({
        //             class: '',
        //             onChange: function (oldValue, newValue) {
        //                 self._onNodeTitleChanged(oldValue, newValue);
        //             }
        //         });
        //     }
        //     event.stopPropagation();
        //     event.preventDefault();
        // });

        // set title editable on double-click
        if (this.$name) {
            this.$name.on('dblclick.editOnDblClick', null, function (event) {
                if (self.hostDesignerItem.canvas.getIsReadOnlyMode() !== true) {
                    self.hostDesignerItem.canvas.selectNone();
                    $(this).editInPlace({
                        class: '',
                        onChange: function (oldValue, newValue) {
                            self._onNodeTitleChanged(oldValue, newValue);
                        }
                    });
                }
                event.stopPropagation();
                event.preventDefault();
            });
        }

        //let the parent decorator class do its job first
      //  __parent_proto__.on_addTo.apply(this, arguments);
    };

    // canyonviewDecorator.prototype._renderName = function () {
    //     var client = this._control._client,
    //         nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]);
    //
    //     //render GME-ID in the DOM, for debugging
    //     this.$el.attr({'data-id': this._metaInfo[CONSTANTS.GME_ID]});
    //
    //     if (nodeObj) {
    //         this.name = nodeObj.getAttribute(nodePropertyNames.Attributes.name) || '';
    //     }
    //
    //     //find name placeholder
    //     this.skinParts.$name = this.$el.find('.name');
    //     this.skinParts.$name.text(this.name);
    // };

    /**** Override from DiagramDesignerWidgetDecoratorBase ****/
    canyonviewDecoratorDiagramDesignerWidget.prototype.showSourceConnectors = function (/*params*/) {
        this.$sourceConnectors.appendTo(this.$el.find('> div').first());
    };

    /**** Override from DiagramDesignerWidgetDecoratorBase ****/
    canyonviewDecoratorDiagramDesignerWidget.prototype.showEndConnectors = function (/*params*/) {
        this.$endConnectors.appendTo(this.$el.find('> div').first());
    };

    /**** Override from DiagramDesignerWidgetDecoratorBase ****/
    canyonviewDecoratorDiagramDesignerWidget.prototype.onRenderGetLayoutInfo = function () {
        var META_TYPES = canyonviewMETA.getMetaTypes();

        //let the parent decorator class do its job first
        DiagramDesignerWidgetDecoratorBase.prototype.onRenderGetLayoutInfo.apply(this, arguments);

//	   if (this.$name) {
//	   if (META_TYPES.End &&
//		   META_TYPES.Initial &&
//		   (this._metaType === META_TYPES.End || this._metaType === META_TYPES.Initial)) {
//	   this.renderLayoutInfo.nameWidth = this.$name.outerWidth();
//	   }
//	   }
    };

    /**** Override from DiagramDesignerWidgetDecoratorBase ****/
    canyonviewDecoratorDiagramDesignerWidget.prototype.onRenderSetLayoutInfo = function () {
        var META_TYPES = canyonviewMETA.getMetaTypes();

        if (this.renderLayoutInfo) {
            var shift = this.renderLayoutInfo.nameWidth / -2;

//	   if (this.$name) {
//	   if (META_TYPES.End &&
//		   META_TYPES.Initial &&
//		   (this._metaType === META_TYPES.End || this._metaType === META_TYPES.Initial)) {
//	   this.$name.css({'margin-left': shift});
//	   }
//	   }
        }

        //let the parent decorator class do its job finally
        DiagramDesignerWidgetDecoratorBase.prototype.onRenderSetLayoutInfo.apply(this, arguments);
    };


    // canyonviewDecorator.prototype.update = function () {
    //     var client = this._control._client,
    //         nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]),
    //         newName = '';
    //
    //     if (nodeObj) {
    //         newName = nodeObj.getAttribute(nodePropertyNames.Attributes.name) || '';
    //
    //         if (this.name !== newName) {
    //             this.name = newName;
    //             this.skinParts.$name.text(this.name);
    //         }
    //     }
    // };

    canyonviewDecoratorDiagramDesignerWidget.prototype.getConnectionAreas = function (id /*, isEnd, connectionMetaInfo*/) {
        var result = [],
            edge = 10,
            LEN = 20;

        //by default return the bounding box edge's midpoints

        if (id === undefined || id === this.hostDesignerItem.id) {
            //NORTH
            result.push({
                id: '0',
                x1: edge,
                y1: 0,
                x2: this.hostDesignerItem.getWidth() - edge,
                y2: 0,
                angle1: 270,
                angle2: 270,
                len: LEN
            });

            //EAST
            result.push({
                id: '1',
                x1: this.hostDesignerItem.getWidth(),
                y1: edge,
                x2: this.hostDesignerItem.getWidth(),
                y2: this.hostDesignerItem.getHeight() - edge,
                angle1: 0,
                angle2: 0,
                len: LEN
            });

            //SOUTH
            result.push({
                id: '2',
                x1: edge,
                y1: this.hostDesignerItem.getHeight(),
                x2: this.hostDesignerItem.getWidth() - edge,
                y2: this.hostDesignerItem.getHeight(),
                angle1: 90,
                angle2: 90,
                len: LEN
            });

            //WEST
            result.push({
                id: '3',
                x1: 0,
                y1: edge,
                x2: 0,
                y2: this.hostDesignerItem.getHeight() - edge,
                angle1: 180,
                angle2: 180,
                len: LEN
            });
        }

        return result;
    };

    /**************** EDIT NODE TITLE ************************/

    canyonviewDecoratorDiagramDesignerWidget.prototype._onNodeTitleChanged = function (oldValue, newValue) {
        var client = this._control._client;

        client.setAttribute(this._metaInfo[CONSTANTS.GME_ID], nodePropertyNames.Attributes.name, newValue);
    };

    /**************** END OF - EDIT NODE TITLE ************************/

    // canyonviewDecorator.prototype.doSearch = function (searchDesc) {
    //     var searchText = searchDesc.toString();
    //     if (this.name && this.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
    //         return true;
    //     }
    //
    //     return false;
    // };

    return canyonviewDecoratorDiagramDesignerWidget;
});
