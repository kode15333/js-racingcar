import {
  MESSAGE,
  MINIMUM_COUNT,
  NAME_LIMIT_LENGTH, NAME_MINIMUM_LENGTH,
  TEMPLATE
} from '../utils/constant.js'
import {selector} from "../utils/util.js";
import Cars from "./Cars.js";

class Panel {
  constructor(parent) {
    this.$parent = parent
    this.render()
  }

  render = () => {
    this.$parent.innerHTML = ''
    this.$parent.insertAdjacentHTML('afterbegin', TEMPLATE.INPUT_NAME_COUNT)
    this.addDomEvent()
  }

  addDomEvent = () => {
    selector('#game-input-panel-component', this.$parent).addEventListener('click', this.handlePanelClick)
    selector('#game-result-component').addEventListener('click', this.restart)
  }

  handlePanelClick = ({target}) => {
    if (target.classList.contains('car-player-btn')) {
      return this.addCarPlayers(target.closest('.add-car-players'))
    }

    if (target.classList.contains('play-count-btn')) {
      return this.inputRacingCount(target.closest('.input-racing-count'))
    }
  }

  addCarPlayers = (target) => {
    const inputValues = selector('input', target).value.split(',')
    if (inputValues.length > 0 && this.isValidName(inputValues)) {
      this.carNames = inputValues.map((name) => ({name}))
      return this.showCountPanel()
    }

    alert(MESSAGE.NO_VALID_CAR_NAMES)
  }

  isValidName = (names) => {
    return names.every(name => (name.length > NAME_MINIMUM_LENGTH && name.length < NAME_LIMIT_LENGTH))
  }

  showCountPanel = () => {
    selector('.car-racing-count').classList.remove('hidden')
  }

  isValidCount = (count) => {
    return isNaN(count) === false && count > MINIMUM_COUNT;
  }


  inputRacingCount = (target) => {
    const { carNames } = this;
    const count = selector('input', target).value
    if (this.isValidCount(count)) {
      return new Cars({
        carNames,
        count,
      })
    }

    alert(MESSAGE.NO_VALID_COUNT);
  }

  restart = ({target}) => {
    if (target.classList.contains('restart-racing')) {
      this.render();
    }
  }
}

export default Panel;