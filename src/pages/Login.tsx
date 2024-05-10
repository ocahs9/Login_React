import React, { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface LoginPropTypes{
  //만들면서 필요한 것 작성해나갈 예정
}

function Login(props: LoginPropTypes) : JSX.Element
{
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState(""); 
  const [isEmptyId, setIsEmptyId] = useState(false);
  const [isEmptyPw, setIsEmptyPw] = useState(false);
  const idInput = useRef<HTMLInputElement>();
  const pwInput = useRef<HTMLInputElement>();
  const idInputText = useRef<HTMLParagraphElement>();
  const pwInputText = useRef<HTMLParagraphElement>();

  const navigate = useNavigate();

  
  useEffect(()=>{
    console.log(1);
    if(isEmptyId === true){
      alert("id 입력하세요.");
      idInput.current.focus(); //idInput.current는 undefined일 수 있습니다..?
      idInputText.current.value = "";
      //idInputText.current.innerText = "아이디를 입력하세요.";
      //pwInputText.current.innerText = "";

    }
    else if(isEmptyPw){
      alert("pw 입력하세요.");
      pwInput.current.focus();
      pwInputText.current.value = "";
      //pwInputText.current.innerText = "비밀번호를 입력하세요.";
      //idInputText.current.innerText = "";

    }
  },[isEmptyId, isEmptyPw])
  


  function handleSubmitForm(e:React.FormEvent) //제출을 할 시, API 요청으로 정보 입력하고 받아오는 과정 
  {
    e.preventDefault();
    console.log(2);

    const fetchData = async() => {
      if(userId === "")
      {
        setIsEmptyId(true);
        setTimeout(()=>setIsEmptyId(false),500); //이걸 해줘야만, 계속 경고문구가 뜨게 할 수 있다.
        console.log(3);
      }
      else if(userPw ==="")
      {
        setIsEmptyPw(true);
        setTimeout(()=>setIsEmptyPw(false),500);
        console.log(4);
      }
      else
      {
        console.log(5);
        try {
          console.log(6);
          const data = await axios.post(`http://34.64.233.12:8080/member/login`
          ,{
            authenticationId : userId,
            password : userPw 
          }
          );
          const memberId = data.headers.location;
          console.log(data);
          alert(data.data.message);
          navigate(`/main/${memberId}`); //위에서 정상적으로 성공했다면 navigate됨(아니라면 바로 catch로 넘어갈거임)
        }
        catch(error:any){ //만약 틀려먹었을 경우, 에러 객체를 던져줌. (그걸 콘솔에 찍어보고, 필요한 데이터를 뽑아내면 됨)
          //console.log(error);
          //console.log(error.response.status);
          //console.log(error.response.data.message);
          alert(error.response.data.message);

          //그리고 내용들 지워버림
          idInput.current.value = ""; 
          pwInput.current.value = "";
          setUserId("");
          setUserPw("");
        }
        
      }
      
    }
    fetchData();
        
      
  }

  function handleChangeIdInput(e: React.ChangeEvent<HTMLInputElement>)
  {
    setUserId((prev)=>e.target.value);
    console.log(userId);
  }

  function handleChangePwInput(e: React.ChangeEvent<HTMLInputElement>)
  {
    setUserPw((prev)=>e.target.value);
    console.log(userPw);
  }

  function handleClickBtn(){
    navigate("/signup");
  }
  

  return (
    <LoginPage>
      <SignUpWrapper>
        <LoginHeader>
          <h1>Login</h1>
          <FontAwesomeIcon icon={faRightToBracket} fontSize={`4rem`} fade/> {/*individual import를 잘 살피기! 추가로 공식 문서 잘 읽기) https://docs.fontawesome.com/web/style/size */}
        </LoginHeader>
        <LoginForm onSubmit={handleSubmitForm}>
          <LoginLogic>
            <IdInput ref={idInput} onChange={handleChangeIdInput}  type="text" placeholder="Id 입력해주세요" required/>
            <Styledp ref={idInputText}></Styledp>
            <PwInput ref={pwInput} type="password" onChange={handleChangePwInput} type="text" placeholder="Pw 입력해주세요" required/>
            <Styledp ref={pwInputText}></Styledp>
          </LoginLogic>
        </LoginForm>
        <BtnWrapper>
          <LoginBtn onClick={handleSubmitForm}>로그인</LoginBtn> 
          <SignUpBtn onClick={handleClickBtn}>회원가입</SignUpBtn>
        </BtnWrapper>
      </SignUpWrapper>
    </LoginPage>
  );
}

export default Login;


const SignUpWrapper = styled.div`
position: relative;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 30vw;
height: 70vh;
background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);

`;

const LoginLogic = styled.div`
  position: absolute;
  bottom: 10rem;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginHeader = styled.header`
  position: absolute;
  top: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem; //간단하게 아이템간의 거리(갭) 퉁쳐버림

  & > h1{
    font-size: 4rem;
  }
`;



const LoginForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  

`;

const LoginPage = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
`;

const IdInput = styled.input`
  width: 15rem;
  height: 5rem;
  margin: 1rem;

  &:focus{
    outline: none;
    border: 2px solid red;
  }
`;

const PwInput = styled.input`
  width: 15rem;
  height: 5rem;
  margin: 1rem;

  &:focus{
    outline: none;
    border: 2px solid red;
  }
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: 3rem;

  display: flex;
  width: 100%;
  
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LoginBtn = styled.button`
  width: 5rem;
  height: 2rem;

  width: 20%;
  height: 10%;

  border: 1px dotted grey;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &:hover{
    background-color: silver;
  }
`;

const SignUpBtn = styled.button`
  width: 5rem;
  height: 2rem;

  width: 20%;
  height: 100%;

  border: 1px dotted grey;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &:hover{
    background-color: silver;
  }
`;

const Styledp = styled.p`
  margin-top: 0.2rem;
  font-size: 1.5rem;
  font-weight: 500;
 
  color: #e73030;

`;
