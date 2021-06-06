import React, {Component} from 'react'

class CheckBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {toggle, range} = this.props;
        return (
            <div>
                <input key={range.id} onChange={toggle} type="checkbox" checked={range.isChecked} value={range.value} /> {range.value}
            </div>
          )
    }
}

export default CheckBox