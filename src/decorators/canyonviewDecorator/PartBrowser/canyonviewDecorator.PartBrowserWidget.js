/*globals define, _, DEBUG, $*/
/*jshint browser: true*/

/**
 * @author rkereskenyi / https://github.com/rkereskenyi
 */


define([
    'js/Constants',
    'js/NodePropertyNames',
    'js/Widgets/PartBrowser/PartBrowserWidget.DecoratorBase',
    './../Core/canyonviewDecoratorCore',
    './../Core/canyonview.META',
    //'js/Widgets/DiagramDesigner/DiagramDesignerWidget.Constants',
    //'text!../DiagramDesigner/canyonviewDecorator.DiagramDesignerWidget.html',
    //'css!../DiagramDesigner/canyonviewDecorator.DiagramDesignerWidget.css',
    'css!./canyonviewDecorator.PartBrowserWidget.css'
], function (CONSTANTS,
             nodePropertyNames,
             PartBrowserWidgetDecoratorBase,
             canyonviewDecoratorCore,
             canyonviewMETA //,
             //DiagramDesignerWidgetConstants,
             //canyonviewDecoratorDiagramDesignerWidgetTemplate
             ) {

    'use strict';

    var canyonviewDecoratorPartBrowserWidget,
 //       __parent__ = PartBrowserWidgetDecoratorBase,
        DECORATOR_ID = 'canyonviewDecoratorPartBrowserWidget';

    canyonviewDecoratorPartBrowserWidget = function (options) {
        var opts = _.extend({}, options);

//        __parent__.apply(this, [opts]);

        PartBrowserWidgetDecoratorBase.apply(this, [opts]);

        this._initializeDecorator({connectors: false});

        this.logger.debug('canyonviewDecoratorPartBrowserWidget ctor');
    };

    //_.extend(canyonviewDecoratorPartBrowserWidget.prototype, __parent__.prototype);
    //canyonviewDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;

    /************************ INHERITANCE *********************/
    _.extend(canyonviewDecoratorPartBrowserWidget.prototype, PartBrowserWidgetDecoratorBase.prototype);
    _.extend(canyonviewDecoratorPartBrowserWidget.prototype, canyonviewDecoratorCore.prototype);

    //_.extend(canyonviewDecoratorPartBrowserWidget.prototype, __parent__.prototype);
    canyonviewDecoratorPartBrowserWidget.prototype.DECORATORID = DECORATOR_ID;
    /*********************** OVERRIDE DiagramDesignerWidgetDecoratorBase MEMBERS **************************/

    // canyonviewDecoratorPartBrowserWidget.prototype.$DOMBase = (function () {
    //     var el = $(canyonviewDecoratorDiagramDesignerWidgetTemplate);
    //     //use the same HTML template as the canyonviewDecorator.DiagramDesignerWidget
    //     //but remove the connector DOM elements since they are not needed in the PartBrowser
    //     el.find('.' + DiagramDesignerWidgetConstants.CONNECTOR_CLASS).remove();
    //     return el;
    // })();

    canyonviewDecoratorPartBrowserWidget.prototype.beforeAppend = function () {
        this.$el = this.$DOMBase.clone();

        //find name placeholder
        this.skinParts.$name = this.$el.find('.name');

        this._renderContent();
    };

    canyonviewDecoratorPartBrowserWidget.prototype.afterAppend = function () {
    };

    // canyonviewDecoratorPartBrowserWidget.prototype._renderContent = function () {
    //     var client = this._control._client,
    //         nodeObj = client.getNode(this._metaInfo[CONSTANTS.GME_ID]);
    //
    //     //render GME-ID in the DOM, for debugging
    //     if (DEBUG) {
    //         this.$el.attr({'data-id': this._metaInfo[CONSTANTS.GME_ID]});
    //     }
    //
    //     if (nodeObj) {
    //         this.skinParts.$name.text(nodeObj.getAttribute(nodePropertyNames.Attributes.name) || '');
    //     }
    // };
    //
    // canyonviewDecoratorPartBrowserWidget.prototype.update = function () {
    //     this._renderContent();
    // };

    return canyonviewDecoratorPartBrowserWidget;
});
