import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colors.id}`, colorToEdit)
      .then(res => {
        console.log("COLOR LIST PUT REQUEST ", res)

        //--------colors is colorList from bubblepage. This maps through the list of colors and grabs the id that matches the id from put request and grabs whatever was typed and sent to server through pur request-------------
        const updatedColors = colors.map((color) => color.id === res.data.id ? res.data : color) 

        //----------------sets colorList from bubbles to be whatever was stored in updatedColors---------------------------------------------------
        updateColors(updatedColors);
        alert("color has been updated")
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      // console.log(res)
      const newColorArr = colors.filter(v => v.id !== color.id)
      updateColors(newColorArr)
    })
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/api/colors`, colorToEdit)
    .then(res => {
      console.log("POST DATA", res)
      updateColors(res.data)
    })

  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code: 
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
          <button onClick={() => setEditing(false)}>cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
