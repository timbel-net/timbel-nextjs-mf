const NextFederationPlugin = require('@module-federation/nextjs-mf')

function federation(name, remotes = [], nextConfig = {}) {
  const beforeFn = nextConfig.webpack
  nextConfig.webpack = (config, options) => {
    if (typeof beforeFn === 'function') beforeFn(config, options)

    const { isServer } = options
    if (!isServer) {
      config.plugins.push(plugin(name, remotes))
    }

    return config
  }

  return nextConfig
}

function plugin(name, remotes) {
  return new NextFederationPlugin({
    name,
    filename: `static/chunks/${name}.js`,
    remotes: remotes.map(({ name, host }) =>
      `${name}@${host}/_next/static/chunks/${name}.js`
    ),
    shared: {
      'react': { singleton: true, requiredVersion: '*' },
      'react-dom': { eager: true, singleton: true, requiredVersion: '*' },
      'react/jsx-runtime': { singleton: true, requiredVersion: '*' },
      '@emotion/react': { singleton: true, requiredVersion: '*' },
      'shared/stores': { singleton: true }
    },
    extraOptions: {
      exposePages: true
    }
  })
}

module.exports = {
  federation
}