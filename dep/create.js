// dep/create.js
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')//粉笔，具体颜色配置可查看chalk/readme.md
const inquirer = require('inquirer')
const Generator = require('./generate.js')

module.exports = async function (name, options) {
    // 验证是否正常取到值
    console.log('>>> create.js', name, options)
    // 打印命令行输入的值
    console.log("project name is " + chalk.blue(name))
    // 文本样式
    // console.log("project name is " + chalk.bold(name)yunch)
    // // 颜色

    // // 背景色
    // console.log("project name is " + chalk.bgRed(name))

    // 使用RGB颜色输出
    // console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
    // console.log("project name is " + chalk.hex('#049CDB').bold(name));
    // console.log("project name is " + chalk.bgHex('#049CDB').bold(name))

// 当前命令行选择的目录
    const cwd  = process.cwd();
    // 需要创建的目录地址
    const targetDir  = path.join(cwd, name)
    console.log("targetDir",targetDir)
    console.log("project options is: " , options)
    // 目录是否已经存在？
    if (fs.pathExistsSync(targetDir)) {
        console.log("path")
        // 是否为强制创建？
        if (options.force) {
            await fs.remove(targetDir)
        } else {
            // TODO：询问用户是否确定要覆盖
            console.log(chalk.green("是否需要覆盖？"))
            // 询问用户是否确定要覆盖
            let { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action:',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        },{
                            name: 'Cancel',
                            value: false
                        }
                    ]
                }
            ])

            if (action === 'overwrite') {
                // 移除已存在的目录
                console.log(`\r\nRemoving...`)
                await fs.remove(targetDir)
            }
        }
    }

    // 创建项目
    const generator = new Generator(name, targetDir);

    // 开始创建项目
    await generator.create();

}
