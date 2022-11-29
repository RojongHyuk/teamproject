import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

const HeaderPage = ({ history }) => {
  const { loginUser, setLoginUser } = useContext(UserContext);

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href")
    history.push(href);
  }

  const getLoinUser = async () => {
    const result = await axios.get(`/api/user/read/${sessionStorage.getItem('uid')}`)
    setLoginUser(result.data);
  }

  return (

    <Navbar className='fixed-top' bg='secondary' variant="dark">
      <Container>
        <Navbar.Brand onClick={onClick} href="/">물론마켓</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={onClick} href="/about">회사소개</Nav.Link>
          <Nav.Link onClick={onClick} href="/pboard/list">상품 목록</Nav.Link>
          <Nav.Link onClick={onClick} href="/pboard/insert">상품 등록</Nav.Link>
        </Nav>
        <Nav>
         {sessionStorage.getItem('uid') ?
              <>
                <Nav.Link href={`/user/read/${loginUser.uid}`} onClick={onClick}>{loginUser.uname}</Nav.Link>
                <Nav.Link onClick={onClickLogout}>로그아웃</Nav.Link>
              </> :
              <Nav.Link onClick={onClick} href='/login'>로그인</Nav.Link>
            }
        </Nav>
      </Container>
    </Navbar>

  )
}

export default withRouter(HeaderPage)