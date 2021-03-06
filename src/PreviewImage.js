import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec))

const Img = styled.img`
  display: block;
  width: 100%;
`

export default class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  async init() {
    const { src } = this.props
    await sleep(200)
    if(!this._mounted) return
    this.setState({ src })
  }
  componentDidMount() {
    this._mounted = true
    this.init()
  }
  componentWillReceiveProps(nextProps) {
    const { src } = nextProps
    if(src !== this.props.src) {
      this.setState({ src })
    }
  }
  componentWillUnmount() {
    this._mounted = false
  }
  render() {
    const { to, alt } = this.props
    const { src } = this.state
    if(!src) return false
    return (
      <Link to={to}>
        <Img src={src} alt={alt} />
      </Link>
    )
  }
}
