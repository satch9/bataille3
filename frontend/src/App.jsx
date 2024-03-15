import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import './App.css'
import Home from './components/Home'
import Parametres from './components/Parametres'

const { Header, Content, Footer } = Layout

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
        <Header>
          <div style={{ color: "white" }}>La bataille</div>
        </Header>
        <Content style={{ padding: '0 50px', width: '500px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/params" element={<Parametres />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Bataille - React AntD Socket.IO</Footer>
      </Layout>

    </Router>
  )
}

export default App
