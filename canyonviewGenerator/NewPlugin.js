/*globals define*/
/*jshint node:true, browser:true*/

/**
 * Generated by PluginGenerator 0.14.0 from webgme on Tue Apr 05 2016 10:31:11 GMT-0700 (MST).
 */

define([
		'plugin/PluginConfig',
		'plugin/PluginBase',
		'common/util/ejs',
		'common/util/xmljsonconverter',
		'plugin/NewPlugin/NewPlugin/meta',
		'plugin/NewPlugin/NewPlugin/templates/Templates',
		'q'
], function (
		PluginConfig,
		PluginBase,
		ejs,
    	Converter,
		MetaTypes,
	    TEMPLATES,
		Q) {
	   'use strict';

	   /**
	 * Initializes a new instance of NewPlugin.
	 * @class
	 * @augments {PluginBase}
	 * @classdesc This class represents the plugin NewPlugin.
	 * @constructor
	 */
	   var NewPlugin = function () {
	   // Call base class' constructor.
	   PluginBase.call(this);
	   this.metaTypes = MetaTypes;

	   this.LANGUAGES = [
						 {
						 name: 'C++',
						 generated: 'c++.generated.cpp.ejs',
						 batFile: 'c++.bat.ejs',
						 static: 'c++.simulator.cpp.ejs',
						 fileExtension: 'cpp'
						 },{
						 name: 'Path',
						 generated: 'path.generated.txt.ejs',
						 static: 'path.simulator.txt.ejs',
						 fileExtension: 'txt'
						 }
		];

	   };

	   // Prototypal inheritance from PluginBase.
	   NewPlugin.prototype = Object.create(PluginBase.prototype);
	   NewPlugin.prototype.constructor = NewPlugin;

	   /**
	 * Gets the name of the NewPlugin.
	 * @returns {string} The name of the plugin.
	 * @public
	 */
	   NewPlugin.prototype.getName = function () {
	   return 'New Plugin';
	   };

	   /**
	 * Gets the semantic version (semver.org) of the NewPlugin.
	 * @returns {string} The version of the plugin.
	 * @public
	 */
	   NewPlugin.prototype.getVersion = function () {
	   return '0.1.0';
	   };

	   /**
	 * Gets the configuration structure for the NewPlugin.
	 * The ConfigurationStructure defines the configuration for the plugin
	 * and will be used to populate the GUI when invoking the plugin from webGME.
	 * @returns {object} The version of the plugin.
	 * @public
	 */
	   NewPlugin.prototype.getConfigStructure = function () {
	   return [];
	   /*return [
			   {
			   name: 'species',
			   displayName: 'Animal Species',
			   regex: '^[a-zA-Z]+$',
			   regexMessage: 'Name can only contain English characters!',
			   description: 'Which species does the animal belong to.',
			   value: 'Horse',
			   valueType: 'string',
			   readOnly: false
			   },
			   {
			   name: 'age',
			   displayName: 'Age',
			   description: 'How old is the animal.',
			   value: 3,
			   valueType: 'number',
			   minValue: 0,
			   maxValue: 10000,
			   readOnly: false
			   },
			   {
			   name: 'carnivore',
			   displayName: 'Carnivore',
			   description: 'Does the animal eat other animals?',
			   value: false,
			   valueType: 'boolean',
			   readOnly: false
			   },
			   {
			   name: 'classification',
			   displayName: 'Classification',
			   description: '',
			   value: 'Vertebrates',
			   valueType: 'string',
			   valueItems: [
							'Vertebrates',
							'Invertebrates',
							'Unknown'
							]
			   },
			   {
			   name: 'color',
			   displayName: 'Color',
			   description: 'The hex color code for the animal.',
			   readOnly: false,
			   value: '#FF0000',
			   regex: '^#([A-Fa-f0-9]{6})$',
			   valueType: 'string'
			   },
			   {
			   name: 'anAsset',
			   displayName: 'Document',
			   description: '',
			   value: '',
			   valueType: 'asset',
			   readOnly: false
			   }
			   ];*/
	   };

	   NewPlugin.prototype.printStructure = function (object, level) {
	   var self = this,
	   i,
	   key,
	   child;

	   console.log('Called the method!');

	   for (key in object) {
	   var str = ' ';
	   for(i = 0; i < level; i += 1) {
	   str = str + '- ';
	   }
	   console.log( str + key);

	   if(level < 30) {
	   console.log( str + 'Iterating over:' + Object.keys(object['children']));
	   for (child in object['children']) {S
				this.printStructure( object['children'][child], level+1);
	   }
	   }
	   }
	   };

	NewPlugin.prototype.getMotionData = function(PrimitiveMotionNode) {
		var self = this,
			deferred = new Q.defer(),
	   		motionData = {
				id: self.core.getPath(PrimitiveMotionNode),
	   			name: self.core.getAttribute(PrimitiveMotionNode, 'name'),
	            isStart: false,
	   			//distance: self.core.getAttribute(PrimitiveMotionNode, 'Distance'),
				velocity: self.core.getAttribute(PrimitiveMotionNode, 'Velocity'),
				PrimitiveMotionConnections: [
					 // event: <string>
					 // targetId: <nodePathStr>
					 ]
				},
			error,
			counter;

	   function atDestinationMotion(connection) {

	   		return function (err, dstMotion) {
	   			console.log('In atDestinationMotion(connection), length = ' + motionData.PrimitiveMotionConnections.length);
	   			if (err) {
	   				error = new Error(err);
	   			} else {
	   if(motionData.PrimitiveMotionConnections.length >= 1) {

	   self.logger.error('Multiple Incoming connections: ' + motionData.PrimitiveMotionConnections.length);
	   deferred.reject(new Error('Multiple Incoming connections: ' + motionData.PrimitiveMotionConnections.length));
	   return;
	   }

	   				motionData.PrimitiveMotionConnections.push({
//											distance: self.core.getAttribute(connection, 'Distance'),
//											velocity: self.core.getAttribute(connection, 'Velocity'),
											targetId: self.core.getPath(dstMotion),
											targetName: self.core.getAttribute(dstMotion, 'name'),
									  });
	   			}

		   		counter -= 1;
		   		if (counter === 0) {
		   			if (error) {
		   				deferred.reject(error);
		   			} else {
		   				deferred.resolve(motionData);
		   			}
		   		}
	   		}
	   }

		if (self.isMetaTypeOf(PrimitiveMotionNode, self.META.Straight) === true) {
	   		console.log('STRAIGHT!!!!');
			motionData.Type = 1;
	        motionData.RadOfCurvature = 0;
	   		motionData.Distance = self.core.getAttribute(PrimitiveMotionNode, 'Distance');
	        motionData.FinalTurnAngle = 0;
	   } else if (self.isMetaTypeOf(PrimitiveMotionNode, self.META.Right) === true) {
	        motionData.Type = 3;
	        motionData.RadOfCurvature = self.core.getAttribute(PrimitiveMotionNode, 'RadOfCurvature');
	        motionData.Distance = 0;
			motionData.FinalTurnAngle = self.core.getAttribute(PrimitiveMotionNode, 'FinalTurnAngle');
	   } else if (self.isMetaTypeOf(PrimitiveMotionNode, self.META.Left) === true) {
	        motionData.Type = 2;
	        motionData.RadOfCurvature = self.core.getAttribute(PrimitiveMotionNode, 'RadOfCurvature');
	        motionData.Distance = 0;
	        motionData.FinalTurnAngle = self.core.getAttribute(PrimitiveMotionNode, 'FinalTurnAngle');
	   }

	   // Load all connections going out from the stateNode, i.e. has the stateNode as 'src'.
	   self.core.loadCollection(PrimitiveMotionNode, 'src', function (err, connections) {
			if (err) {
				deferred.reject(new Error(err));
				return;
			}
			var i;
			counter = connections.length;

			if(connections.length > 1) {
								self.logger.error('Multiple outgoing connections: ' + connections.length);
								deferred.reject(new Error('Multiple outgoing connections: ' + connections.length));
								return;
								}

		// For each connection load the destination state.
			for (i = 0; i < connections.length; i += 1) {
				self.core.loadPointer(connections[i], 'dst', atDestinationMotion(connections[i]));
			}

			// Make sure to resolve when there are no connections.
								if (connections.length === 0) {
								deferred.resolve(motionData);
								}
        });

	   // Load all connections going out from the stateNode, i.e. has the stateNode as 'src'.
	   self.core.loadCollection(PrimitiveMotionNode, 'dst', function (err, connections) {
	         if (err) {
								deferred.reject(new Error(err));
								return;
			}
			if(connections.length > 1) {
								self.logger.error('Multiple incoming connections: ' + connections.length);
								deferred.reject(new Error('Multiple incoming connections: ' + connections.length));
								return;
			} else if(connections.length == 0) {
			       console.log('Found the starting motion: ' + self.core.getPath(PrimitiveMotionNode));
								motionData.isStart = true;
			}
		 });

	   return deferred.promise;

	};

	NewPlugin.prototype.generateDataModel = function (pathNode) {
	   var self = this,
		deferred = new Q.defer(),
		dataModel = {
			pathModel: {
				name: self.core.getAttribute(pathNode, 'name'),
				//initialState: null,
				//finalStates: [],
	   startX: self.core.getAttribute(pathNode, 'startX'),
	   startY: self.core.getAttribute(pathNode, 'startY'),
	   startDirection: self.core.getAttribute(pathNode, 'startDirection'),
	   endX: self.core.getAttribute(pathNode, 'endX'),
	   endY: self.core.getAttribute(pathNode, 'endY'),
	   endDirection: self.core.getAttribute(pathNode, 'endDirection'),
				motion: [
					 //id: <nodePathStr>
					//name: <string>
					//events: []
					]
	   		}
	   };

	   console.log('generateDataModel : Path name = ' + dataModel.pathModel.name);

	   self.core.loadChildren(pathNode, function (err, children) {
							  console.log('self.core.loadChildren(pathNode, function (err, children) {}');
			if (err) {
				deferred.reject(new Error(err));
					return;
			}

			var primitivePromises = [],
							  i,
							  metaType;

			for (i = 0; i < children.length; i += 1) {
				if (self.isMetaTypeOf(children[i], self.META.PrimitiveMotion) === true) {
					//console.log(' - Found primitive motion!');
					primitivePromises.push(self.getMotionData(children[i]));
					metaType = self.core.getAttribute(self.getMetaType(children[i]), 'name');

					//console.log(' - metaType = ' + metaType);
				}
			}

			Q.all(primitivePromises)
				.then(function (primitiveData) {
					  console.log('Q.all(primitivePromises).then(function (primitiveData){}');
					dataModel.pathModel.motion = primitiveData;
					deferred.resolve(dataModel);
				})
				.catch(deferred.reject);

		});

	   console.log('generateDataModel :dataModel: ' + JSON.stringify(dataModel, null, 4));

	   return deferred.promise;
	};

	NewPlugin.prototype.addXmlMotionModel = function (filesToAdd, dataModel) {
		var self = this,
			taggedDataModel = {
				pathModel: {
	   				'@name': dataModel.pathModel.name,
	   				//'@initialState': dataModel.pathModel.initialState,
	   				//'@finalStates': dataModel.pathModel.finalStates.join(' '),
	   				motion: []
	   			}
	   		},
	   		jsonToXml = new Converter.JsonToXml();

		dataModel.pathModel.motion.forEach(function (motion) {
			var taggedState = {
				'@id': motion.id,
				'@name': motion.name,
				'@Velocity': motion.Velocity,
				PrimitiveMotionConnections: []
            };
            motion.PrimitiveMotionConnections.forEach(function (transition) {
									  taggedState.PrimitiveMotionConnections.push({
																  //'@event': transition.event,
																  '@targetId': transition.targetId,
																  '@targetName': transition.targetName
																  });
									  });
            taggedDataModel.pathModel.motion.push(taggedState);
											 });

	   filesToAdd['motionModel.xml'] = jsonToXml.convertToString(taggedDataModel);
    };

	   NewPlugin.prototype.numberToLetter = function (theNumber) {
	   switch(theNumber) {
	   	case 0:
	   		return "A";
		case 1:
			return "B";
	   	case 2:
	   		return "C";
	   	case 3:
	   		return "D";
	   }
	   return "unknown";
	   };
	   NewPlugin.prototype.letterToNumber = function (theLetter) {
	   switch(theLetter) {
		case "A":
	   		return 0;
	   	case "B":
	   		return 1;
	   case "C":
	   		return 2;
	   case "D":
	   		return 3;
	   }
	   return -999;
	   };

	NewPlugin.prototype.addLanguageToFiles = function (filesToAdd, dataModel, languageInfo) {
	   var 	genFileName = 'GeneratedCode/' + languageInfo.name + '/' + dataModel.pathModel.name + '.' + languageInfo.fileExtension;//,
			//batFileName = 'FSM-GeneratedCode/' + languageInfo.name + '/execute.bat';

	   this.logger.debug(genFileName);
	//   this.logger.debug(batFileName);

	   filesToAdd[genFileName] = ejs.render(TEMPLATES[languageInfo.generated], dataModel);
	  // filesToAdd[batFileName] = ejs.render(TEMPLATES[languageInfo.batFile], dataModel);

	   //TODO Add the static files too.
	   this.logger.info('Generated files for', languageInfo.name);

    };

	   NewPlugin.prototype.generateArtifact = function (dataModel) {
	   		var self = this,
	   			filesToAdd = {},
	   			deferred = new Q.defer(),
	   			jsonToXml = new Converter.JsonToXml(),
	   			artifact = self.blobClient.createArtifact('GeneratedFiles');

			console.log('generateArtifact:' + JSON.stringify(dataModel, null, 2));

		   	filesToAdd['motionModel.json'] = JSON.stringify(dataModel, null, 2);
	   		filesToAdd['metadata.json'] = JSON.stringify({
													projectId: self.projectId,
													commitHash: self.commitHash,
													branchName: self.branchName,
													timeStamp: (new Date()).toISOString(),
													pluginVersion: self.getVersion()
													}, null, 2);
	   	//self.addXmlMotionModel(filesToAdd, dataModel);	// TODO: add

	   self.LANGUAGES.forEach(function (languageInfo) {
			self.addLanguageToFiles(filesToAdd, dataModel, languageInfo);	// TODO: add
		});


	   artifact.addFiles(filesToAdd, function (err) {
			if (err) {
				deferred.reject(new Error(err));
				return;
			}
			self.blobClient.saveAllArtifacts(function (err, hashes) {
				if (err) {
					deferred.reject(new Error(err));
					return;
				}

				self.result.addArtifact(hashes[0]);
				deferred.resolve();
			});
		});

	   return deferred.promise;
	   };


	NewPlugin.prototype.modelCheck = function (dModel) {
	   	var self = this,
	   		motion = {},
	   		dataModel = dModel,
	   		pathModel = dModel.pathModel,
	   		haveMotion = false,
	   		deferred = new Q.defer(),
	   		i,
	   		count = 1,
	   		currentX,
	   		currentY,
	   		expectedX,
	   		expectedY,
	   		currentDirection = pathModel.startDirection;

	   // Convert the calues to what the class expects:
	   currentX = self.letterToNumber(pathModel.startX);
	   if(currentX < 0) {
	   		deferred.reject(new Error('Unknown startX = ' + pathModel.startX));
	   		return deferred.promise;
	   }
	   currentY = 4 - pathModel.startY;
	   expectedX = self.letterToNumber(pathModel.endX);
	   if(currentX < 0) {
		   	deferred.reject(new Error('Unknown endX = ' + pathModel.endX));
			return deferred.promise;
	   }
	   expectedY = 4 - pathModel.endY;

		   for (i = 0; i < pathModel.motion.length; i += 1) {
		      if(pathModel.motion[i].isStart) {
			     motion = pathModel.motion[i];
		         haveMotion = true;
		         break;
		      }
		   }

		   while(haveMotion) {
				//console.log('Have a motion: ' + JSON.stringify(motion, null, 4));
		   		//console.log(' - PrimitiveMotionConnections: ' + JSON.stringify(motion.PrimitiveMotionConnections, null, 4));
		   var priorPosition = '(' + currentX + ',' + currentY + ') : ' + currentDirection
		   switch(motion.Type) {
	   		case 1:	// Straight
				//currentDirection = currentDirection;	// won't change
	   			switch(currentDirection) {
					case "E":
	   					currentX += 1;
	   					break;
	   				case "W":
						currentX -= 1;
						break;
					case "N":
	   					currentY += 1;
	   					break;
					case "S":
	   					currentY -= 1;
	   					break;
	   				default:
	   					deferred.reject(new Error('Unknown direction!'));
	   					return deferred.promise;
	   			}
				break;
	   		case 2:	// Left
	  		 switch(currentDirection) {
				case "E":
	   				currentX += 1;
					currentY += 1;
					currentDirection = "N";
	   				break;
	   			case "W":
	   				currentX -= 1;
	   				currentY -= 1;
	   				currentDirection = "S";
	   				break;
	   			case "N":
	   				currentX -= 1;
	   				currentY += 1;
	   				currentDirection = "W";
	   				break;
	   			case "S":
	   				currentX += 1;
	   				currentY -= 1;
	   				currentDirection = "E";
	   				break;
	   			default:
	   				deferred.reject(new Error('Unknown direction!'));
	   				return deferred.promise;
	   		}
	   		break;
	   		case 3:	// Right
	  		 switch(currentDirection) {
	  		 	case "E":
	   				currentX += 1;
	   				currentY -= 1;
	   				currentDirection = "S";
	   				break;
	   			case "W":
	   				currentX -= 1;
	   				currentY += 1;
	   				currentDirection = "N";
	   				break;
	   			case "N":
	   				currentX += 1;
	   				currentY += 1;
	   				currentDirection = "E";
	   				break;
	   			case "S":
	   				currentX -= 1;
	   				currentY -= 1;
	   				currentDirection = "W";
	   				break;
	   			default:
	   				deferred.reject(new Error('Unknown direction!'));
					return deferred.promise;
				}
	   			break;
	   		default:
	   			deferred.reject(new Error('Unknown motion!'));
	   			return deferred.promise;
	   }

	   console.log( priorPosition + ' [' + motion.Type + ']-> (' + currentX + ',' + currentY + ') : ' + currentDirection);

	   if(currentX < 0) {
	   		deferred.reject(new Error('Out of bounds on motion #' + count + ', too far West!'));
	   		return deferred.promise;
	   } else if(currentX > 3) {
			deferred.reject(new Error('Out of bounds on motion #' + count + ', too far East!'));
	   		return deferred.promise;
	   }
	   if(currentY < 0) {
	   		deferred.reject(new Error('Out of bounds on motion #' + count + ', too far South!'));
	   		return deferred.promise;
	   } else if(currentY > 3) {
	   		deferred.reject(new Error('Out of bounds on motion #' + count + ', too far North!'));
	   		return deferred.promise;
	   }
	   		haveMotion = false;
	   count += 1;
	   		if( motion.PrimitiveMotionConnections.length != 0) {
	   			console.log('There exists an outgoing connection');

	   			for (i = 0; i < pathModel.motion.length; i += 1) {
	   				if(pathModel.motion[i].id === motion.PrimitiveMotionConnections[0].targetId) {
	   					haveMotion = true;
						motion = pathModel.motion[i];
						break;
					}
				}
			}
	   }


	   if(expectedX != currentX ||
		  expectedY != currentY ||
		  pathModel.endDirection !== currentDirection) {
	   		var errorString = 'Expected end at: ' + self.numberToLetter(expectedX) + (4 - expectedY) + ' facing ' + pathModel.endDirection;
	   		errorString += ', Actually ended at: ' + self.numberToLetter(currentX) + (4 - currentY) + ' facing ' + currentDirection;
	   		errorString += ', The start is: ' + pathModel.startX + pathModel.startY + ' facing ' + pathModel.startDirection;

	   		console.log('Model check Failed');
	   		deferred.reject(new Error('The end was not reached from the start! ' + errorString));
	   		return deferred.promise;
	   }

	   	deferred.resolve(dataModel);

		return deferred.promise;
	   };
	   /**
	 * Main function for the plugin to execute. This will perform the execution.
	 * Notes:
	 * - Always log with the provided logger.[error,warning,info,debug].
	 * - Do NOT put any user interaction logic UI, etc. inside this method.
	 * - callback always has to be called even if error happened.
	 *
	 * @param {function(string, plugin.PluginResult)} callback - the result callback
	 */
	   NewPlugin.prototype.main = function (callback) {
	   // Use self to access core, project, result, logger etc from PluginBase.
	   // These are all instantiated at this point.
	   var self = this,
	   i,
	   child,
	   child2,
	   deferred = new Q.defer(),
	   names = Object.keys(self.META),
	   nodeObject;

	   self.updateMETA(self.metaTypes);

	   console.log('self.core.getPath(self.activeNode) = ' + self.core.getPath(self.activeNode));
	   if (self.core.getPath(self.activeNode) === '' ||
			self.core.getAttribute(self.getMetaType(self.activeNode), 'name') !== 'Path') {
	   		//self.createMessage(self.activeNode, 'Active node is not a "UMLStateMachine".', 'error');
	   		callback(new Error('Active node is not a "Path".'), self.result);
	   		console.log('Selected Meta name: ' + self.core.getAttribute(self.getMetaType(self.activeNode), 'name'));
	   		return;
	   }
	   console.log('Selected Meta name: ' + self.core.getAttribute(self.getMetaType(self.activeNode), 'name'));

	   self.generateDataModel(self.activeNode)
			.then(function (dataModel) {
				  self.logger.info(JSON.stringify(dataModel, null, 4));
				  console.log('generateDataModel().then(): dataModel: ' + JSON.stringify(dataModel, null, 4));
//				  if(self.modelCheck(dataModel.pathModel) == false) {
//
//					deferred.reject(new Error('Model verification failed'));
//					return;
//				  }
				  return self.modelCheck(dataModel);//self.generateArtifact(dataModel);
			})
			.then(function (dataModel) {
				console.log('generating artifacts!');
				return self.generateArtifact(dataModel);
			})
			.then(function () {
				//  console.log('generateDataModel().then().then(): dataModel: ' + JSON.stringify(dataModel, null, 4));
				  console.log('In success part');
				self.result.setSuccess(true);
				callback(null, self.result);
			})
	   		.catch(function (err) {

				   console.log('generateDataModel().then().then().catch() ERROR');
				self.logger.error(err);
				self.createMessage(null, err.message, 'error');
				self.result.setSuccess(false);
				callback(null, self.result);
			})
	   		.done();



	   // Using the logger.
	   self.logger.debug('This is a debug message.');
	   self.logger.info('This is an info message.');
	   self.logger.warn('This is a warning message.');
	   //self.logger.error('This is an error message.');

	   //	var keys = 'keys: ';
	   //	var keyKeys = 'keyKeys: ';
	   //	//for ( n in names ) {
	   //	//	keys = keys + names[i] + ', ';
	   //	//}
	   //	for (i = 0; i < names.length; i += 1) {
	   //		 keys = keys + names[i] + ', ';
	   //
	   //		keyKeys = keyKeys + names[i] + ':' + Object.keys(self.META[names[i]]) + ', ';
	   //
	   //		console.log(names[i] + ': ');
	   //		for( child in self.META[names[i]] ) {
	   //			console.log(' - ' + child + ':' + self.META[names[i]][child] );
	   //		}
	   //
	   //		 for (child in self.META[names[i]]['children']) {
	   //			console.log(' - ' + child + ':' + Object.keys(self.META[names[i]]['children'][child]));
	   //			for( child2 in self.META[names[i]]['children'][child] ) {
	   //				console.log(' - - ' + child2 + ':' + self.META[names[i]]['children'][child][child2] );
	   //			}
	   //		}
	   //		  }
	   //console.log(keys);
	   //console.log(keyKeys);

	   console.log('branchName:' + self.branchName);
	   console.log('commitHash:' + self.commitHash);
	   console.log('rootNode:' + self.rootNode);
	   console.log('activeNode:' + self.activeNode);
	   console.log('activeSelection:' + self.activeSelection);
	   console.log('projectName:' + self.projectName);
	   console.log('projectID:' + self.projectID);

	   //this.printStructure(self.META, 0);

	   // Using the coreAPI to make changes.

	   //nodeObject = self.core.createNode({parent: self.rootNode, base: self.META.FCO});
	   //self.core.setAttribute(nodeObject, 'name', 'My new obj');
	   //self.core.setRegistry(nodeObject, 'position', {x: 70, y: 70});


	   // Obtain the current user configuration.
	   var currentConfig = self.getCurrentConfig();
	   //self.logger.error('Current configuration ' + JSON.stringify(currentConfig, null, 4));
	   console.log('Current configuration ' + JSON.stringify(currentConfig, null, 4));

	   // This will save the changes. If you don't want to save;
	   // exclude self.save and call callback directly from this scope.
//	   self.save('New Plugin updated model.', function (err) {
//			if (err) {
//				callback(err, self.result);
//				return;
//			}
//			self.result.setSuccess(true);
//			callback(null, self.result);
//		});

	   };
	   
	   return NewPlugin;
	   });
