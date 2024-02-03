/* eslint-disable prettier/prettier */
import React from "react";
import { Card, Descriptions, Tag, Typography } from "antd";
import "./index.less";
import Component from "./components";
const { Link, Title } = Typography;
const style = { width: "280px" };

const About: React.FC = () => {
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies, version } = pkg;

  return (
    <div className="about-content">
      {/* 测试 Hooks */}
      <Component />
      <Card className="mb10">
        <Title level={4} className="mb15">
          关于； Descriptions | pkg
        </Title>
        <span className="text">
          <Link href="https://github.com/rttmoa/rttmoa-platform" target="_blank">
            rttmoa-platform
          </Link>
          ：技术基于 React18、React-Router v6、React-Hooks、Redux-Toolkit、TypeScript、Vite4、Ant-Design5
        </span>
      </Card>

      <Card className="mb10">
        <Title level={4} className="mb15">
          项目信息
        </Title>
        <Descriptions column={2} bordered size="middle" labelStyle={style}>
          <Descriptions.Item label="版本号">
            <Tag color="processing">{version}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">
            <Tag color="processing">{lastBuildTime}</Tag>
          </Descriptions.Item>
          {/* <Descriptions.Item label="Gitee">
            <Link href="" target="_blank">
              Gitee
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Github">
            <Link href="" target="_blank">
              Github
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Issues">
            <Link href="" target="_blank">
              Issues
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="预览地址">
            <Link href="" target="_blank">
              预览地址
            </Link>
          </Descriptions.Item> */}
        </Descriptions>
      </Card>

      <Card className="mb10">
        <Title level={4} className="mb15">
          生产环境依赖
        </Title>
        <Descriptions column={3} bordered size="middle" labelStyle={style}>
          {Object.keys(dependencies).map(key => {
            return (
              <React.Fragment key={key}>
                <Descriptions.Item label={key}>
                  <Tag color="default">{dependencies[key]} </Tag>
                </Descriptions.Item>
              </React.Fragment>
            );
          })}
        </Descriptions>
      </Card>

      <Card>
        <Title level={4} className="mb15">
          开发环境依赖
        </Title>
        <Descriptions column={3} bordered size="middle" labelStyle={style}>
          {Object.keys(devDependencies).map(key => {
            return (
              <React.Fragment key={key}>
                <Descriptions.Item label={key}>
                  <Tag color="default">{devDependencies[key]} </Tag>
                </Descriptions.Item>
              </React.Fragment>
            );
          })}
        </Descriptions>
      </Card>
    </div>
  );
};

export default About;
