import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import config from "../../config";
import moment from "moment";
import * as actions from "../../actions/user_actions";

const reducer = ({ main, user }) => ({ main, user });
import {
    Card,
    Button,
    Avatar,
    Table,
    Modal,
    Form,
    Input,
    Select,
    Popconfirm,
    Upload,
    message,
} from "antd";
import {
    EditOutlined,
    LoadingOutlined,
    DeleteFilled,
    PlusOutlined,
    UserOutlined,
    EditFilled,
    SearchOutlined,
    CloseCircleFilled,
    CloseCircleOutlined,
    CloseOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const { TextArea } = Input;
const { Option } = Select;

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 50,
            search: "",
            role: "",
        };
    }
    componentDidMount() {
        this.props.dispatch(
            actions.getUsers({
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
            })
        );
    }
    componentWillUnmount() {
        this.props.dispatch(actions.closeUserModal());
    }
    openModal(data) {
        this.props.dispatch(actions.openUserModal(data));
    }
    closeModal() {
        this.props.dispatch(actions.closeUserModal());
    }
    onChangeHandler(e) {
        if (e.target.name === "phone") {
            const phoneRegex = /[0-9]/;
            if (isNaN(e.target.value) || e.target.value === "") {
                this.props.dispatch(
                    actions.userChangeHandler({
                        name: e.target.name,
                        value: "",
                    })
                );
            } else if (phoneRegex.test(e.target.value)) {
                this.props.dispatch(
                    actions.userChangeHandler({
                        name: e.target.name,
                        value: e.target.value,
                    })
                );
            }
        } else {
            this.props.dispatch(
                actions.userChangeHandler({
                    name: e.target.name,
                    value: e.target.value,
                })
            );
        }
    }
    submitUser() {
        const {
            user: { user },
        } = this.props;
        let emailRegex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneRegex = /^[0-9]{8}$/;
        const nameRegex = /^[а-яА-Яa-zA-z үҮөӨёЁ-]*$/;
        const usernameRegex = /^[0-9a-zA-z_]*$/;
        const passwordRegex = /^[0-9a-zA-z_!@#$%^&*?]*$/;
        if (!user.username || (user.username && user.username.trim() === "")) {
            return config.get("emitter").emit("warning", "Хэрэглэгчийн нэр оруулна уу!");
        } else if (!usernameRegex.test(user.username)) {
            return config.get("emitter").emit("warning", "Хэрэглэгчийн нэр бичиглэл буруу байна!");
        }
        // if(!user.last_name || (user.last_name && user.last_name.trim() === '' )){
        //     return config.get('emitter').emit('warning', ("Овог оруулна уу!"));
        // } else
        if (!nameRegex.test(user.last_name)) {
            return config.get("emitter").emit("warning", "Овог бичиглэл буруу байна!");
        }
        // if(!user.first_name || (user.first_name && user.first_name.trim() === '' )){
        //     return config.get('emitter').emit('warning', ("Нэр оруулна уу!"));
        // } else
        if (!nameRegex.test(user.first_name)) {
            return config.get("emitter").emit("warning", "Нэр бичиглэл буруу байна!");
        }
        if (!user.email) {
            return config.get("emitter").emit("warning", "Имэйл оруулна уу!");
        } else if (!emailRegex.test(user.email)) {
            return config.get("emitter").emit("warning", "Имэйл бичиглэл буруу байна!");
        }
        if (!user.phone) {
        } else if (user.phone && !phoneRegex.test(user.phone)) {
            return config.get("emitter").emit("warning", "Утас бичиглэл буруу байна!");
        }
        if (!user.role || (user.role && user.role.trim() === "")) {
            return config.get("emitter").emit("warning", "Хэрэглэгчийн эрх сонгоно уу!");
        }
        // if (!user.status || (user.status && user.status.trim() === "")) {
        // 	return config
        // 		.get("emitter")
        // 		.emit("warning", "Хэрэглэгчийн статус сонгоно уу!");
        // }
        if (!user._id) {
            if (!user.password || (user.password && user.password.trim() === "")) {
                return config.get("emitter").emit("warning", "Нууц үг оруулна уу!");
            } else if (user.password.length < 6) {
                return config
                    .get("emitter")
                    .emit("warning", "Нууц үг доод тал нь 6-н оронтой байна!");
            } else if (!passwordRegex.test(user.password)) {
                return config.get("emitter").emit("warning", "Нууц үг бичиглэл буруу байна!");
            }
        } else {
            if (user.password) {
                if (!user.password || (user.password && user.password.trim() === "")) {
                    return config.get("emitter").emit("warning", "Нууц үг оруулна уу!");
                } else if (user.password.length < 6) {
                    return config
                        .get("emitter")
                        .emit("warning", "Нууц үг доод тал нь 6-н оронтой байна!");
                } else if (!passwordRegex.test(user.password)) {
                    return config.get("emitter").emit("warning", "Нууц үг бичиглэл буруу байна!");
                }
            }
        }
        this.props.dispatch(actions.submitUser({ ...user }));
    }
    tableOnChange(data) {
        const { dispatch } = this.props;
        this.setState({ pageNum: data.current - 1 });
        let cc = {
            pageNum: data.current - 1,
            pageSize: this.state.pageSize,
            search: this.state.search,
            role: this.state.role,
        };
        dispatch(actions.getUsers(cc));
    }
    searchUser() {
        const { dispatch } = this.props;
        this.setState({ pageNum: 0 });
        let cc = {
            pageNum: 0,
            pageSize: this.state.pageSize,
            search: this.state.search,
            role: this.state.role,
        };
        this.props.dispatch(actions.getUsers(cc));
    }
    delete(id) {
        this.props.dispatch(
            actions.deleteUsers({
                _id: id,
                pageSize: this.state.pageSize,
                pageNum: this.state.pageNum,
            })
        );
    }
    updateStatus(id, status) {
        this.props.dispatch(actions.updateStatus({ _id: id, status: status }));
    }
    //upload
    customRequest(files) {
        const {
            main: { user },
        } = this.props;
        var id = user._id;
        files.file.path = files.file.name;
        this.props.dispatch(actions.uploadUserAvatar([files.file], "image", id));
    }
    beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/JPEG" ||
            file.type === "image/PNG";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    }

    onChangeSelect(value) {
        this.props.dispatch(actions.userChangeHandler({ name: "role", value: value }));
    }
    onChangeSelect1(value) {
        this.props.dispatch(actions.userChangeHandler({ name: "status", value: value }));
    }
    render() {
        let {
            user: { status, openModal, user, users, submitUserLoader, all, imageUploadLoading },
        } = this.props;
        let pagination = {
            total: all,
            current: this.state.pageNum + 1,
            pageSize: this.state.pageSize,
            position: "bottom",
            showSizeChanger: false,
        };
        const columns = [
            {
                key: "num",
                title: "№",
                render: (text, record, idx) => this.state.pageNum * this.state.pageSize + idx + 1,
            },
            {
                key: "username ",
                title: "Хэрэглэгчийн нэр",
                render: (text, record) => (record.username ? record.username : "-"),
            },
            {
                key: "email",
                title: "Имэйл",
                render: (text, record) => (record.email ? record.email : "-"),
            },
            {
                key: "phone",
                title: "Утас",
                render: (text, record) => (record.phone ? record.phone : "-"),
            },
            {
                key: "created",
                title: "Огноо",
                render: (text, record, idx) =>
                    record.created ? moment(record.created).format("YYYY-MM-DD") : "-",
            },
            {
                key: "status",
                title: "Статус",
                render: (text, record) =>
                    record.status
                        ? record.status === "pending"
                            ? "Идэвхигүй"
                            : record.status === "active"
                            ? "Идэвхтэй"
                            : record.status === "delete"
                            ? "Устгагдсан"
                            : null
                        : "-",
            },
            {
                title: "Үйлдэл",
                key: "action",
                render: (text, record) => (
                    <div style={{ width: 240 }}>
                        <Button
                            size={"small"}
                            style={{ marginRight: 10 }}
                            key={record._id + "edit"}
                            loading={!!record.loading}
                            onClick={this.openModal.bind(this, record)}
                        >
                            <EditFilled /> Засах
                        </Button>
                        <Select
                            value={record.status ? record.status : ""}
                            onChange={(value) => this.updateStatus(record._id, value)}
                        >
                            <Option value="pending">Идэвхгүй</Option>
                            <Option value="active">Идэвхтэй</Option>
                        </Select>
                        {/* <Popconfirm
                            title={`Та устгах гэж байна!`}
                            onConfirm={this.delete.bind(this, record._id)}
                            okText="Устгах"
                            placement="left"
                            cancelText="Болих"
                        >
                            <Button type={"primary"} key={record._id} danger size={"small"} loading={!!record.loading}>
                                <DeleteFilled/> Устгах
                            </Button>
                        </Popconfirm> */}
                    </div>
                ),
                width: 240,
            },
        ];
        //upload
        const uploadButton = (
            <div style={{ fontSize: 24 }}>
                {imageUploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
            </div>
        );
        let avatar = "/images/default-avatar.png";
        if (user.avatar && user.avatar !== "") {
            avatar = user.avatar;
        }
        return (
            <Card
                title="Хэрэглэгч нар"
                bordered={true}
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={this.openModal.bind(this, {})}
                    >
                        Хэрэглэгч
                    </Button>
                }
            >
                <div style={{ marginBottom: 20 }}>
                    <Input
                        addonAfter={
                            <CloseCircleFilled
                                style={{ color: "white" }}
                                onClick={() => this.setState({ search: "" })}
                            />
                        }
                        maxLength={60}
                        size="small"
                        placeholder="Хайх /бүх талбар/"
                        style={{ width: 200, marginRight: 20 }}
                        value={this.state.search}
                        name="search"
                        onChange={(e) => this.setState({ search: e.target.value })}
                    />
                    <Select
                        style={{ width: 142, marginRight: 20 }}
                        size="small"
                        name="role"
                        value={this.state.role}
                        onChange={(e) => this.setState({ role: e })}
                    >
                        <Option value="">Эрх сонгоно уу</Option>
                        <Option value="teacher">Багш</Option>
                        <Option value="user">Хэрэглэгч</Option>
                    </Select>
                    <Button
                        type="primary"
                        size="small"
                        icon={<SearchOutlined />}
                        onClick={this.searchUser.bind(this)}
                    >
                        Хайх
                    </Button>
                </div>

                <Table
                    loading={status}
                    size="small"
                    dataSource={users}
                    columns={columns}
                    onChange={this.tableOnChange.bind(this)}
                    pagination={pagination}
                    rowClassName={(record, index) =>
                        record.status === "pending" ? "table-row-dark" : null
                    }
                />
                <Modal
                    title="Хэрэглэгч"
                    visible={openModal}
                    onOk={this.submitUser.bind(this)}
                    onCancel={this.closeModal.bind(this)}
                    okText="Хадгалах"
                    cancelText="Болих"
                    confirmLoading={submitUserLoader}
                    maskClosable={false}
                >
                    <Form.Item label="Зураг" labelCol={{ span: 5 }}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            disabled={imageUploadLoading}
                            beforeUpload={this.beforeUpload.bind(this)}
                            customRequest={this.customRequest.bind(this)}
                        >
                            {user && user.avatar ? (
                                <img
                                    onError={(e) => (e.target.src = `/images/default-avatar.png`)}
                                    src={avatar}
                                    style={{ width: "100%" }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Username" labelCol={{ span: 5 }}>
                        <Input
                            maxLength={60}
                            value={user.username ? user.username : ""}
                            name="username"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item label="Овог" labelCol={{ span: 5 }}>
                        <Input
                            maxLength={60}
                            value={user.last_name ? user.last_name : ""}
                            name="last_name"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item label="Нэр" labelCol={{ span: 5 }}>
                        <Input
                            maxLength={60}
                            value={user.first_name ? user.first_name : ""}
                            name="first_name"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item label="Танилцуулга" labelCol={{ span: 5 }}>
                        <TextArea
                            rows={4}
                            value={user.bio ? user.bio : ""}
                            name="bio"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item label="Имэйл" labelCol={{ span: 5 }}>
                        <Input
                            maxLength={60}
                            value={user.email ? user.email : ""}
                            name="email"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item label="Утас" labelCol={{ span: 5 }}>
                        <Input
                            maxLength={8}
                            type="text"
                            value={user.phone ? user.phone : ""}
                            name="phone"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                    <Form.Item label="Эрх" labelCol={{ span: 5 }}>
                        <Select
                            value={user.role ? user.role : ""}
                            onChange={this.onChangeSelect.bind(this)}
                        >
                            <Option value="">Эрх сонгоно уу</Option>
                            <Option value="teacher">Багш</Option>
                            <Option value="user">Хэрэглэгч</Option>
                        </Select>
                    </Form.Item>
                    {/* <Form.Item
						label="Статус"
						labelCol={{ span: 5 }}
						// help=""
					>
						<Select
							value={user.status ? user.status : ""}
							onChange={this.onChangeSelect1.bind(this)}
						>
							<Option value="pending">Идэвхгүй</Option>
							<Option value="active">Идэвхтэй</Option>
						</Select>
					</Form.Item> */}
                    <Form.Item label="Нууц үг" labelCol={{ span: 5 }}>
                        <Input.Password
                            name="password"
                            type="password"
                            value={user.password ? user.password : ""}
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </Form.Item>
                </Modal>
            </Card>
        );
    }
}

export default connect(reducer)(User);
