import React, { Suspense, Component } from 'react';
import { connect } from 'react-redux';
import { AddPhotoAC, AddUserAC, AddUsersDashBoard, SetPriority, SetFlightDirection, SetDayTime } from '../redux/action';
import './styles/DashBoard.css';
import {Form} from 'antd';
function handleChange(value) {
  console.log(`selected ${value}`);
}

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  async componentDidMount() {
   

    const reqUsersLength = await fetch('/api/usersLength', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    let usersLength = await reqUsersLength.json();

    this.setState({ usersLength: usersLength.usersLength });

    if (this.props.users.length === 0) {
      this.setState({ loading: true });
    }

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div>
       Здесь основной код вашего приложения
       <p><a href="/logout">Выйти</a></p>
        <footer className='footer-users'
          align={'center'}>
          <p>Зарегистрировано пользователей: {this.state.usersLength}</p>
        </footer>
      </div >


    );
  }
}

function mapStateToProps(store) {
  return {
    users: store.usersDashBoard,
    user: store.user,
    priority_list_for_application: store.priority,
    flight_direction: store.flight_direction,
    daytime: store.daytime,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: user => {
      dispatch(AddUserAC(user));
    },
    addPhotos: photos => {
      dispatch(AddPhotoAC(photos));
    },
    AddUsersDashBoard: users => {
      dispatch(AddUsersDashBoard(users));
    },
  };
}
const Form_You = Form.create({ name: 'form_you' })(DashBoard)
export default connect(mapStateToProps, mapDispatchToProps)(Form_You)