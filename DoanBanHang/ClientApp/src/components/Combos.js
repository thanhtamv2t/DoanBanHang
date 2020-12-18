import { notification } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Grid,Container, GridColumn } from 'semantic-ui-react';
import axios from '../api/axios';
import Combo from './Combo';

const Combos = () => {

    const [arrList, setArrList] = useState([])

    const renderProductList = useCallback(() => { 
        return arrList.map(item => (<Combo item={item}/>))
    }, [arrList])

    const fetchCombos = async () => {
        try{
            const response = await axios.get('/comboes')
            setArrList(response.data)
        } catch (e) {
            notification.error({
                description: "Xảy ra lỗi, vui lòng thử lại!"
            })
        }
    }

    useEffect(() => {
        fetchCombos();
    }, [])
    return (
        <Container style={{marginTop: '52px'}}>
            <Grid>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={3}>{renderProductList()}</Card.Group>
                </Grid.Column>
            </Grid>
       </Container>
    )
}




export default connect(null, {  })(Combos)