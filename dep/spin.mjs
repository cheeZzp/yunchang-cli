import ora from 'ora'

module.exports = (msg) => {
    // 初始化
    const spinner = ora(msg);
// 开始加载动画
    spinner.start();

    return spinner;
}
