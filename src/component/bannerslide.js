import React, {Component} from 'react';
import { Carousel } from 'antd';
import {connect} from 'react-redux';
import {getbannerlist} from '../redux/indexRudex';


@connect(state => state.indexRedux,
    { getbannerlist })
export default class BannerSlide extends Component{
    constructor(props){
        super(props);
        this.state={
    }
}
componentDidMount(){
    this.props.getbannerlist()
}
    render(){
        if(!this.props.bannerlist.length){
            return null
        }
        return(
              <div className="slidewrap">
                <Carousel autoplay>
                    {this.props.bannerlist.map((val, i) => {
                        return (
                            <div key={val.targetId}>
                                <img alt="slidepic" src={val.pic} style={{ width: '100%' }} />
                            </div>
                        )
                    })}
                </Carousel>
              </div>
        )
    }
}