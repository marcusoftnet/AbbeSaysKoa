var mongoProdUri = process.env.MONGOHQ_URL || 'localhost:27017/AbbeSaysKoa_Prod';

var config = {
	local: {
		mode: 'local',
		port: 3000,
		mongoUrl: 'localhost:27017/AbbeSaysKoa_Dev'
	},
	staging: {
		mode: 'staging',
		port: 4000,
		mongoUrl: 'localhost:27017/AbbeSaysKoa_Test'
	},
	prod: {
		mode: 'prod',
		port: process.env.PORT || 5000,
		mongoUrl: mongoProdUri
	}
};

module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};