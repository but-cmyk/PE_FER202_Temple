import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { fetchAgents, addProperty } from '../api/propertyApi'
import { useProperty } from '../context/PropertyContext'

export default function AddProperty() {
  const navigate = useNavigate()
  const { dispatch } = useProperty()
  
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
    useEffect(() => {
    fetchAgents().then(setTypes).catch(console.error)
  }, [])
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !typeId || !price1) return

    const newItem = {
      name,
      agentId: typeId,
      area: Number(numFieldVal),
      status: textFieldVal,
      priceMin: Number(price1),
      priceMax: Number(price2),
      listedDate: dateFieldVal
    }

    try {
      const created = await addProperty(newItem)
      dispatch({ type: 'ADD_ITEM', payload: created })
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <Card>
        <Card.Header as="h5">Add New Property</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control required value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Agent</Form.Label>
              {/* TODO-04: render dropdown với option đầu tiên là -- Select -- */}
                            <Form.Select required value={typeId} onChange={e => setTypeId(e.target.value)}>
                <option value="">-- Select agent type --</option>
                {types.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Form.Select>
                                        </Form.Group>

            <Form.Group className="mb-3" controlId="formNum">
              <Form.Label>Area (sqm)</Form.Label>
              <Form.Control type="number" value={numFieldVal} onChange={e => setNumFieldVal(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formText">
              <Form.Label>Status</Form.Label>
              <Form.Control value={textFieldVal} onChange={e => setTextFieldVal(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice1">
              <Form.Label>Price Base</Form.Label>
              <Form.Control type="number" required value={price1} onChange={e => setPrice1(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice2">
              <Form.Label>Price Target</Form.Label>
              <Form.Control type="number" value={price2} onChange={e => setPrice2(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Listed Date</Form.Label>
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
