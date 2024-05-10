import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MainPropTypes{
  //만들면서 필요한 것 작성해나갈 예정
}


function Main(props: MainPropTypes) : JSX.Element
{
  const {memberId} = useParams(); //주소 파라미터 가져옴
  const navigate = useNavigate();

  function handleClickMyPageBtn()
  {
    navigate(`/mypage/${memberId}`);
  }

  function handleClickSignUpBtn()
  {
    navigate("/signup");
  }
  
  return (
    <>
      <MainPage>
        <StyledTitle>메인페이지</StyledTitle>
        <video width="500" height="400" autoPlay loop muted> {/*왜 크기가 내가 원하는대로 설정이 안되지? %도 그렇고.. vw도 그렇고.. */}
          <source src="../../public/mainVideo.mp4" type="video/mp4"/>
        </video>

        <BtnWrapper>
          <StyledBtn onClick={handleClickMyPageBtn}>내 정보</StyledBtn> 
          <StyledBtn onClick={handleClickSignUpBtn}>회원가입</StyledBtn>
        </BtnWrapper>
        
      </MainPage>
    </>
  );
}

const StyledTitle = styled.div`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const MainPage = styled.form`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-image: conic-gradient(from -38deg at 50% 50%, #fff 0deg, #999 360deg);

`;

const BtnWrapper = styled.div`
  display: flex;
  
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledBtn = styled.button`
  width: 10vw;
  height: 5vh;

  border: 1px dotted grey;
  border-radius: 0.5rem;
  margin-top: 1rem;

  &:hover{
    background-color: silver;
  }
`;

export default Main;