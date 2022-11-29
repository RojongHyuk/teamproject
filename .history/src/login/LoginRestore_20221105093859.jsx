
import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';

const LoginRestore = ({ history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);


  const restoreSubmit = async () => {
    if (!window.confirm('아이디를 복원하시겠습니까?')) return;

    const formData = new FormData();
    
    //새로고침하면 uid가 사라져서 복원이 안됨.replac로 옮겨가야 함.
    formData.append("uid", loginUser.uid);
    try {
      await axios.post('/api/user/restore', formData);
      alert("아이디 복원 완료!");
      history.push('/login/form');
    } catch (e) {
      if (e) alert('예상치 못한 오류가 발생하였습니다.')
    }
  }
useEffect(()=>{
  if(()=>window.location.reload()){
    alert('새로고침 시 이전 페이지로 이동됩니다.');
   history.push('/login/form')
  }

})
  
  return (
    /*모달창 넣기*/
    <Navbar style={{ marginTop: 300 }} className='fixed-top' bg='secondary' variant="dark">
      <Container>
        <Nav >
          <Button onClick={restoreSubmit}>계정복구</Button>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default LoginRestore