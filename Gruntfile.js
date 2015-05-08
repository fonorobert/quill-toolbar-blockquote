module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			gruntfile: 'Gruntfile.js',
			dev: 'src/js/*.js'
		},

		lesslint: {
			src: 'src/less/*.less'
		},

		concat: {
			dev: {
				src: ['src/js/*.js'],
				dest: 'dev/quill-toolbar-blockquote.js'
			},
			options: {
				'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
				'sourceMap': true
			},
		},

		less: {
			dev: {
				options: {
					'sourceMap': true,
					'sourceMapFilename': 'dev/css/main.css.map',
					'sourceMapURL': '/js-less-boilerplate/dev/css/main.css.map',
					'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files: {
					'dev/quill-toolbar-blockquote.css': ['src/less/import.less']
				}
			},
			build: {
				options: {
					'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
					'compress': true
				},
				files: {
					'build/quill-toolbar-blockquote.min.css': ['src/less/import.less']
				}
			}
		},

		uglify: {
			options: {
				'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
				'mangle': false
			},
			build: {
				files: {
					'build/quill-toolbar-blockquote.min.js': ['src/js/*.js']
				}
			}
		},

		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['jshint:dev', 'concat:dev'],
				options: {
			      livereload: true,
			    }
			},
			gruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['jshint:gruntfile']
			},
			less: {
				files: ['src/less/*.less'],
				tasks: ['lesslint', 'less:dev'],
				options: {
			      livereload: true,
			    }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-lesslint');


	grunt.registerTask('dev', ['jshint:dev', 'lesslint', 'concat:dev', 'less:dev']);
	grunt.registerTask('build', ['jshint:dev', 'uglify:build', 'less:build']);
};
