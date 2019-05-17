import axios from 'axios';

let href;
if (window.location.href.includes('test')) {
    href = 'http://test.shebao.dai58.cn';
} else {
    href = 'http://shebao.dai58.cn';
}
axios.defaults.baseURL = href;
export default axios;
