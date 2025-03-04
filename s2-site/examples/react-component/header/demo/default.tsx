import React from 'react';
import ReactDOM from 'react-dom';
import insertCss from 'insert-css';
import { Button } from 'antd';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';

fetch(
  'https://gw.alipayobjects.com/os/bmw-prod/cd9814d0-6dfa-42a6-8455-5a6bd0ff93ca.json',
)
  .then((res) => res.json())
  .then((res) => {
    const s2Options = {
      width: 600,
      height: 480,
      interaction: {
        enableCopy: true,
      },
    };

    const s2DataConfig = {
      fields: {
        rows: ['province', 'city'],
        columns: ['type', 'sub_type'],
        values: ['number'],
      },
      meta: res.meta,
      data: res.data,
    };

    const SheetHeader = () => {
      const [dataCfg, setDataCfg] = React.useState(s2DataConfig);
      const [sortParams, setSortParams] = React.useState([]);
      const header = {
        title: '表头标题',
        description: '表头描述',
        exportCfg: { open: true },
        advancedSortCfg: {
          open: true,
          sortParams,
          onSortConfirm: (ruleValues, sortParams) => {
            setDataCfg({ ...dataCfg, sortParams });
            setSortParams(sortParams);
          },
        },
        switcherCfg: { open: true },
        extra: (
          <Button size={'small'} style={{ verticalAlign: 'top' }}>
            插入内容
          </Button>
        ),
      };

      return (
        <SheetComponent
          dataCfg={dataCfg}
          options={s2Options}
          header={header}
          adaptive={false}
        />
      );
    };

    ReactDOM.render(<SheetHeader />, document.getElementById('container'));
  });

insertCss(`
  .s2-header {
    margin:0px !important;
  }
`);
