module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
				//tasks: ['jshint'],
				options: {
					livereload: true
					
				}
			}
		},
		//jshint: {
			//all: ['Gruntfile.js', 'public/js/**', 'models/**/*.js', 'schemas/**/*.js']
		//},
		
		uglify: {
			development: {
				files: {
					'public/build/admin.min.js': 'public/js/admin.js',
					'public/build/order.min.js': 'public/js/order.js',
					'public/build/detail.min.js': 'public/js/detail.js',
					'public/build/shopcar.min.js': 'public/js/shopcar.js'
				}
			}
		},
		cssmin: {
			compress: {
				files: {
					'public/build/admin.min.css':'public/style/*.css'
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		bootlint: {
			options: {
				relaxerror: [],
				showallerrors: false,
				stoponerrors: false,
				stoponwarning: false
			},
			files: ['public/**']
		},
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			src: ['test/**/*.js']
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.loadNpmTasks('grunt-bootlint')
	grunt.loadNpmTasks('grunt-mocha-test')
	//grunt.loadNpmTasks('grunt-contrib-jshint')

	grunt.option('force', true)
	grunt.registerTask('default', ['uglify','cssmin','concurrent'])
	grunt.registerTask('test', ['mochaTest'])
}
