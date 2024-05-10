import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../assets/Input";
import Info from "../assets/Info";
import axios from "axios";
import styled from "styled-components";



function MyPage(): JSX.Element {
  const { memberId } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  
  
  // 데이터 상태 정의
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://34.64.233.12:8080/member/info", {
          headers: {
            memberId: memberId
          }
        });
        // 받아온 데이터를 상태에 저장
        setUserData(response.data.data); //데이터 두번 있는거 주의하기!
      } catch (error: any) {
        alert(error.response.data.message);
      }
    }
    fetchData();
  }, [memberId]); // memberId가 변경될 때마다 재요청


  function handleClickOpenContent(){
    setIsVisible((prev)=>!prev);
  }

  function handleClickHomeBtn(){
    navigate(`/main/${memberId}`);
  }

  function handleClickChangePw(){
    const fetchData = async() => {
      try{
        const response = await axios.patch("http://34.64.233.12:8080/member/password",
        {
          previousPassword : oldPw,
          newPassword: newPw,
          newPasswordVerification : confirmPw
        },
        {
          headers : {memberId: memberId},
        }
        );
        console.log(response);
        alert(response.data.message);
        
      }
      catch(e:any){
        alert(e.response.data.message);
      }
    }
    fetchData();
    setNewPw("");
    setOldPw("");
    setConfirmPw("");
  }
  return (
    <MyPageWrapper>
      {/* userData가 null이 아닐 때에만 렌더링 */}
      {userData && (
        <>
          <MyInfo>
            <Info name="ID" content={userData.authenticationId} />
            <Info name="닉네임" content={userData.nickname} />
            <Info name="전화번호" content={userData.phone} />
          </MyInfo>
          <Toggle onClick={handleClickOpenContent}>비밀번호 변경{isVisible ? '▲': '▼'}</Toggle>
          {isVisible ? 
            (<ChangePw >
              <Input state={oldPw} func={setOldPw} name="기존 비밀번호" />
              <Input state={newPw} func={setNewPw}name="새로운 비밀번호" />
              <Input state={confirmPw} func={setConfirmPw} name="비밀번호 확인" />
              <PwChangeBtn onClick={handleClickChangePw}>비밀번호 변경</PwChangeBtn>
            </ChangePw>)
            : null
          }
          <HomeBtn onClick={handleClickHomeBtn}>Home</HomeBtn>
        </>
      )}
    </MyPageWrapper>
  );
}


const MyPageWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);
`;

const MyInfo = styled.div`
  width: 80vw;
  height: 60vh;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChangePw = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;



const HomeBtn = styled.button`
  width: 5rem;
  height: 5rem;
  margin-top: 5rem;
  
`;


const PwChangeBtn = styled.button`
  width: 10rem;
  height: 3rem;
  margin-top: 2rem;
`;


const Toggle = styled.button`
  width: 15rem;
  height: 5rem;
  background-color: slateblue;

`;

export default MyPage;