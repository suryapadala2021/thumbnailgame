import './index.css'

const Tabs = props => {
  const {details, isActive, TabChange} = props
  const {tabId, displayText} = details
  const click = () => {
    TabChange(tabId)
  }

  const addClass = isActive ? 'active' : ''
  return (
    <li className="tab-item">
      <button type="button" className="btn" onClick={click}>
        <p className={`tab-name ${addClass}`}>{displayText}</p>
      </button>
    </li>
  )
}
export default Tabs
