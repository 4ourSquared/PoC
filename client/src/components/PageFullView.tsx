import React, { Component } from 'react';
import { Header } from './breadcrumb';
import { Content } from './contents';
import { Footer } from './footer';

export class PageFullView extends Component{
render(){
    return (
            <>
                <Header />
                <Content />
                <Footer />
            </>
    )
}
}