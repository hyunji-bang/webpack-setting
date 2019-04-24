// const path = require('path');

module.exports = {
    // webpack 설정 코드 작성. 작성된 코드는 module.export로 내보냅니다.
    module: { //옵션은 번들링과정에서 진행할 규칙을 정의하는 지점
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: { // 여러개의 로더를 동시에 사용할때 loader대신 use를 씀.
                    loader: 'babel-loader', //웹팩에서 바벨을 연동할 수 있게하는,
                    options: {
                        presets: ['@babel/preset-env', {
                            modules: 'false' // modules를 false로 해야 트리쉐이킹됨
                        }]
                    }
                }
            }, {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
