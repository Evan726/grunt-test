// 常用插件
// Contrib-jshint--javascript语法错误检查；
// Contrib-watch--实时监控文件变化、调用相应的任务重新执行；
// Contrib-clean--清空文件、文件夹；
// Contrib-uglify--压缩javascript代码
// Contrib-cssmin--压缩css代码
// Contrib-copy--复制文件、文件夹
// Contrib-concat--合并多个文件的代码到一个文件中
// karma--前端自动化测试工具

module.exports = function(grunt) {

  // 任务配置，所有插件的配置信息
  grunt.initConfig({

    // 获取 package.json 的信息
    pkg: grunt.file.readJSON('package.json'),
    //配置 压缩插件
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/test.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    clean: {
      build: {
        src: ["dist/js/","dist/main.html"]
      }
    },
    copy: {
      main: {
        files: [
          //{src: ['path/*'], dest: 'dest/', filter: 'isFile'}, // 复制path目录下的所有文件
          //{src: ['./images/*'], dest: 'dist/'}, // 复制path目录下的所有目录和文件
          {
            flatten: true,
            expand: true,
            src: ['src/images/*'],
            dest: 'dist/images/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['src/index.html'],
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    },

    
    jshint: {
        options: {
            //大括号包裹
            curly: true,
            //对于简单类型，使用===和!==，而不是==和!=
            eqeqeq: true,
            //对于首字母大写的函数（声明的类），强制使用new
            newcap: true,
            //禁用arguments.caller和arguments.callee
            noarg: true,
            //对于属性使用aaa.bbb而不是aaa['bbb']
            sub: true,
            //查找所有未定义变量
            undef: true,
            //查找类似与if(a = 0)这样的代码
            boss: true,
            //指定运行环境为node.js
            node: true
        },
        //具体任务配置
        build: ['src/test.js'],
    }
  });




  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 加载包含 "jshint" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-copy');


  // 默认被执行的任务列表。
  //在终端中输入grunt时需要做什么（注意先后顺序）
  grunt.registerTask('default', ['jshint','uglify','copy']);

};