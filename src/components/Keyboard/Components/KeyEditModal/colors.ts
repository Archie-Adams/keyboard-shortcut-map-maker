import { CSSProperties } from 'react';

interface IDefaultKeyColor {
    style: CSSProperties;
    color: string;
}
// TODO: Is there a formula for these colors?

const coral: IDefaultKeyColor = {
    style: {
        color: '#f0f0f0',
        background: 'linear-gradient(90deg, #e97b67 0%, #ed9282 30%, #ed9282 60%, #ea8270)',
        borderRadius: '0.3125rem 0.3125rem 0.5rem 0.5rem',
        borderTop: '0.15rem solid #e76b55',
        borderRight: '0.35rem solid #e8735e',
        borderLeft: '0.35rem solid #e8735e',
        borderBottom: '0.6rem solid #da6753',
        boxShadow: '0.25rem 0.25rem 1rem 0rem rgba(23, 38, 53, 0.5), inset -1px -1px 5px 0 #ee9686',
    },
    color: '#e97b67',
};

const navy: IDefaultKeyColor = {
    style: {
        color: '#f0f0f0',
        background: 'linear-gradient(90deg, #264a63 0%, #2f5b79 30%, #2f5b79 60%, #29506a)',
        borderRadius: '0.3125rem 0.3125rem 0.5rem 0.5rem',
        borderTop: '0.15rem solid #213f54',
        borderRight: '0.35rem solid #24455c',
        borderLeft: '0.35rem solid #24455c',
        borderBottom: '0.6rem solid #223644',
        boxShadow: '0.25rem 0.25rem 1rem 0rem rgba(23, 38, 53, 0.5), inset -1px -1px 5px 0 #305e7d',
    },
    color: '#264a63',
};

const green: IDefaultKeyColor = {
    style: {
        color: '#eae7e1',
        background: 'linear-gradient(90deg, #237465 0%, #2a8c79 30%, #2a8c79 60%, #257c6b)',
        borderRadius: '0.3125rem 0.3125rem 0.5rem 0.5rem',
        borderTop: '0.15rem solid #1e6557',
        borderRight: '0.35rem solid #216d5e',
        borderLeft: '0.35rem solid #216d5e',
        borderBottom: '0.6rem solid #205349',
        boxShadow: '0.25rem 0.25rem 1rem 0rem rgba(23, 38, 53, 0.5), inset -1px -1px 5px 0 #2b907c',
    },
    color: '#237465',
};

const orange: IDefaultKeyColor = {
    style: {
        color: '#f7f6f4',
        background: 'linear-gradient(90deg, #f35b24 0%, #f57141 30%, #f57141 60%, #f4632e)',
        borderRadius: '0.3125rem 0.3125rem 0.5rem 0.5rem',
        borderTop: '0.15rem solid #f24d11',
        borderRight: '0.35rem solid #f3541a',
        borderLeft: '0.35rem solid #f3541a',
        borderBottom: '0.6rem solid #db4c18',
        boxShadow: '0.25rem 0.25rem 1rem 0rem rgba(23, 38, 53, 0.5), inset -1px -1px 5px 0 #f57546',
    },
    color: '#f35b24',
};

const blue: IDefaultKeyColor = {
    style: {
        color: '#f7f6f4',
        background: 'linear-gradient(90deg, #2c9ce5 0%, #47a9e8 30%, #47a9e8 60%, #35a1e6)',
        borderRadius: '0.3125rem 0.3125rem 0.5rem 0.5rem',
        borderTop: '0.15rem solid #1c93e0',
        borderRight: '0.35rem solid #2398e3',
        borderLeft: '0.35rem solid #2398e3',
        borderBottom: '0.6rem solid #2688c7',
        boxShadow: '0.25rem 0.25rem 1rem 0rem rgba(23, 38, 53, 0.5), inset -1px -1px 5px 0 #4cabe9',
    },
    color: '#2c9ce5',
};

export { coral, navy, green, orange, blue };