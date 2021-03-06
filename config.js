//config.js

/*jshint multistr: true ,node: true*/
"use strict";

var config = {

	ENVIRONMENT 					: process.env.NODE_ENV || 'development',

	/* This is common config that will be loaded first
		After this the enviroment configs will be loaded and will overwrite these settings

		PUT settings here which are common for both envs
	*/
	COMMON 							: {

		WEBSERVER 					: {
			PORT 					: 8889,
		},

		// Queue details
		QUEUE 						: {
			KEY 					: 'elasticsearch',
			EXCHANGE_OPTS 			: {
				NAME                : 'ex_elasticsearch_bulk',
				TYPE                : 'topic',
		        OPTIONS             : {
		            durable         : true,
		            internal        : false,
		            autoDelete      : false,
		        },
			},
		},

	},

	/*
		Environment specific settings
		These will be loaded after common , and will overwrite common settings 

		PUT settings according to the env block
	*/

	'development' : {
		ELASTICSEARCH :{
			URL: 'localhost:9200',
			INDEX: 'catalog',
			TYPE: 'refiner',
			BULK_SIZE: 2,
			BULK_SIZE_MB: 10,
			NUM_SHARDS: 10,
			BULK_CONCURRENCY: 8,
			REQUEST_TIMEOUT: 60000	//milliseconds
		},

		RABBITMQ : {
        	CONNECT_STRING          : 'amqp://guest:guest@localhost:5672?heartbeat=60',
        	RETRY_INTERVAL          : 5000,     // milliseconds
    		PREFETCH_COUNT			: 100,
    		QUEUE_NAME				: 'dump10',
    		EXCHANGE_NAME			: '',
    		EXCHANGE_KEY			: ''
    	},

    	FLAGS:{
    		BULK_DECISION: 'LENGTH',//'LENGTH' or 'MEMORY' supported, length uses ELASTICSEARCH.BULK_SIZE, memory used BULK_SIZE_MB
    		MULTI_INDEX_SUPPORT : true //set this flag to true or false. if true it will pick only the config. If set to false, it will fetch settings from DB
    	},

		INFRA: [{
			host: 'localhost:9200',
			log: false,
			requestTimeout: 120000, //120ms
			index: 'catalog',
			type: 'refiner',
			client: ''
		}, {
			host: 'localhost:9200',
			log: false,
			requestTimeout: 120000, //120ms
			index: 'catalog222',
			type: 'refiner',
			client: ''
		}]

    	/*
  Below is one of the config from config array
  var config = {
    host: 'localhost:9200',
    log: false,
    requestTimeout: 120000,//120ms
    index: 'catalog',
    type: 'refiner',
    client: ''
  }
*/

	}

};

//module.exports = config;


var load = function(){
	var
		env 			= config.ENVIRONMENT,
		loadedConfig 	= config.COMMON;

	//copy superficially , and not deep copy
	Object.keys(config[env]).forEach(function(key) {
		loadedConfig[key] = config[env][key];
	});

	return loadedConfig;
};

module.exports = load();

