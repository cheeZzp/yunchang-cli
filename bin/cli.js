#! /usr/bin/env node
const chalk = require('chalk')//粉笔，具体颜色配置可查看chalk/readme.md
const figlet = require("figlet")
const program = require('commander')//命令行程序对象
//配置创建命令
program
    .version('0.1.0')
    .command('create <name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {

        require('../dep/create.js')(name, options)

    })

// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s, --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config ')
    .action((value, options) => {
        console.log(value, options)
    })

// 配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((option) => {
        console.log(option)
    })

// 配置版本号信息
program
    .version(`v${require('../package.json').version}`)
    .usage(': yunchang <command> [option]')


program
    // 监听 --help 执行
    .on('--help', () => {

        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`yunchang <command> --help`)} 
        for detailed usage of given command\r\n`)

        // 使用 figlet 绘制 Logo
        console.log('\r\n' + figlet.textSync('yunchang', {
            font: 'Big Money-nw',
            horizontalLayout: 'default',
            verticalLayout: 'default',

            whitespaceBreak: true
        }));
    })

program.parse()
