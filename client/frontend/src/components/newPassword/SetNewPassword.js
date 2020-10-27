import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, notification, Card } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Redirect } from 'react-router-dom';

const openNotification = (placement, icon, title, message) => {
  notification.open({
    message: title,
    description:
      message,
    placement,
    icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
    duration: 3,
    isRedirect: false,
  });
};

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedirect: false,
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {

        console.log(this.props.match.params.id);


        const response = await fetch('/set_new_password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password: values.password,
            keyForNewPassword: this.props.match.params.id,
          }),
        });

        const result = await response.json();


        if (result.response === 'ok') {

          message.success(
            `Успешно! Новый пароль установлен, используйте его для входа в наш сервис!`,
            5);

          this.setState({
            isRedirect: true,
          });
        } else {
          openNotification('topRight', 'warning', 'Warning',
            'Проверьте правильность ввода паролей!');
          this.setState({ iconLoading: false });
        }
      }

    });
  };

  render() {
    if (this.state.isRedirect === true) {
      return <Redirect to={`/login`} />;
    }
    const { getFieldDecorator } = this.props.form;
    //  Password verification
    const passwordValidator = (rule, value, callback) => {
      const { getFieldValue } = this.props.form;
      if (value && value !== getFieldValue('password')) {
        callback('Пароли должны совпадать!');
      }
      callback();
    };
    return (
      <div className="registerForm">

        <Card style={{
          borderRadius: '20px',
          marginTop: '11%',
          marginBottom: '11%',
        }}>
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '130px' }} src={logo} alt="" />
            <h3 style={{ color: '#4a76a8' }}>Придумайте новый пароль<br />
            </h3>
          </div>
          <br />
          <Form onSubmit={this.handleSubmit}>
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
              })(<Input.Password
                placeholder="Придумайте новый пароль профиля" />)}
            </Form.Item>

            <Form.Item hasFeedback>
              {getFieldDecorator('passwordcomfire', {
                rules: [
                  {
                    required: true,
                    message: 'Пожалуйста, повторите Ваш новый пароль',
                  }, {
                    validator: passwordValidator,
                  }],
              })(<Input.Password placeholder="Повтрите новый пароль" />)}


            </Form.Item>
            <Form.Item>
              <Button style={{ backgroundColor: '#4A76A8', color: '#ffffff' }}
                htmlType="submit" className="login-form-button"
                loading={this.state.iconLoading} icon='login'>
                Установить новый пароль
                </Button>
              <div style={{ textAlign: 'center' }}>

                <Link to={'/our_company'}>О нас</Link><br />
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Password);
// export default Password;