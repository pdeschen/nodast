var config = {
	listen : 9090,
	upstreams : {
		test : 'localhost:4573'
	},
	routes : {
		'.*' : function() {
			return ('agi://test/');
		},
		'agi://192.168.129.170:9090/' : 'agi://test/'
	}
};

exports.config = config;