/*globals define, _*/

/**
 * Generated by DecoratorGenerator
 */

define([
    'js/Decorators/DecoratorBase',
    './DiagramDesigner/CanyonViewDecorator.DiagramDesignerWidget',
    './PartBrowser/CanyonViewDecorator.PartBrowserWidget'
], function (DecoratorBase, CanyonViewDecoratorDiagramDesignerWidget, CanyonViewDecoratorPartBrowserWidget) {

    'use strict';

    var DECORATOR_ID = 'CanyonViewDecorator';

    function CanyonViewDecorator(params) {
        var opts = _.extend({loggerName: this.DECORATORID}, params);

        DecoratorBase.apply(this, [opts]);

        this.logger.debug('CanyonViewDecorator ctor');
    }

    _.extend(CanyonViewDecorator.prototype, DecoratorBase.prototype);
    CanyonViewDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    CanyonViewDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {
            DiagramDesigner: CanyonViewDecoratorDiagramDesignerWidget,
            PartBrowser: CanyonViewDecoratorPartBrowserWidget
        };
    };

    return CanyonViewDecorator;
});
