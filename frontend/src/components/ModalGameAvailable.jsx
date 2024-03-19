import React, { useState } from 'react'
import { Form, Modal,Input } from 'antd'


const ModalGameAvailable = ({open, setOpen}) => {
    const [form] = Form.useForm()

    const onFormJoin=(values)=>{
        
    }
    
    return (
        <Modal
            open={open}
            title="♥ ♦ ♣ ♠"
            okText="Jouer!"
            centered={true}
            cancelText="Annuler"
            onCancel={() => setOpen(false)}
            onOk={
                form
                    .validateFields()
                    .then((values) => {
                        onFormJoin(values)
                        form.resetFields()
                    })
                    .catch((error) => {
                        console.log("Validate form modalGameAvailable failed", error)
                    })
            }
        >
            <Form form={form} layout='vertical' name='form_in_modal_game_available'>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Veuillez saisir votre nom d'utilisateur!" }]}
                >
                    <Input placeholder="Nom d'utilisateur" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalGameAvailable  