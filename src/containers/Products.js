import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProductContent } from '../components/ProductContent/ProductContent'

export class Products extends Component {
    state = {
    }
    render() {
        return (
            <div>
                <ProductContent></ProductContent>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
