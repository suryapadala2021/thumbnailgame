import './index.css'

const Thumbnail = props => {
  const {details, isMatch} = props
  const {thumbnailUrl, id} = details
  const click = () => {
    isMatch(id)
  }

  return (
    <li>
      <button type="button" className="thumb-btn" onClick={click}>
        <img src={thumbnailUrl} alt="thumbnail" className="img-thumbnail" />
      </button>
    </li>
  )
}
export default Thumbnail
