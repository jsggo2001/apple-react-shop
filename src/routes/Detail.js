import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  let [count, setCount] = useState(0);
  let [alert, setalert] = useState(true);
  let [num, setNum] = useState("");

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

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {/* <YellowBtn bg="blue">버튼</YellowBtn> */}
      {/* <YellowBtn bg="orange">버튼</YellowBtn> */}
      {count}
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
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
