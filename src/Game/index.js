import {Component} from 'react'
import Tabs from '../Tabs/index'
import Thumbnail from '../Thumbnails/index'
import './index.css'

class game extends Component {
  state = {
    active: 'FRUIT',
    matchImageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    score: 0,
    sec: 60,
    gameStatus: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
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
    } else {
      this.setState({gameStatus: false})
      clearInterval(this.timerId)
    }
  }

  tick = () => {
    const {sec} = this.state
    if (sec > 0) {
      this.setState(prev => ({sec: prev.sec - 1}))
    } else {
      this.setState({gameStatus: false})
      clearInterval(this.timerId)
    }
  }

  TabChange = name => {
    this.setState({
      active: name,
    })
  }

  reset = () => {
    this.setState({score: 0, sec: 60, gameStatus: true})
    this.componentDidMount()
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {active, matchImageId, score, sec, gameStatus} = this.state
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
              <p className="score-count">{sec} sec</p>
            </li>
          </ul>
          <div className="game-container">
            {gameStatus && (
              <>
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
              </>
            )}
            {!gameStatus && (
              <div className="Score-card">
                <img
                  className="trophy-img"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
                  alt="trophy"
                />
                <h1 className="score-display">YOUR SCORE</h1>
                <h1 className="score-display">{score}</h1>
                <div className="btn-box">
                  <button
                    type="button"
                    className="restart-game"
                    onClick={this.reset}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                      alt="reset"
                    />
                    PLAY AGAIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default game
