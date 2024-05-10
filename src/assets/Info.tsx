import styled from "styled-components";


interface InfoProps{
  //만들면서 필요한 것 작성해나갈 예정
  name: string;
  content: any;
}

function Info({name, content}: InfoProps) : JSX.Element
{

  return(
    <FlexBox>
      <SName>{name}</SName>
      <SInfo>{content}</SInfo>
    </FlexBox>
    
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  justify-content: center;
  align-items: center;

  

  flex: 1;
`;

const SName = styled.div`
  width: 30%;
  font-size: 2rem;

  text-align: center;
`;

const SInfo = styled.div`
  width  : 50%;
  height : 10%;

  text-align: center;
  font-size: 2rem;
  
`;


export default Info;