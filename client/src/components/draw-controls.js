import React from 'react'
import { HexColorPicker } from "react-colorful";
import { AiOutlineClear, AiOutlineUndo, AiFillSave, AiOutlineDownload } from 'react-icons/ai'
import Button from '../components/button'

const DrawControls = ({ 
  settings, 
  handleUpdateSettings,
  save,
  undo,
  clear,
  download,
}) => (
  <div>
    <label htmlFor="brushColor">Brush Color</label>
    <HexColorPicker 
      name="brushColor" 
      color={settings.brushColor} 
      onChange={newColor => handleUpdateSettings('brushColor', newColor)}
    />
    <br/>
    <label>Brush Radius</label>
    <input 
      type="range" 
      className="form-range"
      name="brushRadius"
      value={settings.brushRadius}
      min={1}
      max={60}
      onChange={e => handleUpdateSettings(e.target.name, e.target.value)}
    />
    <div className="d-grid gap-2">
      
      <Button 
        onClick={undo}
        className="btn-light"
      >
        <AiOutlineUndo/> Undo
      </Button>
      <Button 
        onClick={clear}
        className="btn-light"
      >
        <AiOutlineClear/> Clear
      </Button>
      <Button 
        className="btn-primary"
      >
        <AiFillSave/> Save
      </Button>
    </div>
  </div>
)

export default DrawControls