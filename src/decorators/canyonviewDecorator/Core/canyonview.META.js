/*globals define, _, WebGMEGlobal*/
/*jshint browser: true*/
/**
 * @author rkereskenyi / https://github.com/rkereskenyi
 */


//TODO does it really work with the fixed paths
define(['underscore'], function (_underscore) {
    'use strict';

	  // console.log('META use strict');

    var META_TYPES = {
	   Straight: 'Straight',
	   Right: 'Right',
	   Left: 'Left',
	   ZigZagRight: 'ZigZagRight',
	   ZigZagLeft: 'ZigZagLeft',
	   Prim_Mot_Connection: 'Prim_Mot_Connection',
    },
        client = WebGMEGlobal.Client;

    function _getMetaTypes() {
	   //console.log('META _getMetaTypes');
        var metaNodes = client.getAllMetaNodes(),
            dictionary = {},
            i,
            name;

        for (i = 0; i < metaNodes.length; i += 1) {
            name = metaNodes[i].getAttribute('name');
            if (META_TYPES[name]) {
                dictionary[name] = metaNodes[i].getId();
            }
        }

        return dictionary;
    }

    //META ASPECT TYPE CHECKING
    var _isStraight = function (objID) {
	  // console.log('META _isStraight');
        return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Straight]);
    };
    var _isRight = function (objID) {
	   //console.log('META _isRight');
	   return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Right]);
    };
    var _isLeft = function (objID) {
	   return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Left]);
    };
    var _isZigZagRight = function (objID) {
	   //console.log('META _isZigZagRight');
	   return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ZigZagRight]);
    };
    var _isZigZagLeft = function (objID) {
	   return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.ZigZagLeft]);
    };
    var _isPrim_Mot_Connection = function (objID) {
	   //console.log('META _isPrim_Mot_Connection');
	   return client.isTypeOf(objID, _getMetaTypes()[META_TYPES.Prim_Mot_Connection]);
    };

    return {
        getMetaTypes: _getMetaTypes,
        TYPE_INFO: {
	   isStraight: _isStraight,
	   isRight: _isRight,
	   isLeft: _isLeft,
	   isZigZagRight: _isZigZagRight,
	   isZigZagLeft: _isZigZagLeft,
	   isPrim_Mot_Connection: _isPrim_Mot_Connection,
        }
    };
});
