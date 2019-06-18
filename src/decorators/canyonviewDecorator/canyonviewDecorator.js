/*globals define, _*/
/*jshint browser: true, camelcase: false*/

/**
 * @author rkereskenyi / https://github.com/rkereskenyi
 */

define([
    'js/Decorators/DecoratorBase',
    './DiagramDesigner/canyonviewDecorator.DiagramDesignerWidget',
    './PartBrowser/canyonviewDecorator.PartBrowserWidget'
], function (DecoratorBase, canyonviewDecoratorDiagramDesignerWidget, canyonviewDecoratorPartBrowserWidget) {

    'use strict';

    var canyonviewDecorator,
        __parent__ = DecoratorBase,
        __parent_proto__ = DecoratorBase.prototype,
        DECORATOR_ID = 'canyonviewDecorator';

    canyonviewDecorator = function (params) {
        var opts = _.extend({loggerName: this.DECORATORID}, params);

        __parent__.apply(this, [opts]);

        this.logger.debug('canyonviewDecorator ctor');
    };

   // _.extend(canyonviewDecorator.prototype, __parent_proto__);
       _.extend(canyonviewDecorator.prototype, DecoratorBase.prototype);
    canyonviewDecorator.prototype.DECORATORID = DECORATOR_ID;

    /*********************** OVERRIDE DecoratorBase MEMBERS **************************/

    canyonviewDecorator.prototype.initializeSupportedWidgetMap = function () {
        this.supportedWidgetMap = {
            DiagramDesigner: canyonviewDecoratorDiagramDesignerWidget,
            PartBrowser: canyonviewDecoratorPartBrowserWidget
        };
    };

    return canyonviewDecorator;
});