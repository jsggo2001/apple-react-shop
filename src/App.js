import "./App.css";
import { createContext, useState, useEffect} from "react";
import { Navbar, Nav } from "react-bootstrap";
import data from "./data.js";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";
import Cart from './routes/Cart.js'
import { useQuery } from '@tanstack/react-query'

export let Context1 = createContext();

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  let obj = {name : 'kim'}
  localStorage.setItem('data', JSON.stringify(obj));
  let 꺼낸거 = localStorage.getItem('data')

  console.log(JSON.parse(꺼낸거).name);

  let [shoes, setShose] = useState(data);
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="">
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </Nav.Link>

          <Nav.Link
            onClick={() => {
              navigate("/detail/1");
            }}
          >
            Detail
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          { result.isLoading && '로딩중' }
          { result.error && '에러남' }
          { result.data && result.data.name }
        </Nav>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((결과) => {
                      console.log(결과.data);
                      console.log(shoes)
                      let copy = [...shoes, ...결과.data];
                      setShose(copy);
                      console.log(shoes);
                    })
                    
                    // Promise.all([axios.get('/url1') ,axios.get('/url2')])
                    // .then(()=>{ 

                    // })
                    // 이런식으로 하면 두개의 요청이 성공 했을 때 then 실행 가능
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ 재고 }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="/cart" element={ <Cart/> }/>

      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
