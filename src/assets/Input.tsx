import styled from "styled-components";


interface InputProps{
  //만들면서 필요한 것 작성해나갈 예정
  name: string;
  state: any;
  func: any;
}

function Input({name, state, func}: InputProps) : JSX.Element
{
  const handleInput = (e:any) => {
    func(e.target.value); //set함수임
  }


  return(
    <FlexBox>
      <SName>{name}</SName>
      <SInput onChange={handleInput} value={state} />
    </FlexBox>
    
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  margin-top: 2rem;
  flex: 1;
`;

const SName = styled.div`
  width: 50%;
  font-size: 1.5rem;
`;

const SInput = styled.input`
  width  : 50%;
  height : 3vh;
  
`;


export default Input;