module.exports = () => {
  return {
    require: ['./test/helpers/ava.setup.js'],
    ignoredByWatcher: ['!**/*.{js,vue}'],
    babel: true,
    verbose: true,
    color: true
  }
}
