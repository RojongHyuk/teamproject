import axios from 'axios';
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Pagination from 'react-js-pagination';
import PboardItem from './PboardItem';
import './Pagination.css'
import { Row, Spinner } from 'react-bootstrap';

const PboardList = ({ location, history }) => {
    const search = qs.parse(location.search, { ignoreQueryPrefix: true });
    const [postList, setPostList] = useState([]);
    const [total, setTotal] = useState(1);
    const [loading,setLoading]=useState(false);
    const page = parseInt(search.page) || 1;
    const num = 6;


    const callPostList = async () => {
        setLoading(true);
        const result = await axios.get(`/api/pboard/list?page=${page}&num=${num}`);
        setPostList(result.data.list);
        setTotal(result.data.total);
        setLoading(false);
    }



    useEffect(() => {
        callPostList();
    }, [page])

    if (!postList) return(
        <h1>데이터를 가져오는 과정에서 문제가 발생하였습니다.</h1>
    )

    //return이 있어야 아래 component를 불러올 수 있음.
    if(loading) return(
    <Spinner animation="border" style={{width: '20rem', height: '20rem',marginTop:'220px' }} /> 
    )


    return (
        <>
            <Row>
                {postList.map(postList =>
                    <PboardItem key={postList.pcode} postList={postList} />
                )}
            </Row>
            <br/>
            <br/>
          
            <Pagination
                activePage={page}
                itemsCountPerPage={6}
                totalItemsCount={total}
                pageRangeDisplayed={10}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={(e) => history.push(`/pboard/list?page=${e}`)}
            />
        </>
    )
}

export default PboardList