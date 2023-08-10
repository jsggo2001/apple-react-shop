import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux"
import { addItem } from './../store.js'

import { Context1 } from './../App.js'

// import styled from "styled-components";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// let NewBtn = styled.button(YellowBtn)`
//   asdasdasdasd
// `;

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

// 이전 방식의 컴포넌트 생명주기 사용
// class Detail2 extends React.Component {
//   componentDidMount() {

//   }
//   componentDidUpdate() {

//   }

//   componentWillUnmount() {

//   }
// }

function Detail(props) {

  let {재고} = useContext(Context1);
  let [count, setCount] = useState(0);
  let [alert, setalert] = useState(true);
  let [num, setNum] = useState("");
  let [탭, 탭변경] = useState(0);
  let dispatch = useDispatch()
  
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched');
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id)
    꺼낸거 = new Set(꺼낸거)
    꺼낸거 = Array.from(꺼낸거)
    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  }, [])

  useEffect(() => {
    if (isNaN(num) == true) {
      window.alert("그러지마세요");
    }
  }, [num]);
  useEffect(() => {
    let a = setTimeout(() => {
      setalert(false);
    }, 2000);
    console.log(2);
    return () => {
      //useEffect가 실행 되기전 실행 하고 싶다 그러면 여기다 정의
      //기존 타이머는 제거 해 주세요(안그러면 재랜더링 할때마다 타이머 계속 생성)
      console.log(1);
      clearTimeout(a);
    };
  }, []); // <-- mount 장착시 1회만 실행 시키고 싶을때 사용

  useEffect(() => {}); // 재렌더링마다 실행하고 싶은 경우 안에 넣기
  useEffect(() => {}, []); // mount시 1회 코드 실행하고 싶으면 사용
  useEffect(() => {}, [count]); // 저 안에 있는 count변수가 변경 될 때마다 코드 실행
  useEffect(() => {
    return () => {
      // unmount시 1회 코드 실행하고 싶으면
    };
  }, []);


  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
      {/* <YellowBtn bg="orange">버튼</YellowBtn> */}
      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>


        {재고[0]}

        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{ 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭}/>
      
    </div>
  );
}

function TabContent({탭}) {

  let [fade, setFade] = useState('')
  let {재고} = useContext(Context1);

  useEffect(() => {
    let a = setTimeout(()=>{ setFade('end') },100)

    return () => {
      clearTimeout(a);
      setFade('')
    }
  },[탭])

  return (<div className={'start ' + fade}>
    { [<div>{재고}내용0</div>,<div>내용1</div>,<div>내용2</div>][탭] }
  </div>)
}

export default Detail;
