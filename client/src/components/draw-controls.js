import React from 'react'
import { HexColorPicker } from "react-colorful";

const DrawControls = ({ 
  settings, 
  handleUpdateSettings,
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
      onChange={e => handleUpdateSettings(e.target.name, parseInt(e.target.value))}
    />
  </div>
)

export default DrawControls