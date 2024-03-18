import { Button, Form, Input, Select, message } from 'antd'
import { useContext, useCallback, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext'

const CreateRoom = () => {
    const [form] = Form.useForm()
    const socket = useContext(SocketContext)
    const [messageApi, contextHolder] = message.useMessage()

    const info = useCallback((text) => {
        messageApi.info(text);
    }, [messageApi])

    useEffect(()=>{

    },[socket])

    const onCreateRoom = (values) => {
        console.log("values [createRoom]", values);
        info(`Salle "${values.roomName}" créé par ${values.creator}`)
        socket.emit("create room", values);
    }

    const onFinish = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onCreateRoom(values);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Form
            layout="vertical"
            name="create_room"
            onFinish={onFinish}
            form={form}
        >
            {contextHolder}
            <Form.Item
                name="roomName"
                rules={[{ required: true, message: 'Veuillez saisir le nom de la salle!' }]}
            >
                <Input placeholder="Nom de la salle" />
            </Form.Item>
            <Form.Item
                name="creator"
                rules={[{ required: true, message: "Veuillez saisir votre nom d'utilisateur!" }]}
            >
                <Input placeholder="Nom du créateur" />
            </Form.Item>
            <Form.Item
                name="numCards"
                rules={[
                    { required: true, message: "Veuillez saisir le nombre de carte dans votre paquet!" },
                ]}
            >
                <Select placeholder="Choisir combien de cartes dans le paquet">
                    <Select.Option value="32">32</Select.Option>
                    <Select.Option value="52">52</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">Créer</Button>
        </Form>
    )
};
export default CreateRoom;