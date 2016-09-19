module.exports = (grunt)->
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		cssmin:
			css:
				options:
					shorthandCompacting: false
					roundingPrecision: -1
				src: ['public/css/*.css', '!public/css/all.css']
				dest: 'public/css/all.css'
				
		babel:
			react:
				options:
					presets: ['react']
				files: [
					expand: true
					cwd: 'public/jsx/'
					src: '**/*.jsx'
					dest: 'public/js/compiled'
					ext: '.js'
				]

		browserify:
			react:
				files:
					'public/js/App.js': 'public/js/compiled/App.js'
		
		uglify:
			minify:
				src: 'public/js/compiled/*.js'
				dest: 'public/js/all.js'
				options:
					bare: true
		
		concat:
			addSource:
				src: ['public/js/source/*.js', 'public/js/all.js']
				dest: 'public/js/all.js'
				options:
					bare: true
			full:
				src: ['public/js/source/*.js', 'public/js/compiled/*.js']
				dest: 'public/js/all.js'
				options:
					bare: true

		clean: ['public/js/compiled']

		watch:
			self:
				files: ['Gruntfile.coffee']
			js:
				files: ['public/**/*.jsx', '!public/js/compiled/*.js', '!public/js/all.js']
				tasks: ['js']
			css:
				files: ['public/css/**/*.css', '!public/css/all.css']
				tasks: ['css']

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-cssmin'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-babel'
	grunt.loadNpmTasks 'grunt-browserify'
	grunt.registerTask 'default', ['cssmin', 'babel', 'browserify', 'clean']
	grunt.registerTask 'js', ['babel', 'browserify', 'clean']
	grunt.registerTask 'css', 'cssmin'