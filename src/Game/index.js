import {Component} from 'react'
import Tabs from '../Tabs/index'
import Thumbnail from '../Thumbnails/index'
import './index.css'

class game extends Component {
  state = {
    active: 'FRUIT',
    matchImageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    score: 0,
  }

  TabChange = name => {
    this.setState({
      active: name,
    })
  }

  getAnotherImgId = () => {
    const {imagesList} = this.props
    const index = Math.floor(Math.random() * imagesList.length)
    return imagesList[index].id
  }

  isMatch = unq => {
    const {matchImageId} = this.state
    if (unq === matchImageId) {
      const imgId = this.getAnotherImgId()
      this.setState(prev => ({score: prev.score + 1, matchImageId: imgId}))
    }
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {active, matchImageId, score} = this.state
    const itemsList = imagesList.filter(obj => obj.category === active)
    const getImage = imagesList.find(each => each.id === matchImageId)
    return (
      <div className="lg-container">
        <div className="container">
          <ul className="nav-bar">
            <li className="Website-logo-container">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
              />
            </li>
            <li className="nav-score">
              <p>
                Score: <span className="score-count"> {score}</span>
              </p>
            </li>
            <li>
              <img
                className="timer-img"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
            </li>
            <li>
              <p className="score-count">0 sec</p>
            </li>
          </ul>
          <div className="game-container">
            <div className="match-img-box">
              <img
                src={getImage.imageUrl}
                alt="match"
                className="matching-image"
              />
            </div>
            <ul className="tabs-container">
              {tabsList.map(each => (
                <Tabs
                  key={each.tabId}
                  details={each}
                  isActive={each.tabId === active}
                  TabChange={this.TabChange}
                />
              ))}
            </ul>
            <ul className="thumbnail-container">
              {itemsList.map(obj => (
                <Thumbnail
                  key={obj.id}
                  details={obj}
                  isActive={obj.tabId === active}
                  isMatch={this.isMatch}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default game
