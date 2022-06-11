import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

const AddClient = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        // refetchQueries: [{ query: GET_CLIENTS }],
        update(cache, { data: { addClient } }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
              query: GET_CLIENTS,
              data: { clients: [...clients, addClient] },
            });
        }
    })

    const submitForm = (e) => {
        e.preventDefault()
        setname('')
        setemail('')
        setphone('')
    }
  return (
    <>

    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Add client
    </button>


    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Add clents</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" onChange={(e) => setname(e.target.value)} className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={(e) => setemail(e.target.value)} className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" onChange={(e) => setphone(e.target.value)} className="form-control" id="phone" />
                </div>
                <button type="submit" onClick={addClient} data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default AddClient