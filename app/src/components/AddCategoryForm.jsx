import { useState } from "react";
import { Modal, Form } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AddCategoryForm(props) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const saveCategory = async () => {
    try {
      await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          color
        })
      });
    } catch (error) {
      console.log(error);
    } finally {
      setColor('');
      setName('');
      props.setShow(false);
    }
  };

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Category name</Form.Label>
            <Form.Control type="text" placeholder="Insert a category name" value={name} onChange={(event) => setName(event.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration</Form.Label>
            <Form.Control type="color" placeholder="Duration" value={color} onChange={(event) => {
              setColor(event.target.value);
            }} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <button className="secondary" onClick={() => {props.setShow(false)}}>Cancel</button>
        <button onClick={saveCategory}>Add</button>
      </Modal.Footer>
    </Modal>
  );
}