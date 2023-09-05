import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import VariationField from "./VariationField";
import ShippingField from "./ShippingField";
import ProductListData from "assets/data/product-list.data.json";
import axios from "axios";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { BASE_URL, NAMECHEAP_API_KEY, NAMECHEAP_API_USER, NAMECHEAP_CLIENT_IP, NAMECHEAP_URL, NAMECHEAP_USERNAME } from "redux/store/baseUrl";
import xmltojson from "xmltojson";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [domain, setDomain] = useState(null)

  useEffect(() => {
    if (mode === EDIT) {
      console.log("is edit");
      console.log("props", props);
      const { id } = param;
      const produtId = parseInt(id);
      const productData = ProductListData.filter(
        (product) => product.id === produtId
      );
      const product = productData[0];
      form.setFieldsValue({
        comparePrice: 0.0,
        cost: 0.0,
        taxRate: 6,
        description:
          "There are many variations of passages of Lorem Ipsum available.",
        category: product.category,
        name: product.name,
        price: product.price,
      });
      setImage(product.image);
    }
  }, [form, mode, param, props]);

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                Buy Domain{" "}
              </h2>
              {/* <div className="mb-3">
                <Button className="mr-2">Discard</Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  Add
                </Button>
              </div> */}
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <div  style={{ marginTop: 90 }}>
           
              <GeneralField
                uploadedImg={uploadedImg}
                uploadLoading={uploadLoading}
                handleUploadChange={handleUploadChange}
                domain={domain}
                setDomain={setDomain}
              />
           
          </div>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
