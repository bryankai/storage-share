import React, { Component }  from 'react';
import {Modal, Button, Input, Row, Table} from 'react-materialize'

class BookSpaceModal extends Component {
  state = {
    startDate: null,
    endDate: null,
    duration: null,
    totalCost: '',
    alert: false
  };

  handleSubmit = event => {
    event.preventDefault()
    // this.props.userLogin(this.state, this.props.history);
    // this.setState(this.state);
    // console.log(this.state)
  }


  // Need to add this in...
  handlePriceCalc = (price) => {
    console.log('handlePrice', this.state.startDate, this.state.endDate)
    if(this.state.startDate && this.state.endDate) {
      console.log('both exist')
      const startDateVal = this.state.startDate.slice(0,2)
      const endDateVal = this.state.endDate.slice(0,2)
      const duration = endDateVal - startDateVal
      const totalCost = duration*price
      const alert = duration<1
      this.setState({duration, totalCost, alert})
      console.log(this.state);
    }
  }

  componentDidUpdate =  (prevProps, prevState) => {
    console.log(prevState, this.state, this.props.space.price)
    console.log(prevState.startDate!==this.state.startDate)
    if(prevState.startDate!==this.state.startDate || prevState.endDate!==this.state.endDate) {
      console.log('start or end date changed')
      this.handlePriceCalc(this.props.space.price)
    }
    console.log('componentDidUpdate')
  }

  render() {
    const {name,
      price
    }  = this.props.space
    const modalStyle = {
      height: '600px',
      maxWidth: '500px'
    }


    // this.handlePriceCalc(price)
    console.log(this.state)
    console.log()

    return (
      <Modal style={modalStyle}
        header={name}
        fixedFooter
        actions={
          <div className='modal-footer-buttons'>
            <Button className={this.state.duration<1 ? 'book-space-button disabled' : 'book-space-button'} waves='light' type="submit" form="book-form" value="Book" modal="close" onClick={}>Book</Button>
            <Button flat modal="close" waves="light">Close</Button>
          </div>
        }
        trigger={<Button>MODAL</Button>}>
        <Row>
          <form className='book-form' id='book-form' onSubmit={event => this.handleSubmit(event)}>
            <Input name='on' type='date' label="Start Date"   id="startDate"
              // need to implement price calc
              onChange={event => this.setState({startDate: event.target.value})}
            />
            <Input name='on' type='date' label="End Date" id="endDate"
              onChange={event => this.setState({endDate: event.target.value})}
            />
          </form>
        </Row>
        <Row>
          { this.state.alert ?
          <p className='alert'>ERROR.  Start Date must be before End Date.</p>
            : <div>
              {this.state.totalCost?
                <div>
                  <p>Duration: {this.state.duration} days </p>
                  <p>Price/day: ${price} </p>
                  <p><b>
                    Total Cost: ${this.state.totalCost}
                  </b></p>
                  <Table>
                    <tbody>
                      <tr>
                        <td>${price} x {this.state.duration} days</td>
                        <td>${this.state.totalCost}</td>
                      </tr>
                      {/* <tr>
                        <td>Service fee</td>
                        <td>$3.76</td>
                      </tr>
                      <tr>
                        <td>Jonathan</td>
                        <td>$7.00</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </div>
                :null}
            </div>
          }
        </Row>
      </Modal>
    )
  }
}

export default BookSpaceModal
