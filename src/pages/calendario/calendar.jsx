import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);

export const CalendarAula = () => {
  const { token } = theme.useToken();
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const wrapperStyle = {
    width: '100%',
		maxWidth: '400px',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }
          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div
              style={{
                padding: 8,
              }}
            >
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Row gutter={8} className='w-full'>
							<Col>
                  <Select
                    size="medium"
                    popupMatchSelectWidth={false}
                    value={month}
										className='w-full'
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
                <Col className='w-full'>
                  <Select
										localeData="br"
                    size="medium"
                    popupMatchSelectWidth={false}
                    className="my-year-select w-full"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
               
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};