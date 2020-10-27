import React, { Component } from 'react';
import { Form, Icon, Input, Button, notification, Card } from 'antd';
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
      iconLoading: false,
      dashboard: '',
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {

        // this.setState({ iconLoading: true })

        const response = await fetch('/newPassword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email,
          }),
        });

        const result = await response.json();


        if (result.response === 'success') {

          this.setState({
            isRedirect: true,
          });
        } else {
          openNotification('topRight', 'warning', 'Warning',
            'Неверный email и пароль, пожалуйста попробуйте еще раз!');
          this.setState({ iconLoading: false });
        }
      }
    });
  };

  render() {
    if (this.state.isRedirect) {
      return <Redirect to={`/instructions_new_password`} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="registerForm">

        <Card style={{
          borderRadius: '20px',
          marginTop: '11%',
          marginBottom: '11%',
        }}>
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '130px' }} src={logo} alt="" />
            <h3 style={{ color: '#4a76a8' }}>
              <img
                src="https://img.icons8.com/fluent/48/000000/ok.png" /> Инструкции
                высланы, проверьте Ваш почтовый ящик!</h3>

          </div>

        </Card>
      </div>
    );
  }
}

export default Form.create()(Password);
// export default Password;