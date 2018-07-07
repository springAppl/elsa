const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = {
    webpack: function(config, env) {
        // do stuff with the webpack config...
        config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
        config = rewireLess.withLoaderOptions({
        // modifyVars: { "@primary-color": "#1DA57A" },
        })(config, env);
        return config;
    },
    devServer: function(configFunction) {
        // Return the replacement function for create-react-app to use to generate the Webpack
        // Development Server config. "configFunction" is the function that would normally have
        // been used to generate the Webpack Development server config - you can use it to create
        // a starting configuration to then modify instead of having to create a config from scratch.
        return function(proxy, allowedHost) {
            // Create the default config by calling configFunction with the proxy/allowedHost parameters
            config = configFunction(proxy, allowedHost);
      
            // set port
            config.proxy = {
                "/api": "http://www.jiaogegongren.com"
            };
            // Return your customised Webpack Development Server config.
            return config;
        }
    }
};