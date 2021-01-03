import React from 'react'
import ReactDOM from 'react-dom'
import App from 'pages/home'
import './index.less'

const render = () => ReactDOM.render(
  <App />,
  document.getElementById('root')
)

render()

if (module.hot) {
  module.hot.accept(() => {
    render()
  });
}
