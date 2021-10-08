const ora = require("ora")
//ora版本6之后为es module 不支持require，需要babel，因此使用了低版本
module.exports = (msg) => {
    // 初始化
    const spinner = ora(msg);
// 开始加载动画
    spinner.start();

    return spinner;
}
