import reactCSS from 'reactcss'
import React, { useState } from 'react'
import { SketchPicker } from 'react-color';

const ColorPickerInput = props => {
    const [tags, setTags] = useState([{ id: 1, text: '' }])
    const sendTag = (tag) => {
        let targetIndex=tags.findIndex(item => item.id === tag.id);
        tags[targetIndex].text = tag.text;
        props.sendTags(tags)
    }
    const addColor = (e) => {
        const temp = {};
        temp.id = (tags.length + 1);
        temp.text = ''
        setTags([...tags, temp])
        e.preventDefault();
    }
  
    return (
        <>
            {
                tags.map(
                    (picker) =><><ColorPicker id={picker.id} setText={(tag) => sendTag(tag)} /></> 
                )
            }
            <button className="btn btn-warning" onClick={addColor}>Add more Color</button>
        </>
    )
}

// const ColorPicker = props => {
//     const [color, setColor] = useState('#fff');
//     const onChangeCompleteHandler = (newColor) => {
//         if (color !== newColor) {
//             setColor(newColor)
//         }
//     }
//     React.useEffect(
//         () => {
//             const tag = {}
//             tag.id = props.id;
//             tag.text = color.hex
//             props.setText(tag)
//         },
//         [color]
//     )
//     return (
//         <div>
//             <SketchPicker
//                 color={color}
//                 onChange={(color) => onChangeCompleteHandler(color)}
//             />
//         </div>
//     )
// }



class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: '#fff',
    qty:0,
  };
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker },()=>{
        const tag = {};
        tag.id = this.props.id;
        tag.text = this.state.color.hex;
        tag.qty=this.state.qty;
        this.props.setText(tag)    
    })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false },()=>{
        const tag = {}
        tag.id = this.props.id;
        tag.text = this.state.color.hex
        tag.qty=this.state.qty;
        this.props.setText(tag)    
    })
  };

  handleChange = (color) => {
    this.setState({ color: color },()=>{
        const tag = {}
        tag.id = this.props.id;
        tag.text = this.state.color.hex;
        tag.qty=this.state.qty;
        this.props.setText(tag)    
    })
  };
  component=()=>{
    const tag = {}
    tag.id = this.props.id;
    tag.text = this.state.color.hex;
    tag.qty=this.state.qty;
    this.props.setText(tag)
    console.log("This is called repeatedly")
  }

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `${this.state.color.hex}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }
      </div>
    )
  }
}



export default ColorPickerInput;