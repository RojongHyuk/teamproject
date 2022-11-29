import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PboardItem = ({ postList }) => {
  const { pcode, plike, ptitle, pcontent, pwriter, pimage, viewcnt } = postList;
  const { loginUser } = useContext(UserContext);
  const [loveList, setLoveList] = useState([]);

  const callLikeList = async () => {
    const result = await axios.get('/api/pboardlike/lovelist')
    setLoveList(result.data);
  }



  const onToggleLike = async (pwriter, pcode) => {
    const formData = new FormData();
    formData.append('pcode', pcode);
    formData.append('unickname', loginUser.unickname /* 새로고침에 취약한지 보기 */);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    await axios.post(`/api/pboardlike/dislove`, formData);
  }


  useEffect(() => {
    callLikeList();
  }, [])

  /*   if(!likeList) return(
      <h1>없습니다.</h1>
    ) */

  return (
    <Col style={{ marginTop: 60 }}>
      <Card style={{ width: '30rem', height: 700, padding: 20, margin: '15px 0px' }}>
        <Card.Body>
          <Card.Img src={pimage} height='300' />
          <Card.Title>{pwriter}</Card.Title>
          <Card.Title>{ptitle}</Card.Title>
          <Card.Text>{pcontent}</Card.Text>
        </Card.Body>
        <ButtonGroup>
          {sessionStorage.getItem('uid') &&
            <Button onClick={() => onToggleLike(loginUser.unickname, pcode)} variant="primary">
              <img src={
                // include나 find로 써볼 수 있을듯. 이걸 read로 하면 include도 해보자
                loveList.find((e) =>(e.unickname===loginUser.unickname && e.pcode===pcode)) ? "../image/heart.png" : "https://dummyimage.com/100x100"/* "../image/emptyheart.png" */} width={30} />
              {plike}
            </Button>
          }
          <Link to={`/pboard/read/${pcode}`}><Button style={{ marginLeft: 270 }} variant='secondary'>자세히보기</Button></Link>
        </ButtonGroup>
      </Card>

    </Col>

  )
}

export default PboardItem