import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import {
  Form,
  Input,
  Button,
  Radio,
  Card,
  Select,
  message,
  notification,
  Icon
} from 'antd';
import { Redirect, Link } from 'react-router-dom';

import logo from "../images/logo.png";
const { Option } = Select;
const openNotification = (placement, icon, title, message) => {
  notification.open({
    message: title,
    description:
      message,
    placement,
    icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
    duration: 3
  });
};



class Signup extends Component {
  state = {
    isRedirect: false,
    iconLoading: false,
    crewRole: '',
    jack: 'jack',
    lucy: 'lucy',
    tom: 'tom'

  };



  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ iconLoading: true })
        const {
          firstName,
          lastName,
          email,
          crewRole,
          password
        } = values

        const userMainInfo = {
          firstName,
          lastName,
          email,
          crewRole,
          password
        };
        localStorage.setItem('userMainInfo', JSON.stringify(userMainInfo));

        const response = await fetch('/api/signup/noowner', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            crewRole: crewRole,
            email: email,
            password: password
          })
        });
        const result = await response.json();

        if (result.response === 'success') {
          if (crewRole === 'пилот') {
            message.success(`Новый пилот успешно зарегистрирован`, 5)
            this.props.cookies.set('Role', crewRole);
            this.props.cookies.set('station', 'station');
            this.props.cookies.set('isLogin', true, { path: "/" });
            this.setState({
              isRedirect: true,

            })
          } else {
            message.success(`Новый командир эскадрильи успешно зарегистрирован`, 5)
            this.props.cookies.set('Role', crewRole);
            this.props.cookies.set('station', 'station');
            this.props.cookies.set('isLogin', true, { path: "/" });
            this.setState({
              isRedirect: true,

            })
          }


          // window.location.href = 'http://какой то адрес/signupAll';
          // window.location = window.location.href + '/login'
          // this.setState({ isRedirect: true })



          // this.props.cookies.set('isLogin', true, { path: "/" });
          // this.props.cookies.set('Role', result.crewRole, { path: "/" });




        }

        // this.setState({
        //     role: role,
        //     isRedirect: true,
        //     iconLoading: false
        // })



      } else {
        openNotification('topRight', 'warning', 'Warning', 'Выберите поле "Пилот" или поле "Командир эскадрильи", а также проверьте правильность заполнения других полей')
      }
    });
  };




  render() {
    if (this.state.isRedirect) {
      // if (this.state.crewRole === 'командир оставляем на будущее') {
      //     window.location.href = 'http://localhost:3000/signup/where_owner';


      //     // return <Redirect to={'/signup/where_owner'} />
      // } else if (this.state.crewRole || this.state.crewRole !== 'командир') {
      //     window.location.href = 'http://localhost:3000/signup/you';

      //     // return <Redirect to={'/dashboard'} />
      // }
      return <Redirect to={'/dashboard'} />
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='registerFormMain'>
        <Card style={{ borderRadius: '10px', marginTop: '2%', marginBottom: '8%', backgroundColor: 'white' }}>
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '130px' }} src={logo} alt="" />
            <h3 style={{ color: '#4a76a8' }}>
              Форма регистрации пилотов<br /> Авиакомпания Х</h3>
          </div>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите имя!',
                  },
                ],
              })(<Input placeholder="Имя" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите фамилию!',
                  },
                ],
              })(<Input placeholder="Фамилия" />)}
            </Form.Item>
            {/* <Form.Item>
                            {getFieldDecorator('town', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Пожалуйста, введите город!',
                                    },
                                ],
                            })(
                                <Select
                                    showSearch
                                    placeholder="Ваш город"
                                    style={{ width: 260 }}
                                >
                                    <Option value="Москва">Москва</Option>
                                    <Option value="Санкт-Петербург">Санкт-Петербург</Option>
                                    <Option value="Казань">Казань</Option>
                                    <Option value="Екатеринбург">Екатеринбург</Option>
                                    <Option value="Нижний Новгород">Нижний Новгород</Option>
                                    <Option value="Новосибирск">Новосибирск</Option>
                                    <Option value="Самара">Самара</Option>
                                    <Option value="Хабаровск">Хабаровск</Option>
                                    <Option value="Чита">Чита</Option>
                                </Select>

                            )}
                        </Form.Item> */}
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Введите правильный ID!',
                  },
                  {
                    required: true,
                    message: 'Пожалуйста, введите ID',
                  },
                ],
              })(<Input placeholder="E-mail..." />)}
            </Form.Item>



            <Form.Item>
              {getFieldDecorator('crewRole', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите цель регистрации!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ]
              })(
                <Radio.Group>
                  <Radio value={'пилот'}>Пилот</Radio>
                  <Radio value={'командир'}>Командир эскадрильи</Radio>
                </Radio.Group>
              )}
            </Form.Item>

            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, введите пароль!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password style={{ width: '250px' }} placeholder="Придумайте пароль профиля" />)}
            </Form.Item>

            < Form.Item>
              <Button style={{ backgroundColor: '#4A76A8', width: '100%', align: "center" }} htmlType="submit" loading={this.state.iconLoading} icon='solution'>
                Зарегитрировать
                </Button>
            </Form.Item>
          </Form>
          <div align={'center'}><br /><Link to={"/login"}>Войти</Link><br /><Link to={"/our_company"}>О нас</Link></div>
        </Card>
      </div >

    );
  }
}

const Register = Form.create({ name: 'register' })(Signup);
export default withCookies(Register);
