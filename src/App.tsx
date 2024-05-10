import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import SignUp from './pages/SignUp';

import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';



function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');


  /**
   * 대원이가 보여준 예시 코드(Login에서 사용)
   * const [ error, setError ] = useState( false )

const handleSubmit = () => {
if( value === " " ) { 
setError(true)
return;
}
....
}

  return ( <> 
       { error && <p> id를 입력해주세요 </p> } 
      </>
)

navigate( '/)
navigate('/main)
navigate('/main')
navigate('/mypage/${id}')
mypage/123
useParams
123을 받아올 수 있음
이 123 마이페이지 정보를 api
const handleClick = ( ) => {
 navigate('/mypage/${id}')
}


   */

  //API를 잘 써서, 응답 잘 받아온 뒤에, useNavigate를 사용하여 라우팅하는게 과제의 목적!

  //useParams를 쓸 수 밖에 없다 -> id를 받아와서 main 페이지를 가져오는건데..
  //url에 있는 id값을 가져오려면.. 
  //Login 페이지에서 (버튼을 눌러서 signup페이지 들어가면) 응답을 성공해오면, 응답이 성공했을 경우에, navigate를 해서 main으로 보내주고,
  //main에서 버튼을 통해서 myPage, Signup 페이지로 navigate를 하고

  //login하면 마이페이지에서 API 응답에서 ID값을 받을 수 있다. navigate('/mypage/${id}')useNavigate 사용해서 
  //myPage 페이지 컴포넌트 내에서 useParams를 사용하여, id를 받아오고, 이걸 API 요청으로 필요한 정보 가져와서 배치해주어서 마이페이지 구성 

  // onSubmit 이벤트리스터로, 제출 동작이 발생시에, id 인풋과 pw 인풋의 value를 확인하여, 빈 문자열이라면, (로그인을 위한 일련의 과정 -api 요청을 안 보내고),
  // 만약 값이 있다면 기본만 구현하듯이 api 요청을 보내서, api 응답을 받아와서 ok가 뜨면 navigate로 param과 함께 main 페이지등으로 넘어간다. 
  // Main 페이지에서도 아마 useParams로 id를 가져온뒤, 그 id를 myPage로 넘어갈떄 넘겨주어야 할 수도 있다.(그리고 myPage에서, API 요청으로 정보 받아와서 뿌려준다.)

  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/main/:memberId' element={<Main/>}></Route>
          <Route path='/mypage/:memberId' element={<MyPage/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
