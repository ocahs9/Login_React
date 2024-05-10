import React,{ useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface SignUpPropTypes{
  //만들면서 필요한 것 작성해나갈 예정
}

function SignUp(props:SignUpPropTypes) : JSX.Element
{
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState(""); 
  const [isEmptyId, setIsEmptyId] = useState(false);
  const [isEmptyPw, setIsEmptyPw] = useState(false);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState(""); 
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isEmptyPhone, setIsEmptyPhone] = useState(false);

  const idInput = useRef<HTMLInputElement>();
  const pwInput = useRef<HTMLInputElement>();
  const pwInputText = useRef<HTMLParagraphElement>();
  

  const nameInput = useRef<HTMLInputElement>();

  const phoneInput = useRef<HTMLInputElement>();
  const phoneInputText = useRef<HTMLParagraphElement>();

  const navigate = useNavigate();

  
  useEffect(()=>{
    console.log(1);
    if(isEmptyId === true){
      alert("id 입력하세요.");
      idInput.current.focus(); //idInput.current는 undefined일 수 있습니다..?
    }
    else if(isEmptyPw){
      alert("pw 입력하세요.");
      pwInput.current.focus();
    }
    else if(isEmptyName){
      alert("닉네임을 입력하세요.");
      nameInput.current.focus();
    }
    else if(isEmptyPhone){
      alert("전화번호를 입력하세요.");
      phoneInput.current.focus();
    }
  },[isEmptyId, isEmptyPw, isEmptyName, isEmptyPhone])
  
  function validatePassword(password: string):boolean
  {
    //조건들을 정규식을 활용하여, 나열. 
    if(password.length < 8 || !password.match(/\d/) || !password.match(/[^a-zA-Z\d]/) || !password.match(/[a-z]/) && !password.match(/[A-Z]/) )
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  function handleSubmitForm(e:React.FormEvent) //제출을 할 시, API 요청으로 정보 입력하고 받아오는 과정 
  {
    e.preventDefault();

    const fetchData = async() => {
      if(userId === "")
      {
        setIsEmptyId(true);
        setTimeout(()=>setIsEmptyId(false),500); //이걸 해줘야만, 계속 경고문구가 뜨게 할 수 있다.
      }
      else if(userPw ==="")
      {
        setIsEmptyPw(true);
        setTimeout(()=>setIsEmptyPw(false),500);
      }
      else if(userName === "")
      {
        setIsEmptyName(true);
        setTimeout(()=>setIsEmptyName(false),500);
      }
      else if(userPhone === "")
      {
        setIsEmptyPhone(true);
        setTimeout(()=>setIsEmptyPhone(false),500);
      }
      else
      {
        if(!validatePassword(userPw)) //검증 결과 false(-> true) 가 나오면
        {
          alert("비밀번호 형식은 8자이상, 숫자, 특수문자, 영어 알파벳이 포함되어야 합니다.");
          return;
        }
        try {
          const data = await axios.post(`http://34.64.233.12:8080/member/join`
          ,{
            authenticationId : userId,
            password : userPw,
            nickname : userName,
		        phone : userPhone,
          }
          );
          console.log(data);
          const memberId= data.headers.location;
          navigate(`/main/${memberId}`);
          
        }
        catch(error:any){ //만약 틀려먹었을 경우, 에러 객체를 던져줌. (그걸 콘솔에 찍어보고, 필요한 데이터를 뽑아내면 됨)
          alert(error.response.data.message);
          idInput.current.value = "";
          pwInput.current.value = "";
          nameInput.current.value = "";
          phoneInput.current.value = "";

          //이 아래의 초기화 부분들을 해주어야 한다. 안해주면, 바로 회원가입 다시 누르면 또다시 같은 에러(전화번호 형식 맞춰달라는 에러)만 뜬다 - 즉, 안 지워진것!
          //물론 값을 입력하면 해결 되긴 하지만 결국 취약점이 있으니 잘 판단해야 함
          setUserId("");
          setUserName("");
          setUserPhone("");
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

  function handleChangeNameInput(e: React.ChangeEvent<HTMLInputElement>)
  {
    setUserName(e.target.value);
    console.log(userName);
  }

  function handleChangePhoneInput(e: React.ChangeEvent<HTMLInputElement>)
  {
    let inputPhoneNumber = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거 (0-9까지의 숫자를 제외한다는 의미, global로 전부 살펴본다는 의미)

    if(inputPhoneNumber.length <= 11) //11자리 넘어가면 더 작성이 불가능하도록 한번 만들어봤습니다 ㅎㅎ..
    {
      if (inputPhoneNumber.length > 3 && inputPhoneNumber.length <= 7) //3자리 초과, 7자리 이하라면
      {
        inputPhoneNumber = inputPhoneNumber.replace(/(\d{3})(\d{1,4})/, '$1-$2'); // 정규식 표현 : /..(표현식)../ , 숫자3자리, 숫자 1~4자리 2 그룹을 만들어서 -을 붙여주는 형식으로 표현
      } 
      else if (inputPhoneNumber.length > 7) 
      {
        inputPhoneNumber = inputPhoneNumber.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'); //이건 3그룹으로 나누어서 정규식으로 표현(정확히는, 첫번째 인자의 정규식으로, 2번째 형태로 변환해주는 것)
      }
      
      setUserPhone(inputPhoneNumber);
    }
    

  }

  function handleClickBtn(){
    navigate(-1);
  }

  return (
    
    <SignUpPage>
      <SignUpWrapper>
        <SignUpHeader>
          <h1>SignUp</h1>
          <FontAwesomeIcon icon={faUserPlus} fontSize={`4rem`} bounce/> {/*individual import를 잘 살피기! 추가로 공식 문서 잘 읽기) https://docs.fontawesome.com/web/style/size */}
        </SignUpHeader>
        <SignUpForm onSubmit={handleSubmitForm}>
          <SignUpLogic>
            <FlexDiv>
              <InputName>ID</InputName>
              <CustomInput ref={idInput} onChange={handleChangeIdInput}  type="text" placeholder="Id 입력해주세요" />
            </FlexDiv>

            <FlexDiv>
              <InputName>비밀번호</InputName>
              <ColFlexDiv>
                <CustomInput ref={pwInput} type="password" onChange={handleChangePwInput} type="text" placeholder="Pw 입력해주세요" />
                <Styledp ref={pwInputText}>{"비밀번호 형식은 8자이상, 숫자, 특수문자, 영어 알파벳이 포함되어야 합니다."}</Styledp>
              </ColFlexDiv>  
            </FlexDiv>

            <FlexDiv>
              <InputName>닉네임</InputName>
              <CustomInput ref={nameInput} onChange={handleChangeNameInput}  type="text" placeholder="닉네임 입력해주세요" />
            </FlexDiv>

            <FlexDiv>
              <InputName>전화번호</InputName>
              <ColFlexDiv>
                <CustomInput ref={phoneInput} type="password" onChange={handleChangePhoneInput} value={userPhone} type="text" placeholder="010-xxxx-xxxx" />
                <Styledp ref={phoneInputText}>{"전화번호 형식은 010-xxxx-xxxx입니다."}</Styledp>
              </ColFlexDiv>
            </FlexDiv>
          </SignUpLogic>
        </SignUpForm>
        <BtnWrapper> {/*얘내 둘은 바깥쪽으로 form 바깥쪽으로 뺴는게 맞는거 같음. 회원가입은 안에 있어도 되는데, 뒤로가기 버튼은 제출이 안되게 해야함 */}
          <SignUpBtn onClick={handleSubmitForm}>회원가입</SignUpBtn> 
          <SignUpBtn onClick={handleClickBtn}>뒤로가기</SignUpBtn>
        </BtnWrapper>
      </SignUpWrapper>
    </SignUpPage>
    
  );
}

const SignUpWrapper = styled.div`
  position: relative;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 40vw;
height: 90vh;
background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);

`;

const ColFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
`;

const InputName = styled.div`
  width:10rem;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const FlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  justify-content: center;
  align-items: center;
`;

const SignUpLogic = styled.div`
  position: absolute;
  bottom: 10rem;

  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpHeader = styled.header`
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



const SignUpForm = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  //background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);
`;

const SignUpPage = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
`;

const CustomInput = styled.input`
  width: 20vw;
  height: 5vh;
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
  font-size: 1rem;
  font-weight: 500;
 
  color: blue;

`;


export default SignUp;