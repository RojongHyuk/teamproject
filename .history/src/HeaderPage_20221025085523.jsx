import React from 'react'
import { Container } from 'react-bootstrap'

const HeaderPage = () => {
  return (
    <>
    <Navbar bg='dark' variant="dark">
      <Container>

        <Navbar.Brand href="/">Crawling</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link onClick={onClick} href="/">Home</Nav.Link>
          <Nav.Link onClick={onClick} href="/movie">영화 예약</Nav.Link>
          <Nav.Link onClick={onClick} href="/chat">
            채팅{
              (parseInt(sessionStorage.getItem('count')) !== 0) && (sessionStorage.getItem('uid')) && <Badge bg="danger">{sessionStorage.getItem('count')}</Badge>
            }
          </Nav.Link>
          <Nav.Link onClick={onClick} href='/shop'>상점</Nav.Link>
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
  </>
  )
}

export default HeaderPage