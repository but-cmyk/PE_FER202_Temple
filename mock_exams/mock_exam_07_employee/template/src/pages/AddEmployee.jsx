import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { fetchDepartments, addEmployee } from '../api/employeeApi'
import { useEmployee } from '../context/EmployeeContext'

export default function AddEmployee() {
  const navigate = useNavigate()
  const { dispatch } = useEmployee()
  
  // TODO-04: Khai báo state carTypes/roomTypes...
      const [types, setTypes] = useState([])
  
  const [name, setName] = useState('')
  const [typeId, setTypeId] = useState('')
  const [numFieldVal, setNumFieldVal] = useState('')
  const [textFieldVal, setTextFieldVal] = useState('')
  const [price1, setPrice1] = useState('')
  const [price2, setPrice2] = useState('')
  const [dateFieldVal, setDateFieldVal] = useState('')

  // TODO-04: fetch danh sách loại thực thể từ API trong useEffect
      // code useEffect ở đây
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !typeId || !price1) return

    const newItem = {
      name,
      departmentId: typeId,
      experience: Number(numFieldVal),
      role: textFieldVal,
      priceWeekday: Number(price1),
      priceWeekend: Number(price2),
      startDate: dateFieldVal
    }

    try {
      const created = await addEmployee(newItem)
      dispatch({ type: 'ADD_ITEM', payload: created })
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Header as="h5">Add New Employee</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Department</Form.Label>
              {/* TODO-04: render dropdown với option đầu tiên là -- Select -- */}
                                          <Form.Select required value={typeId} onChange={e => setTypeId(e.target.value)}>
                <option value="">-- Select --</option>
              </Form.Select>
                          </Form.Group>

            <Form.Group className="mb-3" controlId="formNum">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control type="number" value={numFieldVal} onChange={e => setNumFieldVal(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formText">
              <Form.Label>Job Role</Form.Label>
              <Form.Control value={textFieldVal} onChange={e => setTextFieldVal(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice1">
              <Form.Label>Monthly Salary</Form.Label>
              <Form.Control type="number" required value={price1} onChange={e => setPrice1(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice2">
              <Form.Label>Overtime Rate</Form.Label>
              <Form.Control type="number" value={price2} onChange={e => setPrice2(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control value={dateFieldVal} onChange={e => setDateFieldVal(e.target.value)} />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary">Add</Button>
              <Button variant="outline-secondary" onClick={() => navigate('/')}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
