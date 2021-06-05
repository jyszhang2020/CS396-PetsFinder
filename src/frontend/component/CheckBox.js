import React, {Component} from 'react'

class CheckBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {toggle, range} = this.props;
        return (
            <li>
                <input key={range.id} onClick={toggle} type="checkbox" checked={range.isChecked} value={range.value} /> {range.value}
            </li>
          )
    }
}

export default CheckBox