import React, { Fragment } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {
    Card,
    Button,
    Form,
    Input,
    Row,
    Col,
    Popconfirm,
    Table,
    Tooltip,
    Select,
    Empty,
    Drawer,
    Upload,
    message,
    Progress,
    TreeSelect,
} from "antd";
import config from "../../config";
import {
    EditOutlined,
    SearchOutlined,
    PlusOutlined,
    DeleteOutlined,
    LoadingOutlined,
    CameraFilled,
    SwapOutlined,
    CloseCircleFilled,
} from "@ant-design/icons";
import moment from "moment";
import * as actions from "../../actions/knowledge_actions";
import ReactPlayer from "react-player";
const { TextArea } = Input;

const { TreeNode } = TreeSelect;
const reducer = ({ knowledge, main }) => ({ knowledge, main });

class Knowledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,
            pageSize: 20,
            search: "",
            sale: "",
        };
    }
    componentDidMount() {
        const {
            dispatch,
            main: {},
        } = this.props;
        dispatch(
            actions.getKnowledge({ pageNum: this.state.pageNum, pageSize: this.state.pageSize })
        );
    }
    componentWillUnmount() {
        this.editor = null;
        this.editorCb = null;
        this.props.dispatch(actions.unmountAdminKnowledges());
    }

    openModal(data, e) {
        e.stopPropagation();
        this.props.dispatch(actions.openKnowledgeModal(data));
    }
    closeModal() {
        this.editor = null;
        this.editorCb = null;
        this.props.dispatch(actions.closeKnowledgeModal());
    }
    submitKnowledge() {
        const {
            knowledge: {
                knowledge,
                knowledgeImage,
                knowledgeGallery,
                knowledgeAudio,
                removedMedias,
            },
            main: { company },
        } = this.props;
        if (!knowledge.title || (knowledge.title && knowledge.title.trim() === "")) {
            return config.get("emitter").emit("warning", "Нэр оруулна уу!");
        }
        if (
            !knowledge.category ||
            (knowledge.category && knowledge.category._id && knowledge.category._id.trim() === "")
        ) {
            return config.get("emitter").emit("warning", "Ангилал сонгоно уу!");
        }
        if (
            !knowledge.description ||
            (knowledge.description && knowledge.description.trim() === "")
        ) {
            return config.get("emitter").emit("warning", "Тайлбар оруулна уу!");
        }
        if (!knowledge.embed || (knowledge.embed && knowledge.embed.trim() === "")) {
            return config.get("emitter").emit("warning", "Youtube оруулна уу!");
        }

        if (!knowledgeImage || !knowledgeImage._id) {
            return config.get("emitter").emit("warning", "Зураг оруулна уу!");
        }
        // if(knowledgeAudio && knowledgeAudio.loading){
        //     return config.get('emitter').emit('warning', ("Аудио хуулагдаж байна!"));
        // }
        if (knowledgeImage && knowledgeImage.loading) {
            return config.get("emitter").emit("warning", "Зураг хуулагдаж байна!");
        }
        // if(!knowledgeAudio || !knowledgeAudio._id){
        //     return config.get('emitter').emit('warning', ("Аудио оруулна уу!"));
        // }

        let cc = {
            ...knowledge,
            knowledgeImage: knowledgeImage,
            knowledgeAudio: knowledgeAudio,
            removedMedias: removedMedias,
        };
        this.props.dispatch(actions.submitKnowledge(cc));
    }
    onChangeHandler(name, value) {
        let val = value;
        if (name && (name === "sale" || name === "price") && value && value.length > 1) {
            if (value.charAt(0) === "0") {
                val = value.substring(1);
            }
        }
        this.props.dispatch(actions.knowledgeChangeHandler({ name: name, value: val }));
    }
    deleteKnowledge(id, e) {
        e.stopPropagation();
        const {
            main: { company },
        } = this.props;
        this.props.dispatch(
            actions.deleteKnowledge({
                _id: id,
                pageSize: this.state.pageSize,
                pageNum: this.state.pageNum,
            })
        );
    }

    customRequest(files, forWhat) {
        const {
            main: { user, company },
        } = this.props;
        // files.file.path = files.file.name;
        if (forWhat === "knowledgeImage") {
            this.props.dispatch(
                actions.uploadKnowledgeImage([files.file], {
                    type: "image",
                    forWhat: forWhat,
                    size: files.file.size,
                    multi: false,
                })
            );
        }
        if (forWhat === "knowledgeAudio") {
            this.props.dispatch(
                actions.uploadKnowledgeAudio([files.file], {
                    type: "audio",
                    forWhat: forWhat,
                    size: files.file.size,
                    multi: false,
                })
            );
        }
    }
    beforeUpload(file) {
        const isJpgOrPng =
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/JPEG" ||
            file.type === "image/PNG";
        if (!isJpgOrPng) {
            message.error("Та JPG/PNG файл оруулна уу!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Хэмжээ 2MB-с том байна!");
        }
        return isJpgOrPng && isLt2M;
    }

    beforeUploadAudio(file) {
        const isJpgOrPng =
            file.type === "audio/mp3" || file.type === "audio/MP3" || file.type === "audio/mpeg";
        if (!isJpgOrPng) {
            message.error("Та .mp3 файл оруулна уу!");
        }
        const isLt2M = file.size / 1024 / 1024 < 300;
        if (!isLt2M) {
            message.error("Хэмжээ 250MB-с том байна!");
        }
        return isJpgOrPng && isLt2M;
    }
    paginationChangeHandler(e) {
        const {
            dispatch,
            main: { company },
        } = this.props;
        this.setState({ pageNum: e - 1 });
        let cc = {
            pageNum: e - 1,
            pageSize: this.state.pageSize,
        };
        dispatch(actions.getKnowledge(cc));
    }
    searchKnowledge() {
        const {
            dispatch,
            main: { company },
        } = this.props;
        this.setState({ pageNum: 0 });
        let cc = {
            pageNum: 0,
            search: this.state.search,
            sale: this.state.sale,
        };
        dispatch(actions.getKnowledge(cc));
    }

    tableOnChange(data) {
        const { dispatch } = this.props;
        this.setState({ pageNum: data.current - 1 });
        let cc = {
            pageNum: data.current - 1,
            pageSize: this.state.pageSize,
            search: this.state.search,
            sale: this.state.sale,
        };
        dispatch(actions.getKnowledge(cc));
    }
    onImageUpload(blobInfo, success, failure) {
        const {
            main: { company },
        } = this.props;
        let xhr, formData;

        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", `/api/admin/tinymce/image/upload`);

        xhr.onload = function () {
            var json;
            if (xhr.status === 403) {
                failure("Алдаа: " + xhr.status, { remove: true });
                return;
            }
            if (xhr.status != 200) {
                failure("Алдаа: " + xhr.status);
                return;
                ц;
            }

            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.location != "string") {
                failure("Invalid JSON: " + xhr.responseText);
                return;
            }
            success(json.location);
        };
        xhr.onerror = function () {
            failure("Алдаа");
        };
        formData = new FormData();
        formData.append("image", blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
    }
    render() {
        let {
            main: { company },
            knowledge: {
                status,
                openModal,
                knowledge,
                knowledges,
                submitKnowledgeLoader,
                all,
                openSubModal,
                submitSubKnowledgeLoader,
                categories,
                loadingCover,
                knowledgeImage,
                knowledgeAudio,
                knowledgeGallery,
                shop_categories,
                shop_assets,
                openSubKnowledgeModal,
                subKnowledgeParent,
                subKnowledgeParentTitle,
                subKnowledgeParentSubAssets,
                subKnowledges,
                openSubSubModal,
                subKnowledge,
                subKnowledgeLoader,
            },
        } = this.props;
        const uploadButton = (
            <div style={{ fontSize: 24 }}>
                {!!(knowledgeImage && knowledgeImage.loading) ? (
                    <LoadingOutlined />
                ) : (
                    <PlusOutlined />
                )}
            </div>
        );

        const uploadButton1 = (
            <div style={{ fontSize: 24 }}>
                <PlusOutlined />
            </div>
        );
        const uploadButton2 = (
            <div style={{ fontSize: 24 }}>
                <PlusOutlined />
            </div>
        );
        let hostMed = "";
        let mediaUrl = "";
        if (knowledgeAudio && knowledgeAudio._id) {
            if (process.env.NODE_ENV === "development") {
                // hostMed = config.get('hostMedia')
                hostMed = "http://samia.com";
            } else {
                hostMed = knowledgeAudio.url;
            }
            // mediaUrl = hostMed+`/api/shop/audio/show/`+knowledgeAudio._id;
            mediaUrl =
                hostMed +
                "/api/admin/audio/show/" +
                knowledgeAudio._id +
                "?token=" +
                Cookies.get("token");
        }
        const columns = [
            {
                key: "num",
                title: "№",
                width: 50,
                render: (text, record, idx) => idx + 1,
            },
            {
                key: "title",
                title: "Нэр",
                render: (text, record, idx) => (record.title ? record.title : null),
            },
            {
                key: "category",
                title: "Ангилал",
                render: (text, record, idx) =>
                    record.category
                        ? record.category === "medeelel"
                            ? "Мэдээлэл"
                            : record.category === "zuvluguu"
                            ? "Зөвлөгөө"
                            : record.category === "sonin_hachin"
                            ? "Сонин хачин"
                            : "Ангилал"
                        : null,
            },
            {
                key: "created",
                title: "Огноо",
                render: (text, record, idx) =>
                    record.created ? moment(record.created).format("YYYY/MM/DD HH:mm") : null,
            },
            {
                key: "action",
                title: "",
                width: 80,
                render: (text, record, idx) => (
                    <React.Fragment>
                        <Button
                            style={{ marginRight: 10 }}
                            size={"small"}
                            onClick={this.openModal.bind(this, record)}
                            icon={<EditOutlined />}
                            loading={record.loading}
                            disabled={record.loading}
                        />
                        <Popconfirm
                            title={`Та устгах гэж байна!`}
                            onConfirm={this.deleteKnowledge.bind(this, record._id)}
                            okText="Усгах"
                            placement="left"
                            cancelText="Болих"
                        >
                            <Button
                                disabled={record.loading}
                                loading={record.loading}
                                danger
                                type={"primary"}
                                size={"small"}
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </React.Fragment>
                ),
            },
        ];
        let pagination = {
            total: all,
            current: this.state.pageNum + 1,
            pageSize: this.state.pageSize,
            position: "bottom",
            showSizeChanger: false,
        };
        return (
            <Card
                title={"Танин мэдэхүй"}
                key={"knowledges_card"}
                loading={status}
                size={"small"}
                extra={[
                    <Button
                        type={"primary"}
                        onClick={this.openModal.bind(this, {})}
                        icon={<PlusOutlined />}
                    >
                        Танин мэдэхүй нэмэх
                    </Button>,
                ]}
            >
                <div style={{ marginBottom: 20 }}>
                    <Form onFinish={this.searchKnowledge.bind(this)}>
                        <Input
                            addonAfter={
                                <CloseCircleFilled
                                    style={{ color: "white" }}
                                    onClick={() => this.setState({ search: "" })}
                                />
                            }
                            maxLength={60}
                            size="small"
                            placeholder="Танин мэдэхүй нэр"
                            style={{ width: 200, marginRight: 20 }}
                            value={this.state.search}
                            name="search"
                            onChange={(e) => this.setState({ search: e.target.value })}
                        />
                        {/*<Select style={{width: 142, marginRight: 20}} size='small' name='sale' value={this.state.sale} onChange={(e) => this.setState({sale: e})}*/}
                        {/*>*/}
                        {/*    <Option value=''>Бүгд</Option>*/}
                        {/*    <Option value='sale'>Хямдарсан</Option>*/}
                        {/*    <Option value='no_sale'>Хямдраагүй</Option>*/}
                        {/*</Select>*/}
                        <Button
                            type="primary"
                            size="small"
                            icon={<SearchOutlined />}
                            htmlType="submit"
                        >
                            Хайх
                        </Button>
                    </Form>
                </div>
                {knowledges && knowledges.length > 0 ? (
                    <Table
                        size="small"
                        dataSource={knowledges}
                        columns={columns}
                        onChange={this.tableOnChange.bind(this)}
                        pagination={pagination}
                    />
                ) : (
                    <Empty description={`Танин мэдэхүй алга`} />
                )}

                {/*{knowledges && knowledges.length > 0 ?*/}
                {/*    <React.Fragment>*/}
                {/*        {pagination}*/}
                {/*        <div style={{margin:'20px 0'}}>*/}
                {/*            {*/}
                {/*                knowledges.map(r =>*/}
                {/*                    <div style={{display:'inline-block', margin:'0 20px 20px 0'}}>*/}
                {/*                        <Card*/}
                {/*                            style={{ width: 300 }}*/}
                {/*                            cover={*/}
                {/*                                <img*/}
                {/*                                    alt="example"*/}
                {/*                                    src={r.knowledgeImage && r.knowledgeImage.path ? r.knowledgeImage.path : '/images/knowledgeImage.png'}*/}
                {/*                                    onError={(e) => e.target.src = `/images/ulger.jpg`}*/}
                {/*                                />*/}
                {/*                            }*/}
                {/*                            actions={[*/}
                {/*                                <EditOutlined key="edit" onClick={this.openModal.bind(this, r)} />,*/}
                {/*                                <Popconfirm*/}
                {/*                                    title={`Та ${r.title} устгах гэж байна!`}*/}
                {/*                                    onConfirm={this.deleteKnowledge.bind(this, r._id)}*/}
                {/*                                    onCancel={(e) => e.stopPropagation()}*/}
                {/*                                    okText="Усгах"*/}
                {/*                                    placement="left"*/}
                {/*                                    cancelText="Болих"*/}
                {/*                                >*/}
                {/*                                    <DeleteOutlined key="delete"/>*/}
                {/*                                </Popconfirm>*/}
                {/*                            ]}*/}
                {/*                        >*/}
                {/*                            <Meta*/}
                {/*                                title={r.title}*/}
                {/*                                description={*/}
                {/*                                    <div>*/}
                {/*                                        <div>*/}
                {/*                                            {*/}
                {/*                                                r.sale ?*/}
                {/*                                                    <span>*/}
                {/*                                                        <span style={{textDecoration: 'line-through', fontSize:16, marginRight:10}}>{(r.price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮</span> {(r.sale || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮*/}
                {/*                                                    </span>*/}
                {/*                                                    :*/}
                {/*                                                    <span style={{fontSize:16}}>{(r.price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₮</span>*/}
                {/*                                            }*/}
                {/*                                        </div>*/}
                {/*                                        <div style={{textAlign:'left', marginTop:10, marginBottom:5}}>*/}
                {/*                                            Нийт бараа: {(r.subKnowledge || []).reduce((total, cur) => total + parseInt((cur.amount || '0').toString()) , 0)}*/}
                {/*                                        </div>*/}
                {/*                                        <div style={{textAlign:'left'}}>*/}
                {/*                                            <Button type={'primary'}*/}
                {/*                                                    onClick={this.openSubKnowledgeModal.bind(this, r)}*/}
                {/*                                                    icon={<EditOutlined />}*/}
                {/*                                                    size={'small'}*/}
                {/*                                            >*/}
                {/*                                                Тоо ширхэг*/}
                {/*                                            </Button>*/}
                {/*                                        </div>*/}
                {/*                                    </div>*/}

                {/*                                }*/}
                {/*                            />*/}
                {/*                        </Card>*/}
                {/*                    </div>*/}
                {/*                )*/}
                {/*            }*/}
                {/*        </div>*/}
                {/*        {pagination}*/}
                {/*    </React.Fragment>*/}
                {/*    :*/}
                {/*    <Empty description={`Танин мэдэхүй алга`}/>*/}
                {/*}*/}
                {/*{openModal ?*/}
                <Drawer
                    title={`Танин мэдэхүй ${knowledge && knowledge._id ? "засах" : "нэмэх"}`}
                    width={720}
                    onClose={this.closeModal.bind(this)}
                    visible={openModal}
                    bodyStyle={{ paddingBottom: 80 }}
                    maskClosable={false}
                    footer={
                        <div
                            style={{
                                textAlign: "right",
                            }}
                        >
                            <Button onClick={this.closeModal.bind(this)} style={{ marginRight: 8 }}>
                                Болих
                            </Button>
                            <Button onClick={this.submitKnowledge.bind(this)} type="primary">
                                Хадгалах
                            </Button>
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Нэр"
                                    tooltip="Танин мэдэхүй нэр"
                                    // labelCol={{span: 3}}
                                >
                                    <Input
                                        maxLength={60}
                                        value={knowledge.title ? knowledge.title : ""}
                                        name="title"
                                        onChange={(e) =>
                                            this.onChangeHandler("title", e.target.value)
                                        }
                                        allowClear
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Ангилал"
                                    tooltip="Ангилалын нэр"
                                    // labelCol={{span: 3}}
                                >
                                    {/*<Select*/}
                                    {/*    defaultValue={knowledge.category ? knowledge.category : ''}*/}
                                    {/*    value={knowledge.category ? knowledge.category : ''}*/}
                                    {/*    onChange={(e) => this.onChangeHandler('category', e)}*/}
                                    {/*>*/}
                                    {/*    <Select.Option value="">Ангилал сонгох</Select.Option>*/}
                                    {/*    <Select.Option value="medeelel">Мэдээлэл</Select.Option>*/}
                                    {/*    <Select.Option value="zuvluguu">Зөвлөгөө</Select.Option>*/}
                                    {/*    <Select.Option value="sonin_hachin">Сонин хачин</Select.Option>*/}
                                    {/*</Select>*/}
                                    <TreeSelect
                                        size="middle"
                                        treeDefaultExpandAll
                                        showSearch
                                        style={{ width: "100%" }}
                                        value={
                                            (knowledge.category && knowledge.category._id) ||
                                            knowledge.category
                                        }
                                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                                        placeholder="Please select"
                                        allowClear
                                        onChange={(e) => this.onChangeHandler("category", e)}
                                        // disabled={lesson.eish}
                                    >
                                        {categories && categories.length > 0
                                            ? categories.map((run, idx) => (
                                                  <TreeNode value={`${run._id}`} title={run.title}>
                                                      {run.child && run.child.length > 0
                                                          ? run.child.map((innerRun) => (
                                                                <TreeNode
                                                                    value={innerRun._id}
                                                                    title={innerRun.title}
                                                                />
                                                            ))
                                                          : null}
                                                  </TreeNode>
                                              ))
                                            : null}
                                    </TreeSelect>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Хураангуй мэдээлэл"
                                    tooltip="Хураангуй мэдээлэл"
                                    // labelCol={{span: 3}}
                                >
                                    <TextArea
                                        value={knowledge.description ? knowledge.description : ""}
                                        name="description"
                                        rows={4}
                                        onChange={(e) =>
                                            this.onChangeHandler("description", e.target.value)
                                        }
                                        allowClear
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="youtube"
                                    tooltip="youtube info"
                                    // labelCol={{span: 3}}
                                >
                                    <TextArea
                                        value={knowledge.embed ? knowledge.embed : ""}
                                        name="embed"
                                        rows={4}
                                        onChange={(e) =>
                                            this.onChangeHandler("embed", e.target.value)
                                        }
                                        allowClear
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {knowledge.embed ? (
                            <iframe width="420" height="315" src={knowledge.embed}></iframe>
                        ) : null}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    label="Зураг"
                                    tooltip="Танин мэдэхүй зураг"
                                    // labelCol={{span: 3}}
                                >
                                    <div className="knowledge-upload-image">
                                        {knowledgeImage &&
                                        knowledgeImage.path &&
                                        knowledgeImage.path !== "" ? (
                                            <React.Fragment>
                                                <img
                                                    onError={(e) =>
                                                        (e.target.src = `/images/ulger.jpg`)
                                                    }
                                                    src={`${knowledgeImage.url}${knowledgeImage.path}`}
                                                    style={{ width: "100%" }}
                                                />
                                            </React.Fragment>
                                        ) : (
                                            <Upload
                                                name="knowledgeImage"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                disabled={
                                                    !!(knowledgeImage && knowledgeImage.loading)
                                                }
                                                beforeUpload={this.beforeUpload.bind(this)}
                                                customRequest={(e) =>
                                                    this.customRequest(e, "knowledgeImage")
                                                }
                                            >
                                                {uploadButton1}
                                            </Upload>
                                        )}
                                        {knowledgeImage && !knowledgeImage.loading ? (
                                            <Upload
                                                disabled={
                                                    !!(knowledgeImage && knowledgeImage.loading)
                                                }
                                                showUploadList={false}
                                                beforeUpload={this.beforeUpload.bind(this)}
                                                customRequest={(e) =>
                                                    this.customRequest(e, "knowledgeImage")
                                                }
                                            >
                                                <Tooltip
                                                    title="Зураг солих"
                                                    key={"cov-ed"}
                                                    placement="right"
                                                >
                                                    <div className="merchant-avatar-edit-icon">
                                                        <CameraFilled />
                                                    </div>
                                                </Tooltip>
                                            </Upload>
                                        ) : null}

                                        {knowledgeImage &&
                                        knowledgeImage.percent !== null &&
                                        typeof knowledgeImage.percent != "undefined" ? (
                                            <Progress percent={knowledgeImage.percent} />
                                        ) : null}
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*<Row gutter={16}>*/}
                        {/*    <Col span={24}>*/}
                        {/*        <Form.Item*/}
                        {/*            label='Аудио'*/}
                        {/*            tooltip="Мэдээний аудио"*/}
                        {/*        >*/}
                        {/*            <div className='knowledge-upload-video'>*/}
                        {/*                {knowledgeAudio && knowledgeAudio._id  ?*/}
                        {/*                    <React.Fragment>*/}
                        {/*                        {<div className='audio-original_name'>{knowledgeAudio.original_name}</div>}*/}
                        {/*                        <ReactPlayer*/}
                        {/*                            // playing*/}
                        {/*                            controls*/}
                        {/*                            onError={() => config.get('emitter').emit('warning', 'Хандах эрх хүрэхгүй байна.')}*/}
                        {/*                            playIcon={<ion-icon style={{fontSize: 74, color: '#fff'}} name="play-circle"/>}*/}
                        {/*                            height={60}*/}
                        {/*                            width={"100%"}*/}
                        {/*                            url={mediaUrl}*/}
                        {/*                            config={{*/}
                        {/*                                file: {*/}
                        {/*                                    forceAudio: true,*/}
                        {/*                                    attributes: {*/}
                        {/*                                        controlsList : "nodownload"*/}
                        {/*                                    }*/}
                        {/*                                }*/}
                        {/*                            }}*/}
                        {/*                        />*/}
                        {/*                    </React.Fragment>*/}
                        {/*                    :*/}
                        {/*                    <Upload*/}
                        {/*                        name="knowledgeAudio"*/}
                        {/*                        listType="picture-card"*/}
                        {/*                        className="avatar-uploader"*/}
                        {/*                        showUploadList={false}*/}
                        {/*                        disabled={!!(knowledgeAudio && knowledgeAudio.loading)}*/}

                        {/*                        beforeUpload={this.beforeUploadAudio.bind(this)}*/}
                        {/*                        customRequest={(e) => this.customRequest(e, 'knowledgeAudio')}*/}
                        {/*                    >*/}
                        {/*                        {uploadButton2}*/}
                        {/*                    </Upload>*/}
                        {/*                }*/}
                        {/*                {knowledgeAudio && !knowledgeAudio.loading ?*/}
                        {/*                    <Upload*/}
                        {/*                        disabled={!!(knowledgeAudio && knowledgeAudio.loading)}*/}
                        {/*                        showUploadList={false}*/}
                        {/*                        beforeUpload={this.beforeUploadAudio.bind(this)}*/}
                        {/*                        customRequest={(e) => this.customRequest(e, 'knowledgeAudio')}*/}
                        {/*                    >*/}
                        {/*                        <Tooltip title='Аудио солих' key={'cov-ed'} placement='right'>*/}
                        {/*                            <div className='merchant-avatar-edit-icon'*/}
                        {/*                            >*/}
                        {/*                                /!*<CameraFilled />*!/*/}
                        {/*                                <SwapOutlined />*/}
                        {/*                            </div>*/}
                        {/*                        </Tooltip>*/}
                        {/*                    </Upload>*/}
                        {/*                    :*/}
                        {/*                    null*/}
                        {/*                }*/}

                        {/*                {knowledgeAudio && knowledgeAudio.percent !== null && typeof(knowledgeAudio.percent) != "undefined" ?*/}
                        {/*                    <Progress percent={knowledgeAudio.percent} />*/}
                        {/*                    :*/}
                        {/*                    null*/}
                        {/*                }*/}
                        {/*            </div>*/}
                        {/*        </Form.Item>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                    </Form>
                </Drawer>
                {/*:*/}
                {/*null*/}
                {/*}*/}
            </Card>
        );
    }
}

export default connect(reducer)(Knowledge);
