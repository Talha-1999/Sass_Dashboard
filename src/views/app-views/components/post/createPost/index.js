import { Card, Form, Input, Button } from "antd"
import { useDispatch, useSelector } from "react-redux";
import Editor from "./Editor";
import { SubmitEditor } from 'redux/actions/UserState'

// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 10,
//     },
// };

const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};

const CreatePost = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const postdata = useSelector((state) => state.user.editorValue)
    const data = useSelector((state) => state.user.post)

    const onHandleFinish = (values) => {
        const formValues = { ...values }
        const { text, file } = postdata
        const editorValue = { title: formValues.title, text, file }
        dispatch(SubmitEditor(editorValue))
    }
    console.log(data)
    return (
        <Card className="calender mb-0">
            <Form
                form={form}
                onFinish={onHandleFinish}
            >
                <Form.Item name="title" label="Title" labelCol={{ span: 6 }} wrapperCol={{ span: 10 }}>
                    <Input placeholder="Enter Title" />
                </Form.Item>
                <Form.Item>
                    <Editor />
                </Form.Item>
                <Form.Item {...tailLayout} >
                    <Button style={{ marginTop: '8%' }} type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
export default CreatePost