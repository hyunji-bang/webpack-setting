# Webpack
프로젝트의 구조를 분석하고 JS 모듈을 비롯한 관련 리소스들을 찾고 의존성을 조사하여 로더를 이용해서 처리한 후 이를 브라우저에서 이용할 수 있는 번들로 묶고 패킹하주는 모듈 번들러(Module bundler).


## Webpack을 사용하는 이유
> [https://github.com/AriaFallah/WebpackTutorial/tree/master/part1]
- 여러 파일을 하나의 파일로 번들링 해주며 코드를 압축, 최적화할 수 있다. (-> 불필요한 요청횟수를 줄임) 
- npm 패키지를 사용할 수 있다.
- ES6+ 최신 자바스크립트로 작성할 수 있다. (Babel을 이용해서 컴파일)
- LESS/SCSS를 CSS로 변환가능 (Babel의 css-loader style-loader 설치)
- HMR(Hot Module Replacement)을 사용할 수 있다.
- 자바스크립트로 모든 유형의 파일을 포함할 수 있다.



## Create-React-App 를 사용하지 않고 셋팅하기
### Step1. 기본 셋팅
> _2~5번 까지는 순서상관없이 설치가능. 이해를 돕기위해 단계별로 분리한 것_
1. ```npm init```
    - npm 모듈 사용을 위해 초기화 -> package.json이 생성됨.

2. ```npm install --save-dev webpack webpack-cli``` 
    - 웹팩4부터는 webpack-cli를 같이 설치해줘야만, 커맨드라인에서 webpack이란 명령어를 사용가능
    - 입력 후 package.json의 devDependencies에 webpack과 wepack-cli가 설치된것을 볼 수 있음. + node_modules 생성됨.

3. ```npm install --save-dev @babel/core babel-loader```
    - babel-core: 바벨을 사용하기 위한 필수 라이브러리
    - babel-loader: 웹팩에 연결하기 위해 로더를 설치해야 함.
    - webpack 4.x | babel 7.x | babel-loader 8.x 설치 방법.
    - babel 7 버전부터 모든 바벨 패키지들이 @babel이라는 네임스페이스 안에 속하게 됨.
    - 만약 babel 6.x | babel-loader 7.x 로 설치하고 싶다면, ```babel-core babel-loader@7``` 로 입력해야함

4. ```npm install --save-dev @babel/preset-env```
    -  브라우저에 필요한 ecmascript 버전을 자동으로 파악해서 알아서 polyfill을 넣어줍니다. 
    - 버전별로 필요한 기능들을 플러그인들을 모아놓은 셋트. 
    - 기능별로 플러그인들을 개별적으로 설치하려면 번거롭기 때문에, 이 명령어로 프리셋과 플러그인들을 모아서 관리하고 있는 모듈 설치가 가능.
      ```
      //----------package.json
      "devDependencies": {
        "@babel/core": "^7.1.0",
        "@babel/preset-env": "^7.1.0",
        "babel-loader": "^8.0.2",
        "webpack": "^4.19.1",
      }
      ```

5. ```npm install --save-dev @babel/preset-react```
    - React를 사용하고 싶으므로 React의 JSX 구문을 바닐라 JavaScript로 변환하는 데 하나 이상의 구성이 필요하다.
      ```
      //----------package.json
      "devDependencies": {
        "@babel/core": "^7.1.0",
        "@babel/preset-env": "^7.1.0",
        "@babel/preset-react": "^7.0.0",
        "babel-loader": "^8.0.2",
        "webpack": "^4.19.1",
        "webpack-cli": "^3.1.0"
      }
      ```

6. ```npm install css-loader style-loader --save-dev```
    - css-loader와 style-loader를 설치
    - css-loader: 스타일시트를 webpack이 읽어들일 수 있는 자바스크립트 파일로 변환시켜 주는 loader
    - style-loader: 자바스크립트로 변경된 css를 DOM에 추가해주는 loader

6-2.  ```npm install node-sass sass-loader --save-dev```
    - node-sass는 scss를 다를 수 있는 node program이고, sass-loader는 webpack에 필요한 loader이다.
    
7. ```npm install html-webpack-plugin --save-dev```
    - 기본적으로, bundle한 css, js파일들은 html파일에 직접 추가해야하는데 html-webpack-plugin를 사용하면 이 과정을 자동화 가능.

>src 디렉토리를 만들어 index.js 파일을 생성 후 최신 자바스크립트 문법을 작성해본 뒤. 이때 npm run build로 실행해보면 해보면, dist 폴더 내부의 main.js에 트랜스파일링 된 것을 확인 할 수 있다


### Step2. Babel 설정

#### Babel
- 최신 자바스크립트 문법을 사용한 코드를 런타임 환경인 브라우저가 인식하지 못하기 때문에 예전 스타일의 코드로 바꿔주는 컴파일러 (혹자는 트랜스파일라고 하는 것이 더 적합하다 함)
- Node.js 기반의 프론트엔드 도구로, 다양한 작은 모듈들로 구성되어있고 컴파일 하기위해 이 모듈들을 사용함
- 바벨만으로는 변환되지 않기 때문에 preset이라는 추가 node 모듈(패키지)를 설치하여 바벨 변환에 사용함.

 바벨 설정 하는 방법은 여러가지가 있다.
  1. .babelrc 라는 파일명을 만들어 설정하는 방법.
  2. package.json 에서 babel 이란 키로 설정을 추가하는 방법.
     ```
        ...
          "keywords": [],
          "author": "",
          "license": "ISC",
          "babel": {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          },
          "devDependencies": {
          ...
      ```
  3. babel-cli 를 실행하면서 매번 커맨드라인으로 옵션을 줄 수도 있음. (예: ```babel --plugins @babel/plugin-transform-arrow-functions script.js```) 하지만 대부분의 내용은 설정 파일로 저장할 수 있으므로, babel-cli 방법은 추천되지않음. 


##### .babelrc 파일로 생성하기 (1번 방법)
 >설치한 Babel(바벨)을 어플리케이션에 적용하기 위해 Babel(바벨) 설정 파일을 설정하는 것. preset(react, env)과 plugin(class-properties)을 어플리케이션에 적용하기 위한 연결고리. 이 파일 설정만으로 사용할 순 없고, 웹팩에 적용시켜야 함.(webpack.config.js) 
  1. 파일 생성 후 preset이나 plugin을 연결한다. (preset은 여러 플러그인의 모음집)
  2. 프리셋들은 다음과 같이 설정해준다. 앞으로 새로운 스펙은 프리셋 대신 플러그인 형식으로 넣어야 한다
  ```
  //------------- .babelrc
  {
     "presets": ["@babel/preset-env", "@babel/preset-react"],
     "plugins": [
       "@babel/plugin-proposal-class-properties"
     ]
  }
  ```
  - ```@babel/preset-env```
      - babel 7부터는 preset-es2015 같은거 쓰지않고 전부 @babel/preset-env로 통일
      - 이걸 설치하면 babel-preset-latest 라고 불리는 현재 지원 가능한 가장 최신 버전의 프리셋을 사용하고 추가로 프로젝트의 지원 브라우저를 기반으로 폴리필과 필요 트랜스폼 플러그인들을 관리할 수 있는 옵션들을 사용할 수 있음.
      - 타겟 브라우저를 입력하면 알아서 사용자가 환경에 맞춰 최신 EcmaScript를 사용할 수 있게 해주므로 매우 편리하기 때문에 이 설정을 쓰는것이 좋음.
  - ```@babel/preset-react``` 
      - react 환경(jsx)을 위한 프리셋.
      
------------------------------------------------------------------

#### babel-polyfill 
> [https://medium.com/@ljs0705/babel-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-a1d0e6bd021a]

> [https://programmingsummaries.tistory.com/401]

- babel을 사용한다고 자바스크립트 최신 함수를 사용할 수 있는 건 아니다. polyfill은 프로그램이 처음에 시작될 때 현재 브라우저에서 지원하지 않는 함수를 검사해서 각 object의 prototype에 붙여주는 역할을 한다. 즉, babel은 컴파일-타임에 실행되고 babel-polyfill은 런-타임에 실행된다.
- Promise, Map, Set과 같은 새롭게 추가된 전역객체들 같은 경우는 트랜스파일링으로 해결하기 어렵기 때문에 Babel 기반에서는 babel-polyfill이나 babel-plugin-transform-runtime을 사용한다.
  *  ```npm install --save babel-polyfill``` 로 설치
      
      


### Step3. webpack.config.js (웹팩설정)
- 웹팩은 이 하나의 설정 파일로 모든걸 해결한다.
- 이 파일을 통해서 config 객체를 정의하여 module.exports를 통해 외부로 노출시킬 수 있다. 
- 이 파일은 기본적으로 entry, output, module, plugins를 제공한다.
- 웹팩3이라면 config 파일에서 mode랑 optimization을 빼야함.

- mode
  - 웹팩4에서 추가됨. 
  - mode가 development면 개발용, production이면 배포용이며 배포용일 경우, 알아서 최적화가 적용됨 
  
- entry
  - 웹팩이 파일을 읽어들이기 시작하는 부분
  - 웹팩4부터 이 옵션 생략 가능. (생략할 경우 ./src/index.js를 기본으로 봄)
  - app이 객체의 키로 설정되어 있는데 이 부분 이름은 자유롭게 바꿀 수 있음. 키가 app이면 결과물이 app.js로 나오고, zero면 zero.js로 나온다.

- output 
  - 출력 디렉토리와 이름. 
  - bundling 결과물을 어떻게할지를 설정한다. output의 엔트리가 배열이면 차례대로 엔트리가 만들어짐

- module
  - 옵션은 번들링과정에서 진행할 규칙을 정의하는 지점. 
  - test 항목에 정의된 정규식에 매칭되는 파일은 use 항목에 등록된 로더를 통해서 처리하게됨.
  - rules : 로더 등록

- plugin
  - 효과적으로 번들링하기 위한 부가적인 기능. 
  - 로더가 파일단위로 처리하는 반면 플러그인은 번들된 결과물을 처리
   - 압축을 하거나, 핫리로딩을 하나, 파일을 복사하거나 번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도 둥으로 사용할 수 있다. 
   - 사용 전 설치가 필요.

```
module.exports = {
  module: { //옵션은 번들링과정에서 진행할 규칙을 정의하는 지점
      mode: 'development',
      entry: {
        app: '',
      },
      output: { 
        path : __dirname + '/dist',   // 번들 파일의 대상 경로
        filename : 'bundle.js'  // 번들 파일의 이름
        publicPath: '',
      },
      module: {
          rules:[
              {
                  test: /\.css$/, // 확장자가 css인 파일만 인식하도록 설정
                  use: [{
                        loader: 'style-loader'
                      },
                      {
                          loader: 'css-loader',
                          options: {
                              modules: true, //CSS Module 사용
                              camelCase: true, //CamelCase로 CSS를 사용
                              sourceMap: true // Sourcemaps를 사
                          }
                    }] // style로더, css로더로 처리.
              }, {
                  test: /\.(js|jsx)$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader' //웹팩에서 바벨을 연동할 수 있게하는
                  }
              }         
          ]
      },
      plugins: [],
      optimization: {},
      resolve: { // 웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션.
        modules: ['node_modules'], // 여기에 있는 디렉토리로 인식 가능함
        extensions: ['.js', '.json', '.jsx', '.css'],
      },
  }
}
```


## Webpack 4 에서 달라진점
> [https://meetup.toast.com/posts/153]
* 개발 환경에 맞게 기본적으로 설정이 되어 있는 Development 모드와, 프로덕션 환경에 맞게 설정이 되어 있는 Production 모드가 생긴 것이다. (Parcel의 장점인 심플한 사용성을 수용한것으로 보인다)
* 모드가 생겨 일정한 규칙만 지키면 설정 파일(webpack.config.js)이 없이도 빌드가 가능하게 되었다. (0CJS라고 함. Production / Development. 간편하긴 하지만 실무에서는 세부설정이 필요함)
* 빌드 속도가 빨라진다.
* webpack 코어와 webpack-cli 가 분리 배포 된다.




#### Loader
- 웹팩은 자바스크립트 밖에 모르기 때문에, 비 자바스크립트 파일을 웹팩이 이해하게끔 변경해야하는 역할을 로더가 한다.
- css, image, font, ts 와 같은 비 자바스크립트를 자바스크립트로 변환해줌
- Node.js 기반의 유틸리티


## 수정된 파일을 브라우저에서 바로 확인 할 수 있는 방법
Webpack에서는 두 가지 인터페이스를 사용할 수 있다. Webpack-CLI 기본인터페이스와 webpack-dev-server.
  * ```npm install webpack-dev-server --save-dev``` : 포트에서 실행이되며 express(node.js) 서버이며 내부적으로 Webpack을 호출되는데 실시간로딩 (Hot Module Replacement)같은 추가 기능을 사용할 수 있다. 
